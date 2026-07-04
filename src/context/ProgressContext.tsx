import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "./AuthContext";
import type { Course } from "../data/schema";
import { isCourseComplete, percentComplete, firstIncompleteLessonId } from "../lib/progress";

interface ProgressState {
  done: Set<string>;
  currentLessonId: string | null;
  setCurrentLesson: (id: string) => void;
  markComplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
  isCourseComplete: (course: Course) => boolean;
  percentComplete: (course: Course) => number;
  firstIncompleteLesson: (course: Course) => string | null;
  evaluationSubmitted: Set<string>;
  markEvaluationSubmitted: (courseId: string) => void;
}

const ProgressContext = createContext<ProgressState | null>(null);

const DONE_KEY = "rc_done";
const EVAL_KEY = "rc_eval";

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { learner } = useAuth();
  const [done, setDone] = useState<Set<string>>(() => loadSet(DONE_KEY));
  const [evaluationSubmitted, setEvalSubmitted] = useState<Set<string>>(() => loadSet(EVAL_KEY));
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  useEffect(() => { saveSet(DONE_KEY, done); }, [done]);
  useEffect(() => { saveSet(EVAL_KEY, evaluationSubmitted); }, [evaluationSubmitted]);

  const markComplete = useCallback((lessonId: string) => {
    setDone(prev => {
      const next = new Set(prev).add(lessonId);
      api.post("/progress", { lessonId, status: "done", learnerId: learner?.id }).catch(() => {
        setDone(current => {
          const rolled = new Set(current);
          rolled.delete(lessonId);
          return rolled;
        });
      });
      return next;
    });
  }, [learner?.id]);

  const markEvaluationSubmitted = useCallback((courseId: string) => {
    setEvalSubmitted(prev => new Set(prev).add(courseId));
  }, []);

  return (
    <ProgressContext.Provider value={{
      done,
      currentLessonId,
      setCurrentLesson: setCurrentLessonId,
      markComplete,
      isComplete:              (lessonId) => done.has(lessonId),
      isCourseComplete:        (course)   => isCourseComplete(course, done),
      percentComplete:         (course)   => percentComplete(course, done),
      firstIncompleteLesson:   (course)   => firstIncompleteLessonId(course, done),
      evaluationSubmitted,
      markEvaluationSubmitted,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressState {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}

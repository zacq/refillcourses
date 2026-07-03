export type LessonType = "text" | "video" | "download" | "quiz";

export interface Attachment {
  id: string;
  name: string;
  url: string;
  ext: string;
  sizeLabel: string;
}

export interface MatrixRow {
  id: string;
  label: string;
}

export type MatrixValue = Record<string, number>;

export type Question =
  | {
      id: string;
      type: "rating-matrix";
      prompt: string;
      required: boolean;
      scaleHint: string;
      rows: MatrixRow[];
    }
  | {
      id: string;
      type: "single-scale";
      prompt: string;
      required: boolean;
      max: number;
      labels?: { min: string; max: string };
    }
  | {
      id: string;
      type: "free-text";
      prompt: string;
      required: boolean;
    };

export interface Survey {
  questions: Question[];
}

export interface Lesson {
  id: string;
  courseId: string;
  blockId: string;
  blockTitle: string;
  title: string;
  type: LessonType;
  order: number;
  body?: string;
  mediaUrl?: string;
  files?: Attachment[];
  survey?: Survey;
  prevId?: string;
  nextId?: string;
}

export interface Block {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  summary: string;
  category: string;
  blocks: Block[];
  percentComplete: number;
}

export interface Learner {
  id: string;
  fullName: string;
  email: string;
  initials: string;
}

export interface Enrollment {
  id: string;
  learnerId: string;
  courseId: string;
  enrolledAt: string;
}

export interface ProgressRecord {
  learnerId: string;
  lessonId: string;
  status: "done";
  completedAt: string;
}

export interface EvaluationRecord {
  learnerId: string;
  courseId: string;
  answers: Record<string, unknown>;
  submittedAt: string;
}

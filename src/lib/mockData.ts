import type { Course } from "../data/schema";

export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Digital Skills for the Modern Professional",
    summary: "Master the essential digital tools and platforms used in today's workplace — from productivity suites to online collaboration and communication.",
    category: "Digital Skills",
    percentComplete: 0,
    blocks: [
      {
        id: "block-1-1",
        title: "Block 1: Getting Started Online",
        order: 1,
        lessons: [
          {
            id: "l-1-1-1", courseId: "course-1", blockId: "block-1-1",
            blockTitle: "Block 1: Getting Started Online",
            title: "Module 1: Introduction to Digital Tools",
            type: "text", order: 1,
            body: "<h2>Welcome to Digital Skills</h2><p>In this module you will get an overview of the digital landscape and the tools we'll cover throughout this programme.</p><ul><li>Cloud storage and document collaboration</li><li>Email and calendar management</li><li>Video conferencing essentials</li></ul><p>By the end of this block you'll be comfortable navigating the most common workplace platforms.</p>",
            prevId: undefined, nextId: "l-1-1-2",
          },
          {
            id: "l-1-1-2", courseId: "course-1", blockId: "block-1-1",
            blockTitle: "Block 1: Getting Started Online",
            title: "Module 2: Setting Up Your Workspace",
            type: "video", order: 2,
            mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            prevId: "l-1-1-1", nextId: "l-1-1-3",
          },
          {
            id: "l-1-1-3", courseId: "course-1", blockId: "block-1-1",
            blockTitle: "Block 1: Getting Started Online",
            title: "Task 1: Download the Starter Pack",
            type: "download", order: 3,
            files: [
              { id: "f1", name: "Digital Skills Starter Guide", url: "#", ext: "pdf", sizeLabel: "1.2 MB" },
              { id: "f2", name: "Tool Setup Checklist", url: "#", ext: "pdf", sizeLabel: "340 KB" },
            ],
            prevId: "l-1-1-2", nextId: "l-1-2-1",
          },
        ],
      },
      {
        id: "block-1-2",
        title: "Block 2: Building an Online Presence",
        order: 2,
        lessons: [
          {
            id: "l-1-2-1", courseId: "course-1", blockId: "block-1-2",
            blockTitle: "Block 2: Building an Online Presence",
            title: "Module 3: Professional Profiles",
            type: "text", order: 1,
            body: "<h2>Your Digital Identity</h2><p>A strong online professional presence opens doors. This module covers how to craft profiles that represent you well.</p><p>We'll look at LinkedIn, professional email signatures, and personal branding basics.</p>",
            prevId: "l-1-1-3", nextId: "l-1-2-2",
          },
          {
            id: "l-1-2-2", courseId: "course-1", blockId: "block-1-2",
            blockTitle: "Block 2: Building an Online Presence",
            title: "Task 2: Update Your Profile",
            type: "download", order: 2,
            files: [
              { id: "f3", name: "Profile Optimisation Flyer", url: "#", ext: "pdf", sizeLabel: "800 KB" },
              { id: "f4", name: "Instructions to Update Your Phone", url: "#", ext: "pdf", sizeLabel: "210 KB" },
            ],
            prevId: "l-1-2-1", nextId: "l-1-2-3",
          },
          {
            id: "l-1-2-3", courseId: "course-1", blockId: "block-1-2",
            blockTitle: "Block 2: Building an Online Presence",
            title: "Course Evaluation",
            type: "quiz", order: 3,
            prevId: "l-1-2-2", nextId: undefined,
            survey: {
              questions: [
                {
                  id: "q1", type: "rating-matrix",
                  prompt: "Rate the following aspects of this course:",
                  required: true,
                  scaleHint: "1 = Not useful → 5 = Very useful",
                  rows: [
                    { id: "r1", label: "Content quality" },
                    { id: "r2", label: "Pace of delivery" },
                    { id: "r3", label: "Practical relevance" },
                    { id: "r4", label: "Instructor clarity" },
                  ],
                },
                {
                  id: "q2", type: "single-scale",
                  prompt: "How likely are you to recommend this course to a colleague?",
                  required: true, max: 5,
                  labels: { min: "Very unlikely", max: "Very likely" },
                },
                {
                  id: "q3", type: "free-text",
                  prompt: "What do you suggest we improve in future editions?",
                  required: false,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "Social Media for Business Growth",
    summary: "Learn how to create compelling content, grow an audience, and turn social media channels into reliable sources of leads and sales.",
    category: "Marketing",
    percentComplete: 0,
    blocks: [
      {
        id: "block-2-1",
        title: "Block 1: Platform Strategy",
        order: 1,
        lessons: [
          {
            id: "l-2-1-1", courseId: "course-2", blockId: "block-2-1",
            blockTitle: "Block 1: Platform Strategy",
            title: "Module 1: Choosing Your Platforms",
            type: "text", order: 1,
            body: "<h2>Platform Strategy</h2><p>Not every platform is right for every business. In this module you'll learn how to identify where your audience spends time and focus your energy there.</p><ul><li>Instagram vs LinkedIn vs TikTok</li><li>B2B vs B2C considerations</li><li>Content format by platform</li></ul>",
            prevId: undefined, nextId: "l-2-1-2",
          },
          {
            id: "l-2-1-2", courseId: "course-2", blockId: "block-2-1",
            blockTitle: "Block 1: Platform Strategy",
            title: "Module 2: Content Planning",
            type: "video", order: 2,
            mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            prevId: "l-2-1-1", nextId: "l-2-1-3",
          },
          {
            id: "l-2-1-3", courseId: "course-2", blockId: "block-2-1",
            blockTitle: "Block 1: Platform Strategy",
            title: "Course Evaluation",
            type: "quiz", order: 3,
            prevId: "l-2-1-2", nextId: undefined,
            survey: {
              questions: [
                {
                  id: "q1", type: "rating-matrix",
                  prompt: "Rate each section of the course:",
                  required: true,
                  scaleHint: "1 = Poor → 5 = Excellent",
                  rows: [
                    { id: "r1", label: "Platform Strategy module" },
                    { id: "r2", label: "Content Planning module" },
                    { id: "r3", label: "Overall structure" },
                  ],
                },
                {
                  id: "q2", type: "free-text",
                  prompt: "Any other feedback?",
                  required: false,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "course-3",
    title: "Financial Literacy for Entrepreneurs",
    summary: "Understand your numbers, manage cash flow, read a balance sheet, and make decisions that keep your business healthy and growing.",
    category: "Finance",
    percentComplete: 0,
    blocks: [
      {
        id: "block-3-1",
        title: "Block 1: Money Fundamentals",
        order: 1,
        lessons: [
          {
            id: "l-3-1-1", courseId: "course-3", blockId: "block-3-1",
            blockTitle: "Block 1: Money Fundamentals",
            title: "Module 1: Understanding Cash Flow",
            type: "text", order: 1,
            body: "<h2>Cash Flow Basics</h2><p>Cash flow is the lifeblood of any business. This module breaks down the difference between profit and cash, and why a profitable business can still fail.</p>",
            prevId: undefined, nextId: "l-3-1-2",
          },
          {
            id: "l-3-1-2", courseId: "course-3", blockId: "block-3-1",
            blockTitle: "Block 1: Money Fundamentals",
            title: "Task 1: Download Cash Flow Template",
            type: "download", order: 2,
            files: [
              { id: "f5", name: "Cash Flow Forecast Template", url: "#", ext: "xlsx", sizeLabel: "45 KB" },
            ],
            prevId: "l-3-1-1", nextId: undefined,
          },
        ],
      },
    ],
  },
];

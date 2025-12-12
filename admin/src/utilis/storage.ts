export const LESSON_DRAFT_KEY = "lessonDraft";

export const saveLessonDraft = (data: any) => {
  localStorage.setItem(LESSON_DRAFT_KEY, JSON.stringify(data));
};

export const loadLessonDraft = () => {
  const saved = localStorage.getItem(LESSON_DRAFT_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const clearLessonDraft = () => {
  localStorage.removeItem(LESSON_DRAFT_KEY);
};
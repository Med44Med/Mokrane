import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

import AddLessonDetails from "../components/AddLessonDetails";
import AddLessonThumbnail from "../components/AddLessonThumbnail";
import AddLessonContents from "../components/AddLessonContents";

import {
  loadLessonDraft,
  clearLessonDraft,
  saveLessonDraft,
} from "../utilis/storage";

const AddLesson = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  const [phase, setPhase] = useState<"details" | "thumbnail" | "contents">(
    "details"
  );

  const [lesson, setLesson] = useState({
    id: "",
    created_at: "",
    title: "",
    description: "",
    class: "",
    branch: "",
    price: 0,
    sale: 0,
    thumbnail: "",
    contents: [],
  });

  // -------------------------
  // 1️⃣ On mount: check draft
  // -------------------------
  useEffect(() => {
    const draft = loadLessonDraft();
    if (draft) {
      setShowPrompt(true);
    }
  }, []);

  // -------------------------
  // 2️⃣ Continue draft
  // -------------------------
  const handleContinueDraft = () => {
    const draft = loadLessonDraft();
    if (draft) {
      setPhase(draft.phase);
      setLesson(draft.lesson);
    }
    setShowPrompt(false);
  };

  // -------------------------
  // 3️⃣ Discard draft
  // -------------------------
  const handleDiscardDraft = () => {
    clearLessonDraft();
    setShowPrompt(false);
  };

  // -------------------------
  // 4️⃣ Auto-save draft
  // -------------------------
  useEffect(() => {
    const hasData =
      lesson.title.trim() ||
      lesson.description.trim() ||
      lesson.thumbnail ||
      lesson.contents.length > 0 ||
      !!lesson.class ||
      !!lesson.branch ||
      lesson.price > 0 ||
      lesson.sale > 0;

    if (hasData) {
      saveLessonDraft({ lesson, phase });
    }
  }, [lesson, phase]);

  console.log(lesson);
  
  return (
    <>
      <Helmet>
        <title>العقل المدبر | إضافة درس</title>
      </Helmet>

      {/* Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-lg"
            onClick={handleDiscardDraft}
          />
          <div className="z-10 bg-background w-11/12 md:w-2/3 h-1/2 rounded-2xl p-5 flex flex-col justify-center items-center gap-5">
            <h1 className="text-text text-xl md:text-2xl font-semibold">
              يوجد نسخة مسودة لدرسك
            </h1>

            <div className="flex gap-5">
              <button
                onClick={handleDiscardDraft}
                className="bg-orange-400 hover:bg-orange-500 px-10 py-3 text-white text-base text-nowrap  font-semibold rounded-lg cursor-pointer transition"
              >
                تخلص من المسودة
              </button>

              <button
                onClick={handleContinueDraft}
                className="bg-green-500 hover:bg-green-600 px-10 py-3 text-white text-base text-nowrap font-semibold rounded-lg cursor-pointer transition"
              >
                واصل مسودتك
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page title */}
      <div className="w-full flex justify-between items-center mb-10">
        <h1 className="text-text text-3xl font-semibold">إضافة درس</h1>
      </div>

      {/* PHASES */}
      {phase === "details" && (
        <AddLessonDetails lesson={lesson} setLesson={setLesson} setPhase={setPhase} />
      )}

      {phase === "thumbnail" && (
        <AddLessonThumbnail lesson={lesson} setLesson={setLesson} setPhase={setPhase} />
      )}

      {phase === "contents" && (
        <AddLessonContents lesson={lesson} setLesson={setLesson} />
      )}
    </>
  );
};

export default AddLesson;

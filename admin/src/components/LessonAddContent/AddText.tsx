import { useState } from "react";

const AddText = ({ lesson, setLesson, setContent }) => {
  const [text, setText] = useState("");
  const handleAddText = () => {
    setLesson(perv=>({
      ...perv,
      contents: [...lesson.contents, { type: "text", value: text }],
    }));
    setText("");
    setContent(null);
  };

  return (
    <div className="w-full mb-5 p-3 bg-surface rounded-lg shadow">
      <textarea
        placeholder="نص الدرس"
        className="w-full px-3 py-2 bg-background rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition resize-none"
        autoFocus
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleAddText();
          }
        }}
        value={text}
        rows={4}
      />
      <button
        onClick={() => handleAddText()}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
      >
        إضافة النص
      </button>
    </div>
  );
};
export default AddText;

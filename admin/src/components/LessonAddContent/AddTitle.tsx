import { useState } from "react";


const AddTitle = ({ lesson, setLesson, setContent }) => {
  
  const [addTitle, setAddTitle] = useState("");
  const handleAddtitle = () => {
    if (!addTitle) {
      return
    }
    const newArray = [...lesson.contents,{type:'title',value:addTitle}]
    setLesson(perv=>({...perv,contents:newArray}));
    setAddTitle("");
    setContent(null);
  };

  return (
    <div className="w-full mb-5 p-3 bg-surface rounded-lg shadow">
      <input
        type="text"
        placeholder="عنوان الدرس"
        className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddtitle();
          }
        }}
        value={addTitle}
        onChange={(e) => setAddTitle(e.target.value)}
      />
      <button
        onClick={() => handleAddtitle()}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
      >
        إضافة العنوان
      </button>
    </div>
  );
};

export default AddTitle;

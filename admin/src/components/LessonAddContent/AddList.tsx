import { useState } from "react";

const AddList = ({ lesson, setLesson, setContent }) => {
  const [list, setList] = useState([]);
  const [addItem, setAddItem] = useState("");

  const handleAddItem = () => {
    if (addItem.trim() !== "") {
      setList([...list, addItem.trim()]);
      setAddItem("");
    }
  };
  const handleAddList = () => {
    if (list.length > 0) {
      setLesson({
        ...lesson,
        contents: [...lesson.contents, { type: "list", value: list }],
      });
      setList([]);
      setAddItem("");
      setContent(null);
    }
  };
  return (
    <div className="w-full mb-5 p-3 bg-surface rounded-lg shadow">
      <div className="flex flex-col gap-2">
        <ul className="max-h-48 overflow-y-auto mb-3">
          {list.map((item, index) => (
            <li
              key={index}
              className="border-b border-white/20 last:border-0 py-1"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            autoFocus
            value={addItem}
            onChange={(e) => setAddItem(e.target.value)}
            placeholder="أضف عنصر إلى القائمة"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem();
              }
            }}
            className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
          />
          <button
            onClick={() => handleAddItem()}
            className="text-nowrap text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            أضف العنصر
          </button>
        </div>
      </div>
      <button
        onClick={() => handleAddList()}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        أضف القائمة
      </button>
    </div>
  );
};

export default AddList;

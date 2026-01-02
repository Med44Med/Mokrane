;
import GenerateLesson from "../GenerateLesson";
import { useState, useEffect, useEffectEvent } from "react";
import UpdateContents from "./UpdateContents";
import { IoMdAdd } from "react-icons/io";

const Contents = ({ content }) => {
  const [update, setUpdate] = useState(content);
  const [modifyIndex, setModifyIndex] = useState<number | null>(null);

  // const eventContent = useEffectEvent(() => {
  //   return content;
  // });
  // useEffect(() => {}, [update]);

  const addContent = (type) => {
    if (update[update.length - 1].value === "") {
      setUpdate((perv) => {
        const newArr = [...perv];
        const last = newArr[newArr.length - 1];

        newArr[newArr.length - 1] = { ...last, type };
        return newArr;
      });
    } else {
      setUpdate([...update, { type, value: "" }]);
      setModifyIndex(update.length);
    }
  };

  const moveContent = (index, direction) => {
    const newContents = [...update];
    const temp = newContents[index];
    if (direction === "up" && index > 0) {
      newContents[index] = newContents[index - 1];
      newContents[index - 1] = temp;
    } else if (direction === "down" && index < newContents.length - 1) {
      newContents[index] = newContents[index + 1];
      newContents[index + 1] = temp;
    }
    setUpdate(newContents);
  };
  const deleteContent = (index) => {
    const newContent = update.filter((_, i) => i !== index);
    setUpdate(newContent);
  };

  return (
    <>
      <div className=" relative bg-surface p-5 mt-5 rounded-xl flex flex-col gap-2">
        {update.map((i, index) => {
          if (index === modifyIndex) {
            return (
              <UpdateContents
                key={index}
                type={i.type}
                value={i.value}
                index={index}
                setModifyIndex={setModifyIndex}
                setValue={setUpdate}
              />
            );
          } else {
            return (
              <GenerateLesson
                key={index}
                type={i.type}
                value={i.value}
                index={index}
                moveContent={moveContent}
                deleteContent={deleteContent}
                setModifyIndex={setModifyIndex}
              />
            );
          }
        })}
        <div className="w-full min-h-24 rounded-lg border-2 border-dashed border-green-500 flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={() => addContent("title")}
            className="text-green-500 px-3 py-2 border border-green-500 rounded-lg flex gap-1 items-center cursor-pointer hover:bg-green-500/10 transition"
          >
            <h1>إضافة عنوان</h1>
            <IoMdAdd />
          </button>
          <button
            onClick={() => addContent("text")}
            className="text-green-500 px-3 py-2 border border-green-500 rounded-lg flex gap-1 items-center cursor-pointer hover:bg-green-500/10 transition"
          >
            <h1>إضافة نص</h1>
            <IoMdAdd />
          </button>
          <button
            onClick={() => addContent("list")}
            className="text-green-500 px-3 py-2 border border-green-500 rounded-lg flex gap-1 items-center cursor-pointer hover:bg-green-500/10 transition"
          >
            <h1>إضافة القائمة</h1>
            <IoMdAdd />
          </button>
          <button
            onClick={() => addContent("image")}
            className="text-green-500 px-3 py-2 border border-green-500 rounded-lg flex gap-1 items-center cursor-pointer hover:bg-green-500/10 transition"
          >
            <h1>إضافة صورة</h1>
            <IoMdAdd />
          </button>
          <button
            onClick={() => addContent("video")}
            className="text-green-500 px-3 py-2 border border-green-500 rounded-lg flex gap-1 items-center cursor-pointer hover:bg-green-500/10 transition"
          >
            <h1>إضافة فيديو</h1>
            <IoMdAdd />
          </button>
        </div>
      </div>
    </>
  );
};

export default Contents;

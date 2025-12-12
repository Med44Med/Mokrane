import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { IoMdAdd } from "react-icons/io";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import AddTitle from "./LessonAddContent/AddTitle";
import AddText from "./LessonAddContent/AddText";
import AddList from "./LessonAddContent/AddList";
import supabase from "../utilis/supabase";
import { clearLessonDraft } from "../utilis/storage";

const AddLessonContents = ({ lesson, setLesson }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addContent = (type) => {
    switch (type) {
      case "title":
        setContent("title");
        break;
      case "text":
        setContent("text");
        break;
      case "list":
        setContent("list");
        break;
      case "image":
        setContent("image");
        break;
      case "video":
        setContent("video");
        break;
      case "":
        setContent(null);
        break;
      default:
        break;
    }
  };

  console.log(content);

  const moveContent = (index, direction) => {
    const newContents = [...lesson.contents];
    const temp = newContents[index];
    if (direction === "up" && index > 0) {
      newContents[index] = newContents[index - 1];
      newContents[index - 1] = temp;
    } else if (direction === "down" && index < newContents.length - 1) {
      newContents[index] = newContents[index + 1];
      newContents[index + 1] = temp;
    }
    setLesson({
      ...lesson,
      contents: newContents,
    });
  };
  const deleteContent = (index) => {
    const newContents = lesson.contents.filter((_, i) => i !== index);
    setLesson({
      ...lesson,
      contents: newContents,
    });
  };

  const showContent = (item, index) => {
    switch (item.type) {
      case "title":
        return (
          <div className="group relative w-full bg-surface shadow p-5 border-2 border-transparent hover:border-green-500/80 rounded-lg transition overflow-hidden">
            <h1 className="text-2xl text-text font-bold">{item.value}</h1>
            <div className="absolute left-0 top-0 p-1 bg-green-500 flex justify-center items-center gap-1 -translate-y-full group-hover:translate-y-0 transition-transform">
              <FaChevronDown
                onClick={() => moveContent(index, "down")}
                className="text-base cursor-pointer "
              />
              <FaChevronUp
                onClick={() => moveContent(index, "up")}
                className="text-base cursor-pointer "
              />
              <IoClose
                onClick={() => deleteContent(index)}
                className="text-xl cursor-pointer transition hover:text-orange-500 "
              />
            </div>
          </div>
        );
      case "text":
        return (
          <div className="group relative w-full p-5 bg-surface shadow border-2 border-transparent hover:border-green-500/80 rounded-lg transition overflow-hidden">
            <p className="text-base text-text">{item.value}</p>
            <div className="absolute left-0 top-0 p-1 bg-green-500 flex justify-center items-center gap-1 -translate-y-full group-hover:translate-y-0 transition-transform">
              <FaChevronDown
                onClick={() => moveContent(index, "down")}
                className="text-base cursor-pointer "
              />
              <FaChevronUp
                onClick={() => moveContent(index, "up")}
                className="text-base cursor-pointer "
              />
              <IoClose
                onClick={() => deleteContent(index)}
                className="text-xl cursor-pointer transition hover:text-orange-500 "
              />
            </div>
          </div>
        );
      case "list":
        return (
          <div className="group relative w-full p-5 bg-surface shadow border-2 border-transparent hover:border-green-500/80 rounded-lg transition overflow-hidden">
            <ul className="list-disc list-inside">
              {item.value.map((listItem, index) => (
                <li key={index} className="text-text text-base">
                  {listItem}
                </li>
              ))}
            </ul>
            <div className="absolute left-0 top-0 p-1 bg-green-500 flex justify-center items-center gap-1 -translate-y-full group-hover:translate-y-0 transition-transform">
              <FaChevronDown
                onClick={() => moveContent(index, "down")}
                className="text-base cursor-pointer "
              />
              <FaChevronUp
                onClick={() => moveContent(index, "up")}
                className="text-base cursor-pointer "
              />
              <IoClose
                onClick={() => deleteContent(index)}
                className="text-xl cursor-pointer transition hover:text-orange-500 "
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const handleAddContents = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("lessons")
      .update({ content: lesson.contents })
      .eq("title", lesson.title);
    if (error) {
      setError(error.message);
      return;
    }
    clearLessonDraft();
    navigate("/lessons");
  };
  return (
    <div className="w-full rounded-lg flex flex-col">
      {lesson.contents.map((content, index) => (
        <div key={index} className="w-full mb-5 bg-black/30 rounded-lg">
          {showContent(content, index)}
        </div>
      ))}
      {content === "title" && (
        <AddTitle
          lesson={lesson}
          setLesson={setLesson}
          setContent={setContent}
        />
      )}
      {content === "text" && (
        <AddText
          lesson={lesson}
          setLesson={setLesson}
          setContent={setContent}
        />
      )}
      {content === "list" && (
        <AddList
          lesson={lesson}
          setLesson={setLesson}
          setContent={setContent}
        />
      )}
      <div className="w-full min-h-48 rounded-lg border-2 border-dashed border-green-500 flex flex-wrap justify-center items-center gap-3">
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
      {lesson.contents.length > 0 && (
        <div className="w-full min-h-32 flex justify-center items-center ">
          <button
            onClick={handleAddContents}
            className="bg-green-500 px-10 py-2 rounded transition hover:bg-green-600 text-white font-semibold text-xl"
          >
            إضافة محتويات إلى الدرس
          </button>
        </div>
      )}
    </div>
  );
};

export default AddLessonContents;

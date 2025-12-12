import React from "react";
import { FaEdit } from "react-icons/fa";
import { Day } from "../../utilis/Day";
import supabase from "../../utilis/supabase";
import { useRef, useState } from "react";
import { clsx } from "clsx";
import Alert from "../Alert";
import Popup from "../Popup";
import Button from "../Button";
import UpdateDetails from './UpdateDetails';

const Header = ({ lesson, setLesson }) => {
  const [alertLessonStatus, setAlertLessonStatus] = useState(false);
  const [lessonDetails, setLessonDetails] = useState(false);
  

  const inputRef = useRef<HTMLInputElement>(null);

  const handleLessonStatus = async () => {
    const { data, error } = await supabase
      .from("lessons")
      .update({ isLive: !lesson?.isLive })
      .eq("title", lesson?.title)
      .select();
    if (error) {
      console.log(error);
      return;
    }
    setLesson(data[0]);
    setAlertLessonStatus(true);
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
      <div
        onClick={() => setLessonDetails(true)}
        className="relative group flex flex-col md:flex-row items-center gap-3 px-5 py-2 cursor-pointer rounded"
      >
        <div className="absolute z-10 inset-0 rounded bg-primary/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex justify-center items-center gap-3 ">
          <h1 className="text-2xl text-white font-bold hidden md:block">
            تعديل
          </h1>
          <FaEdit className="text-2xl text-primary md:text-white font-semibold" />
        </div>
        <div className="size-22 rounded-full shadow overflow-hidden flex justify-center items-center">
          <img
            src={lesson.thumbnail}
            alt="thumbnail"
            className="size-22 rounded-full shadow scale-120 group-hover:scale-130"
          />
        </div>
        <div>
          <h1 className="text-text text-2xl font-bold mb-1">{lesson?.title}</h1>
          <h1 className="text-sm font-semibold text-text-secondary">
            {lesson.class} - {lesson.branch}
          </h1>
          <h1 className="text-sm font-semibold text-text-secondary">
            {Day(lesson.created_at)}
          </h1>
        </div>
      </div>
      <div className="w-full px-5 md:px-0 md:w-fit flex justify-between md:justify-center  items-center gap-3">
        <input
          type="checkbox"
          checked={lesson?.isLive ? lesson.isLive : false}
          onChange={handleLessonStatus}
          className="hidden"
          ref={inputRef}
        />
        <h1 className="text-text text-xl font-semibold">حالة الدرس</h1>
        <div
          onClick={() => inputRef.current.click()}
          className={clsx(
            "shadow rounded-full p-0.5",
            lesson.isLive ? "bg-primary " : "bg-surface "
          )}
        >
          <div className=" w-12 h-6 rounded-full shadow relative cursor-pointer ">
            <div
              className={clsx(
                "absolute top-1/2 -translate-y-1/2  left-0 h-6 w-6 rounded-full  ",
                lesson.isLive
                  ? "bg-white translate-x-full"
                  : "bg-text-secondary translate-x-0"
              )}
            />
          </div>
        </div>
        {/* <Link
          to={`/lessons/edit?target=${lesson.title}`}
          className="mr-auto md:bg-green-500 px-2 py-2 md:px-10  flex justify-center items-center gap-3 rounded transition cursor-pointer hover:bg-green-600"
        >
          <h1 className="text-xl text-white font-semibold hidden md:block">
            تعديل
          </h1>
          <FaEdit className="text-xl text-primary md:text-white font-semibold" />
        </Link> */}
      </div>
      <Alert
        show={alertLessonStatus}
        setShow={setAlertLessonStatus}
        title={`لقد تم تغيير حالة الدرس الخاص بك إلى : ${
          lesson.isLive ? "نشط" : "معلق"
        }`}
      />
      <UpdateDetails show={lessonDetails} setShow={setLessonDetails} lesson={lesson}/>
    </div>
  );
};

export default Header;

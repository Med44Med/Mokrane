import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { useState, useEffect } from "react";

import { FaFilter } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FcFolder } from "react-icons/fc";

import supabase from "../utilis/supabase";
import Loading from "../components/Spinner";
import LessonsFilter from "../components/LessonsFilter";
import LessonIcon from "../components/LessonIcon";
import Header from "@/Components/Header";
import type { LessonType } from "../types";
import Button from "../components/Button";

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("something went wrong");

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState({});
  const [retry, setRetry] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("lessons")
        .select("title,isLive");
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setLessons(data);
      setLoading(false);
    })();
  }, [retry]);

  return (
    <>
      <Helmet>
        <title>العقل المدبر | الدروس</title>
      </Helmet>

      <Header title="الدروس" />
      <div className="w-full flex justify-between items-center gap-3 mb-10">
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن درس..."
          className="flex-1 md:flex-none w-1/2 px-5 py-2 bg-surface text-text shadow rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
        />
        <button
          onClick={() => setShowFilter(true)}
          className="px-3 md:px-5 py-2 bg-transparent md:bg-primary rounded-lg flex justify-center items-center gap-3 hover:bg-primary-hover transition cursor-pointer"
        >
          <h1 className="text-white font-semibold hidden md:block">تصفية</h1>
          <FaFilter className="text-primary text-xl md:text-white" />
        </button>
      </div>
      <div className="mb-10 flex-1 flex flex-col justify-center items-center gap-3 rounded-lg">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-text text-2xl">لقد حدث خطأ ما</h1>
            <h1 className="text-text-secondary text-base">{error}</h1>
            <Button onClick={() => setRetry(retry + 1)} className="mt-3">
              <h1 className="text-white text-base">إعادة المحاولة</h1>
            </Button>
          </div>
        ) : lessons.length === 0 ? (
          <>
            <h1 className="text-2xl text-text font-semibold">لا يوجد دروس</h1>
          </>
        ) : (
          <div className="mb-10 flex-1 w-full flex justify-start items-start flex-wrap gap-x-5 gap-y-10 rounded-lg">
            {lessons
              .filter((lesson) => lesson.title.includes(search))
              .map((lesson) => (
                <LessonIcon
                  key={lesson.title}
                  title={lesson.title}
                  status={lesson.status}
                />
              ))}
          </div>
        )}
      </div>

      <Link
        to="/lessons/add"
        className="fixed bottom-10 left-7 px-5 md:px-10 py-5 md:py-3 bg-green-500  rounded-full md:rounded-lg flex justify-center items-center hover:bg-green-600 transition"
      >
        <h1 className="text-white font-semibold hidden md:block">إضافة درس</h1>
        <IoMdAdd className="text-white text-3xl md:text-2xl" />
      </Link>
      <LessonsFilter
        show={showFilter}
        setShow={setShowFilter}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
};

export default Lessons;

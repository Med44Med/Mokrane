import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { FaSpinner } from "react-icons/fa";
import Header from "../Components/UI/Header";
import supabase from "../utilis/supabase";
import { AuthContext } from "../contexts/contexts";
import Input from "../Components/UI/Input";

type LessonProps = {
  title: string;
  description: string;
  thumbnail: string;
};

const Lesson = ({ lesson }: { lesson: LessonProps }) => (
  <Link
    to={`${lesson.title}`}
    className="group w-full h-96 bg-surface hover:bg-primary/10 shadow p-5 rounded-2xl flex flex-col justify-start items-start gap-1"
  >
    <div className="w-full overflow-hidden rounded-xl">
      <img
        src={lesson.thumbnail}
        alt="lesson.title"
        className="w-full aspect-video rounded-xl group-hover:scale-105 duration-1000! transition"
      />
    </div>
    <h1 className="text-text text-xl font-bold line-clamp-2 mt-3">
      {lesson.title}
    </h1>
    <p className="text-text-secondary text-base font-normal line-clamp-4">
      {lesson.description}
    </p>
  </Link>
);

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState("");

  const { user } = useContext(AuthContext);
  console.log(lessons);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("title,description,thumbnail")
        .eq("isLive", true);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setLessons(data);
      setLoading(false);
    })();
  }, [user]);

  return (
    <>
      <Header title="الدروس" />
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <FaSpinner className="animate-spin text-green-400 text-4xl" />
          <p className="text-text">جارٍ تحميل الدروس، يرجى الانتظار...</p>
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : lessons.length === 0 ? (
        <div className="relative flex-1 grid grid-cols-5 grid-rows-3 gap-x-3 gap-y-1 flex-wrap"></div>
      ) : (
        <div className="relative flex-1 flex flex-col gap-5 mt-5">
          <div>
            <Input className="w-full md:w-1/3" placeholder="بحث..." autoFocus value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div className="relative flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-10 md:gap-y-10   md:p-0">
            {lessons
              .filter((l) => l.title.includes(search))
              .map((lesson) => (
                <Lesson lesson={lesson} key={lesson.title} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Lessons;

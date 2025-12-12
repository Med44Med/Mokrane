import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FcOpenedFolder } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";

type LessonProps = {
  id: number;
  title: string;
};

const Lesson = ({ lesson }: { lesson: LessonProps }) => (
  <Link
    to={`${lesson.id}`}
    className="w-56 flex flex-col items-center justify-start gap-2 p-4  rounded-lg hover:bg-green-400/20 transition"
  >
    <FcOpenedFolder className="text-green-400 text-8xl" />
    <h1 className="w-2/3 text-white text-wrap text-center">{lesson.title}</h1>
  </Link>
);

const Lessons = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LessonProps[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setData([
        { id: 1, title: "Introduction to React" },
        { id: 2, title: "Advanced JavaScript Concepts" },
        { id: 3, title: "State Management with Redux" },
        { id: 4, title: "Building RESTful APIs with Node.js" },
        { id: 5, title: "Introduction to TypeScript" },
        { id: 6, title: "Frontend Development with Vue.js" },
        { id: 7, title: "Introduction to React" },
        { id: 8, title: "Advanced JavaScript Concepts" },
        { id: 9, title: "State Management with Redux" },
        { id: 10, title: "Building RESTful APIs with Node.js" },
        { id: 11, title: "Introduction to TypeScript" },
        { id: 12, title: "Frontend Development with Vue.js" },
        { id: 17, title: "Introduction to React" },
        { id: 18, title: "Advanced JavaScript Concepts" },
        { id: 19, title: "State Management with Redux" },
        { id: 13, title: "Building RESTful APIs with Node.js" },
        { id: 14, title: "Introduction to TypeScript" },
        { id: 15, title: "Frontend Development with Vue.js" },
      ]);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">الدروس</h1>
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <FaSpinner className="animate-spin text-green-400 text-4xl" />
          <p>Loading lessons, please wait...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="relative flex-1 grid grid-cols-5 grid-rows-3 gap-x-3 gap-y-1 flex-wrap"></div>
      ) : (
        <div className="relative flex-1 grid grid-cols-5 grid-rows-3 gap-x-3 gap-y-1 flex-wrap">
          {data.map((lesson) => (
            <Lesson lesson={lesson} key={lesson.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Lessons;

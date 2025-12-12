import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import supabase from "../utilis/supabase";
import Loading from "../components/Spinner";
import { Day } from "../utilis/Day";
import { FaEdit } from "react-icons/fa";
import GenerateLesson from "../components/GenerateLesson";
import Header from "../components/lesson/Header";
import Contents from '../components/lesson/Contents';

const Lesson = () => {
  const { title } = useParams();
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select()
        .eq("title", title)
        .single();
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setLesson(data);
      setLoading(false);
    })();
  }, [title]);


  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1 className='text-2xl text-text font-bold'>{error}</h1>
      ) : (
        <>
          <Header lesson={lesson} setLesson={setLesson} />
          <Contents content={lesson.content} />
        </>
      )}
    </>
  );
};

export default Lesson;

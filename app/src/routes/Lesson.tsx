import { useLoaderData } from "react-router";
import Header from "../Components/UI/Header";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import supabase from "../utilis/supabase";
import MuxPlayer from "@mux/mux-player-react/lazy";

const Lesson = () => {
  const { title } = useLoaderData();

  const [lesson, setLesson] = useState<LessonProps>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      setError("");
      const { data, error } = await supabase
        .from("lessons")
        .select("content")
        .eq("title", title)
        .single();

      if (error) {
        setError("");
        setLoading(false);
        return;
      }
      setLesson(data?.content);
      setLoading(false);
    })();
  }, [title]);

  console.log(lesson);

  return (
    <>
      <Header title={title} />
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <FaSpinner className="animate-spin text-green-400 text-4xl" />
          <p className="text-text">جارٍ تحميل الدرس، يرجى الانتظار...</p>
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="bg-surface mt-10 rounded-2xl flex-1 flex flex-col justify-start items-center p-5">
          {lesson.map((item, index) => (
            <RenderLesson key={index} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

const RenderLesson = ({ item }) => {
  switch (item?.type) {
    case "title":
      return (
        <h1 className="w-full text-text mb-3 text-2xl font-bold">
          {item?.value}
        </h1>
      );
    case "text":
      return <p className="w-full text-text mb-2 pr-3">{item?.value}</p>;
    case "list":
      return (
        <ul className="w-full pr-3 mb-2">
          {item?.value.map((e, i) => (
            <li key={i} className="text-text">
              {e}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <img
          src={item?.value}
          alt="lesson img"
          className="my-5 w-2/3 aspect-video rounded-xl object-center object-fit"
          loading="lazy"
        />
      );
    case "video":
      return (
        <MuxPlayer
          playbackId={item?.value}
          // metadata={{
          //   video_id: "video-id-54321",
          //   video_title: "Test video title",
          //   viewer_user_id: "user-id-007",
          // }}
          className="my-5 w-2/3 aspect-video"
        />
      );

    default:
      break;
  }
};

export default Lesson;

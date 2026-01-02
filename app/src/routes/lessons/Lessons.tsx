import Header from "@/Components/Header";

import LessonsLoading from "./LessonsLoading";
import LessonError from "./LessonError";
import LessonData from "./LessonData";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useSupabase } from "../../hooks/useSupabase";

const Lessons = () => {
  // const [_, reRender] = useState(0);

  // const [data, loading, error] = useFetch("lessons");

  const { data, loading, error, hasMore, loadMore, reset } = useSupabase({
    table: "lessons",
    select: "class,branch,title,description,thumbnail",
    pageSize: 12,
  });

  const loaderRef = useInfiniteScroll(loadMore, !hasMore);

  return (
    <>
      <Header title="الدروس" />
      <div className="flex-1">
        {loading ? (
          <LessonsLoading />
        ) : error ? (
          <LessonError error={error.message} retry={reset} />
        ) : (
          <LessonData data={data} ref={loaderRef} />
        )}
      </div>
      {/*
        <div className="relative flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-10 md:gap-y-10   md:p-0">
          {lessons
            .filter((l) => l.title.includes(search))
            .map((lesson) => (
              <Lesson lesson={lesson} key={lesson.title} />
            ))}
        </div>
      )} */}
    </>
  );
};

export default Lessons;

import { forwardRef } from "react";
import LessonConsole from "./LessonConsole";
import { Link } from "react-router";
import { SubText, SubHeading } from "../../Components/Typo";
import { Text } from "@/Components/Typo";
import { Surface } from "@/Components/UI";
import Button from "@/Components/UI/Button";

type LessonProps = {
  title: string;
  description: string;
  thumbnail: string;
};

const Lesson = ({ lesson }: { lesson: LessonProps }) => (
  <Surface className="group p-3 flex flex-col justify-start items-start gap-1">
    <div className="w-full overflow-hidden rounded-xl">
      <img
        src={lesson.thumbnail}
        alt="lesson.title"
        className="w-full aspect-video rounded-xl group-hover:scale-105 duration-1000! transition"
      />
    </div>
    <SubText className="mt-3">{lesson.class + " - " + lesson.branch}</SubText>
    <SubHeading>{lesson.title}</SubHeading>
    <Text secondary>{lesson.description}</Text>
    <Link to={`/lessons/${lesson.title}`} className="w-full py-2 text-center bg-primary hover:bg-primary-hover rounded-lg text-white font-bold">
      ابدأ الدرس
    </Link>
  </Surface>
);

const LessonData = forwardRef(({ data }, ref) => {
  return (
    <>
      <LessonConsole />
      <div className="w-full mt-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-10 md:gap-y-10   md:p-0">
        {data.map((l, index) => (
          <Lesson lesson={l} key={index} />
        ))}
      </div>
      <div ref={ref} />
    </>
  );
});

export default LessonData;

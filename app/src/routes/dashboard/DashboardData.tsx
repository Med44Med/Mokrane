import { Surface } from "@/Components/UI";
import { SubHeading, SubText } from "@/Components/Typo";
import { Link } from "react-router";
import { LuSquareArrowUpLeft } from "react-icons/lu";
import Carousel from "./Carousel";

const DashboardData = ({ lastLesson, notifications, messages,carouselData }) => {
  return (
    <>
      <Surface className="p-5 col-start-1 row-start-4 md:row-start-1 flex flex-col justify-start items-center gap-1">
        <SubHeading className="w-full text-text">تابع الدرس السابق</SubHeading>
        <SubText secondary className="line-clamp-1 w-full">
          {lastLesson ? lastLesson : "ليس لديك أي درس"}
        </SubText>
        {lastLesson ? (
          <Link
            to={`/lessons/${lastLesson ? lastLesson : ""}`}
            className="text-white mt-auto mr-auto flex gap-1 items-center hover:gap-2"
          >
            <SubText>واصل</SubText>
            <LuSquareArrowUpLeft className="text-xl text-text" />
          </Link>
        ) : (
          <Link
            to="/lessons"
            className="text-white mt-auto mr-auto flex gap-1 items-center hover:gap-2"
          >
            <SubText>الدروس</SubText>
            <LuSquareArrowUpLeft className="text-xl text-text" />
          </Link>
        )}
      </Surface>
      <Surface className="p-5 col-start-1 row-start-5 md:col-start-1 md:row-start-2 flex flex-col justify-start items-start gap-1">
        <SubHeading className="w-full text-text">الإشعارات</SubHeading>
        {notifications === 0 ? (
          <SubText secondary>ليس لديك أي إشعارات</SubText>
        ) : (
          <SubText>&#x1F7E2; {`لديك ${notifications} إشعارات`}</SubText>
        )}
        {notifications !== 0 && (
          <Link
            to={`/notifications`}
            className="text-white mt-auto mr-auto flex gap-1 items-center hover:gap-2"
          >
            <SubText>واصل</SubText>
            <LuSquareArrowUpLeft className="text-xl text-text" />
          </Link>
        )}
      </Surface>
      <Surface className="p-5 col-start-1 row-start-6 md:col-start-1 md:row-start-3 flex flex-col justify-start items-start gap-1">
        <SubHeading className="w-full text-text">الرسائل</SubHeading>
        {messages === 0 ? (
          <SubText secondary>ليس لديك أي رسائل</SubText>
        ) : (
          <SubText className="w-full">
            &#x1F7E2; {`لديك ${messages} رسائل`}
          </SubText>
        )}
        {messages !== 0 && (
          <Link
            to={`/lesson/${lastLesson}`}
            className="text-white mt-auto mr-auto flex gap-1 items-center hover:gap-2"
          >
            <SubText>واصل</SubText>
            <LuSquareArrowUpLeft className="text-xl text-text" />
          </Link>
        )}
      </Surface>
      <Carousel
        data={carouselData}
      />
    </>
  );
};

export default DashboardData;

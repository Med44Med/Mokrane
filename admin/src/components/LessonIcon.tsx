;
import { Link } from "react-router";
import { FcFolder } from "react-icons/fc";
import { FaCircleCheck } from "react-icons/fa6";
import { BiSolidTime } from "react-icons/bi";

const LessonIcon = ({ title, status }: { title: string; status: string }) => {
  const handleStatus = () => {
    switch (status) {
      case "pending":
        return (
          <div className="z-10 absolute bottom-2 left-1 size-6 bg-white rounded-full flex justify-center items-center">
            <BiSolidTime className="text-orange-400 text-xl" />
          </div>
        );
      case "online":
        return (
          <div className="z-10 absolute bottom-2 left-1 size-6 bg-white rounded-full flex justify-center items-center">
            <FaCircleCheck className="text-primary text-xl" />
          </div>
        );

        break;

      default:
        break;
    }
  };

  
  return (
    <Link to={`/lessons/${title}`}>
      <div title={"قيد الانتظار"} className="relative h-48 w-96 md:w-44 flex flex-col items-center justify-start gap-2 rounded-lg hover:bg-green-500/20 transition">
        <div className="relative">
          <FcFolder className="text-8xl " />
          {handleStatus()}
        </div>
        <h1 className="w-2/3 text-text font-semibold text-wrap text-center line-clamp-2">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default LessonIcon;

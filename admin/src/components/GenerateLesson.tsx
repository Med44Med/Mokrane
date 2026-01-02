;
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const GenerateLesson = ({ type, value, index, moveContent, deleteContent,setModifyIndex }) => {
  switch (type) {
    case "title":
      return (
        <div className="group relative overflow-hidden w-full rounded-lg pl-20  pb-1 cursor-pointer hover:bg-primary/20 hover:py-5 ">
          <h1 onClick={()=>setModifyIndex(index)} className="text-text font-bold text-xl">{value}</h1>
          <div className="absolute left-0 top-0 p-1 bg-green-500 flex justify-center items-center gap-1 -translate-y-full group-hover:translate-y-0 transition-transform">
            <FaChevronDown
              onClick={() => moveContent(index, "down")}
              className="text-base text-white cursor-pointer "
            />
            <FaChevronUp
              onClick={() => moveContent(index, "up")}
              className="text-base text-white cursor-pointer "
            />
            <IoClose
              onClick={() => deleteContent(index)}
              className="text-xl text-white cursor-pointer transition hover:text-orange-500 "
            />
          </div>
        </div>
      );
    case "text":
      return (
        <div className="group relative overflow-hidden rounded-lg w-full pl-20  pb-1 cursor-pointer hover:bg-primary/20 hover:py-5 ">
          <p onClick={()=>setModifyIndex(index)} className="pr-3 text-text font-normal text-base">{value}</p>
          <div className="absolute left-0 top-0 p-1 bg-green-500 flex justify-center items-center gap-1 -translate-y-full group-hover:translate-y-0 transition-transform">
            <FaChevronDown
              onClick={() => moveContent(index, "down")}
              className="text-base text-white cursor-pointer "
            />
            <FaChevronUp
              onClick={() => moveContent(index, "up")}
              className="text-base text-white cursor-pointer "
            />
            <IoClose
              onClick={() => deleteContent(index)}
              className="text-xl text-white cursor-pointer transition hover:text-orange-500 "
            />
          </div>
        </div>
      );
    case "list":
      return (
        <ul className="w-full pr-6 list-disc">
          {value.map((i, index) => (
            <li key={index} className="text-text font-normal text-base pb-0.5">
              {i}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <div className="w-full">
          <img src={value} alt="lesson-image" />
        </div>
      );

    default:
      break;
  }
};

export default GenerateLesson;

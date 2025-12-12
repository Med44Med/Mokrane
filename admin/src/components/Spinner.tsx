import { useRef, useEffect } from "react";
import { clsx } from "clsx";

const Loading = ({ text = true ,className}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (textRef.current.innerText === "يرجى الانتظار...") {
        textRef.current.innerText = "يرجى الانتظار.";
      } else {
        textRef.current.innerText += ".";
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={clsx(
        "size-32 mx-auto flex flex-col justify-center items-center gap-3",
        className
      )}
    >
      <div className="relative size-32">
        <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-green-500 size-6 rounded-full " />

        <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-transparent size-16 rounded-full border border-green-500" />
        <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-transparent size-24 rounded-full border border-green-500" />

        <div className="absolute top-1/2 left-1/2 animate-spin [animation-duration:.7s]">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-green-500 size-3 rounded-full translate-x-6 origin-center" />
        </div>
        <div className="absolute top-1/2 left-1/2 animate-spin">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-green-500 size-3 rounded-full translate-x-11 origin-center" />
        </div>
      </div>
      {text && (
        <h1
          ref={textRef}
          className="w-full text-start text-green-500 font-semibold text-xl"
        >
          يرجى الانتظار...
        </h1>
      )}
    </div>
  );
};

export default Loading;

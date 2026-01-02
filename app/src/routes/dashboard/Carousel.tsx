import { Surface } from "@/Components/UI";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { GoDotFill, GoDot } from "react-icons/go";
import { Heading } from "@/Components/Typo";

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((perv) => {
        if (perv === data?.length - 1) return 0;
        return perv + 1;
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Surface
      dir="ltr"
      className="row-span-3 col-start-1 row-start-1 md:col-span-2 md:row-span-3 md:col-start-2 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 flex"
        style={{
          width: `${data?.length * 100}%`,
          transform: `translateX(${(-index * 100) / data?.length}%)`,
        }}
      >
        {data?.map((l, i) => (
          <Link
            key={i}
            to={l.url}
            className="relative w-1/3 h-full p-3 overflow-hidden"
          >
            <img
              src={l?.image}
              alt=""
              className="-z-10 absolute top-0 left-0 w-full   rounded-xl h-full object-conver object-center"
            />
            {l?.title && (
              <Heading className="z-10 absolute bottom-14 right-10 text-white!">
                {l?.title}
              </Heading>
            )}
          </Link>
        ))}
      </div>
      <div className="z-10 absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-between items-center gap-1">
        {data?.map((_, i) => {
          if (i === index) {
            return (
              <GoDotFill
                onClick={() => setIndex(i)}
                className="text-2xl text-primary cursor-pointer"
              />
            );
          } else {
            return (
              <GoDot
                onClick={() => setIndex(i)}
                className="text-2xl text-primary cursor-pointer"
              />
            );
          }
        })}
      </div>
    </Surface>
  );
};

export default Carousel;

{
  /* <Surface className="row-span-3 col-start-1 row-start-1 md:col-span-2 md:row-span-3 md:col-start-2 relative overflow-hidden ltr">
        <div className="absolute inset-0 w-[300%] translate-x-2/3 flex">
        <div className='w-1/3 bg-amber-200'></div>
        <div className='w-1/3 bg-amber-500'></div>
        <div className='w-1/3 bg-red-200'></div>
        {/* <img
          src="https://picsum.photos/id/09/300/200"
          alt="1"
          className="p-5 w-1/3 h-full object-cover object-center"
        />
          <img
            src="https://picsum.photos/id/23/300/200"
            alt="2"
            className="p-5 w-1/3 h-full object-cover object-center"
          /> 
        </div>

        <div
         
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-between items-center gap-1"
        >
          <GoDotFill className="text-xl text-primary cursor-pointer" />
          <GoDot className="text-xl text-primary cursor-pointer" />
          <GoDot className="text-xl text-primary cursor-pointer" />
          <GoDot className="text-xl text-primary cursor-pointer" />
          <GoDot className="text-xl text-primary cursor-pointer" />
        </div>
      </Surface> */
}

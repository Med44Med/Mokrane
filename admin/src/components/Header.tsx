import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-10 mt-28 md:mt-10 ">
      <div classNaùe='relative h-10 flex items-center'>
        <h1 className="absolute text-text text-3xl font-black slideTop">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;

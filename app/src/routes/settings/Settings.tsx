import { clsx } from "clsx";
import { useState, useEffect, useContext } from "react";
import Header from "@/Components/Header";
import { Surface } from "@/Components/UI";
import { SubHeading } from '../../Components/Typo';
import { AuthContext } from "@/contexts/contexts.ts";
import type { AuthContextType } from "@/contexts/contexts";
import { Text, SubText } from "@/Components/Typo";
import { Link } from "react-router";
import { MdArrowOutward } from "react-icons/md";
import { SubSurface } from '../../Components/UI';

const Settings = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  // const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    const handleTheme = () => {
      const html: HTMLElement | null = document.querySelector("html");
      if (!html) {
        return;
      }
      const data: string | null = html.getAttribute("theme");
      setTheme(data as "dark" | "light" | null);
    };
    handleTheme();
  }, []);

  useEffect(() => {
    const html: HTMLElement | null = document.querySelector("html");
    if (!html || !theme) {
      return;
    }
    html.setAttribute("theme", theme);
  }, [theme]);

  return (
    <>
      <Header title="الإعدادات" />
      <div className="flex-1 mb-5 py-6 grid grid-cols-4 grid-rows-3 gap-3">
        <Surface className="col-span-2 row-span-3 flex flex-col justify-start items-center p-3">
          <SubHeading className="mb-3 w-full">الحساب</SubHeading>
          <img
            src={
              user?.avatar ? user.avatar : "https://picsum.photos/id/1/200/300"
            }
            alt="profile"
            className="my-3 size-36 rounded-full object-cover object-center border-4 border-primary/50"
          />
          {/* <h4 className="hover:text-green-400/50 transition cursor-pointer">
            Edit Profile
          </h4> */}
          <SubHeading>{user?.lastname + " " + user?.firstname}</SubHeading>
          <SubText secondary>{user?.email}</SubText>
          <Link
            to="/profile"
            className="group mt-auto mr-auto rounded flex items-center gap-0.5 hover:gap-1"
          >
            <Text className="group-hover:text-primary">تعديل الحساب</Text>
            <MdArrowOutward className="text-xl text-text group-hover:text-primary group-hover:text-2xl" />
          </Link>
        </Surface>
        <Surface className="col-span-2 row-span-2 flex flex-col justify-start items-center p-3">
          <SubHeading className="mb-3 w-full">المظهر</SubHeading>
          <div className="w-full flex-1 flex justify-center items-center gap-10">
            <div
              onClick={() => setTheme("light")}
              className="group w-1/2  flex flex-col items-center gap-3 cursor-pointer"
            >
              <div
                className={clsx(
                  "w-full bg-white/90 aspect-video border-4 transition rounded-2xl group-hover:border-green-400/80 ",
                  theme === "light" && "border-green-400/80"
                )}
              />
              <Text>الوضع الفاتح</Text>
            </div>
            <div
              onClick={() => setTheme("dark")}
              className="group w-1/2  flex flex-col items-center gap-3 cursor-pointer"
            >
              <SubSurface
                className={clsx(
                  "w-full bg-[#1d1d1d]! aspect-video border-4 border-transparent transition rounded-2xl group-hover:border-green-400/80 ",
                  theme === "dark" && "border-green-400/80"
                )}
              />
              <Text>الوضع الداكن</Text>
            </div>
          </div>
        </Surface>
        <Surface className="col-span-1 row-span-1"></Surface>
        <Surface className="col-span-1 row-span-1"></Surface>
      </div>
      {/* 
      <div className="mt-4 w-full bg-black/20 rounded-2xl p-4 shadow flex flex-col justify-center items-center gap-3 mb-6">
        <h1 className="w-full text-start text-2xl font-semibold mb-6">Theme</h1>
        <div className="w-full flex justify-center gap-20">
          <div
            onClick={() => setTheme("light")}
            className="group w-1/4  flex flex-col items-center gap-3 cursor-pointer"
          >
            <div
              className={clsx(
                "w-full bg-white/90 aspect-video border-4 transition rounded-2xl group-hover:border-green-400/80 ",
                theme === "light" && "border-green-400/80"
              )}
            />
            <h1>Light Mode</h1>
          </div>
          <div
            onClick={() => setTheme("dark")}
            className="group w-1/4  flex flex-col items-center gap-3 cursor-pointer"
          >
            <div
              className={clsx(
                "w-full bg-black/90 aspect-video border-4 transition rounded-2xl group-hover:border-green-400/80 ",
                theme === "dark" && "border-green-400/80"
              )}
            />
            <h1>Dark Mode</h1>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full bg-orange-400/20 border-4 border-orange-400 rounded-2xl p-4 shadow flex flex-col justify-center items-center gap-3">
        <h1 className="w-full text-start text-2xl font-semibold mb-6 text-orange-400">
          Danger Zone
        </h1>
        <button
          onClick={() => setIsDeleting(true)}
          className="my-10 px-10 py-2 bg-orange-400 rounded font-bold cursor-pointer transition hover:bg-orange-500"
        >
          Delete Account
        </button>
      </div>
      {isDeleting && (
        <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center ">
          <div
            onClick={() => setIsDeleting(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="z-10 bg-white w-1/2 h-1/2 rounded-2xl flex flex-col justify-start items-center">
            <h1 className="text-black">a</h1>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Settings;

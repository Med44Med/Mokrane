import React from "react";
import { Link, NavLink } from "react-router";
import { FaHome, FaBookOpen, FaStore, FaUsers } from "react-icons/fa";
import { IoSettingsSharp, IoClose, IoStatsChart } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";

import { IoIosMenu } from "react-icons/io";

import { clsx } from "clsx";
import { useContext, useState } from "react";
import type { AuthContextType } from "../contexts/contexts";
import { AuthContext,MessageContext } from "../contexts/contexts";
import { TbLogout } from "react-icons/tb";

const Aside = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  const {messageNotifications} = useContext(MessageContext)

  const [asideShow, setAsideShow] = useState(false);
  if (!authContext) {
    return null;
  }
  const { user, logout } = authContext;

  
  return (
    <>
      <aside
        dir="rtl"
        className="z-50 fixed top-0 right-0 w-64 h-dvh  bg-surface p-4 md:flex flex-col shadow-lg hidden slideLeft"
      >
        <div className="w-full flex flex-col items-center justify-center gap-1 border-b-2 border-gray-200 pb-4 mb-4">
          <div className="size-28 bg-white/10 rounded-full shadow-2xl"></div>
          <Link to="/profile" className="flex gap-1 ">
            <span className="capitalize font-semibold text-text">
              {user?.firstname || "PROF"}
            </span>
            <span className="capitalize font-semibold text-text">
              {user?.lastname || "Disc"}
            </span>
          </Link>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <NavLink
            to=""
            className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
            })}
          >
            {({ isActive }) => (
              <>
                <FaHome
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                />
                <span
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  لوحة التحكم
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="statistics"
            className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
            })}
          >
            {({ isActive }) => (
              <>
                <IoStatsChart
                  className={clsx(
                    "text-lg transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                />
                <span
                  className={clsx(
                    "text-lg transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  إحصائيات
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="orders"
            className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
            })}
          >
            {({ isActive }) => (
              <>
                <FaStore
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                />
                <span
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  طلبات
                </span>
                {/* {messageCount > 0 && (
                  <span className="text-primary text-base font-black mr-auto ml-5">
                    {messageCount}
                  </span>
                )} */}
              </>
            )}
          </NavLink>
          <NavLink
            to="lessons"
            className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
            })}
          >
            {({ isActive }) => (
              <>
                <FaBookOpen
                  className={clsx(
                    "text-lg transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                />
                <span
                  className={clsx(
                    "text-lg transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  الدروس
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="messages"
            className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
            })}
          >
            <FaMessage className="text-lg text-white/70 transition group-hover:text-green-400" />
            <span className="text-lg text-white/70 transition group-hover:text-green-400">
              الرسائل
            </span>
            {messageNotifications > 0 && (
              <span className="text-primary text-base font-black mr-auto ml-5">
                {messageNotifications}
              </span>
            )}
          </NavLink>
          <NavLink
            to="students"
            className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
            })}
          >
            {({ isActive }) => (
              <>
                <FaUsers
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                />
                <span
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  طلاب
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="settings"
            className="mt-auto group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
            })}
          >
            {({ isActive }) => (
              <>
                <IoSettingsSharp
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500 ",
                    isActive ? "text-primary" : "text-text"
                  )}
                />
                <span
                  className={clsx(
                    "text-lg  transition group-hover:text-green-500",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  الإعدادات
                </span>
              </>
            )}
          </NavLink>
          <button
            onClick={() => {
              logout();
            }}
            className=" group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4 cursor-pointer"
          >
            <TbLogout className="text-xl text-text transition group-hover:text-primary" />
            <span className="text-lg text-text transition group-hover:text-primary">
              تسجيل الخروج
            </span>
          </button>
        </nav>
      </aside>
      <header dir="rtl" className="fixed top-0 left-0 h-20 w-full bg-surface flex md:hidden justify-between items-center px-5 shadow">
        <h1 className="text-text text-3xl font-black">المنصة</h1>
        <IoIosMenu
          onClick={() => setAsideShow(true)}
          className="text-text text-5xl"
        />
      </header>
      <nav dir="rtl"
        className={clsx(
          "z-50 fixed top-0 left-0 w-full h-dvh bg-surface translate-x-full [&.active]:translate-x-0 p-10 pt-20 flex flex-col justify-start items-center gap-8",
          asideShow && "active"
        )}
      >
        <IoClose
          className="absolute text-text top-5 left-5 text-4xl"
          onClick={() => setAsideShow(false)}
        />
        <div className="w-full flex flex-col items-center justify-center gap-5 border-b-2 border-gray-200 pb-4 mb-4">
          <div className="size-28 bg-white/10 rounded-full shadow-2xl"></div>
          <Link
            to="/profile"
            onClick={() => setAsideShow(false)}
            className="flex gap-1 "
          >
            <span className="capitalize font-semibold text-text">
              {user?.firstname || "ADMIN"}
            </span>
            <span className="capitalize font-semibold text-text">
              {user?.lastname || "ADMIN"}
            </span>
          </Link>
        </div>
        <NavLink
          to="/"
          onClick={() => setAsideShow(false)}
          className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
          })}
        >
          {({ isActive }) => (
            <>
              <FaHome
                className={clsx(
                  "text-3xl  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              />
              <span
                className={clsx(
                  "text-2xl font-bold  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              >
                لوحة التحكم
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="lessons"
          onClick={() => setAsideShow(false)}
          className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
          })}
        >
          {({ isActive }) => (
            <>
              <FaBookOpen
                className={clsx(
                  "text-3xl transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              />
              <span
                className={clsx(
                  "text-2xl font-bold transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              >
                الدروس
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="messages"
          className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
          })}
        >
          <FaMessage className="text-lg text-white/70 transition group-hover:text-green-400" />
          <span className="text-lg text-white/70 transition group-hover:text-green-400">
            الرسائل
          </span>
          {messageNotifications > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {messageNotifications}
            </span>
          )}
        </NavLink>
        <NavLink
          to="store"
          className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
          })}
        >
          {({ isActive }) => (
            <>
              <FaStore
                className={clsx(
                  "text-3xl transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              />
              <span
                className={clsx(
                  "text-2xl font-bold  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              >
                المتجر
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="orders"
          className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
          })}
        >
          {({ isActive }) => (
            <>
              <FaStore
                className={clsx(
                  "text-3xl  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              />
              <span
                className={clsx(
                  "text-2xl font-bold  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              >
                طلبات
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="settings"
          className="mt-auto group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
          })}
        >
          {({ isActive }) => (
            <>
              <IoSettingsSharp
                className={clsx(
                  "text-3xl  transition group-hover:text-green-500 ",
                  isActive ? "text-primary" : "text-text"
                )}
              />
              <span
                className={clsx(
                  "text-2xl font-bold  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text"
                )}
              >
                الإعدادات
              </span>
            </>
          )}
        </NavLink>
        <button
          onClick={() => {
            logout();
          }}
          className=" group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4 cursor-pointer"
        >
          <TbLogout className="text-3xl text-text transition group-hover:text-primary" />
          <span className="text-2xl font-bold text-text transition group-hover:text-primary">
            تسجيل الخروج
          </span>
        </button>
      </nav>
    </>
  );
};

export default Aside;

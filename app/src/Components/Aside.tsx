import React from "react";
import { NavLink, Link } from "react-router";
import { TbLogout } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { FaStore, FaBookOpen, FaHome, FaFileAlt } from "react-icons/fa";
import { useContext } from "react";
import type { AuthContextType } from "../contexts/contexts";
import { AuthContext } from "../contexts/contexts.ts";
import { clsx } from "clsx";

const Aside = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  if (!authContext) {
    return null;
  }
  const { user, logout } = authContext;

  return (
    <aside className="w-64  bg-black/30 p-4 md:flex flex-col shadow-lg hidden lg:flex">
      <div className="w-full flex flex-col items-center justify-center gap-1 border-b-2 border-white/10 pb-4 mb-4">
        <div className="size-28 bg-white/10 rounded-full shadow-2xl"></div>
        <Link to="/profile" className="flex gap-1">
          <span className="capitalize font-semibold">{user?.firstname}</span>
          <span className="capitalize font-semibold">{user?.lastname}</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-2">
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
                  isActive ? "text-green-500" : "text-white/70"
                )}
              />
              <span
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
                )}
              >
                لوحة التحكم
              </span>
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
                  isActive ? "text-green-500" : "text-white/70"
                )}
              />
              <span
                className={clsx(
                  "text-lg transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
                )}
              >
                الدروس
              </span>
            </>
          )}
        </NavLink>
        {/* <NavLink
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
            {messageCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {messageCount}
              </span>
            )}
          </NavLink> */}
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
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
                )}
              />
              <span
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
                )}
              >
                المتجر{" "}
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
              <FaFileAlt
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
                )}
              />
              <span
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
                )}
              >
                طلبات
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="settings"
          className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
          })}
        >
          {({ isActive }) => (
            <>
              <FaGear
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
                )}
              />
              <span
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-green-500" : "text-white/70"
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
          className="group w-full p-1 rounded-xl  transition hover:bg-white/10  flex items-center gap-4"
        >
          <TbLogout className="text-xl text-white/70 transition group-hover:text-green-400" />
          <span className="text-lg text-white/70 transition group-hover:text-green-400">
            تسجيل الخروج
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default Aside;

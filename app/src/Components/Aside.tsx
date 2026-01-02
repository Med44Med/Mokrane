;
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
    <aside className="z-50 fixed h-screen w-64  bg-surface p-4 md:flex flex-col shadow-lg hidden lg:flex border-l-2 border-text-secondary/10">
      <Link
        to="/profile"
        className="group hover:bg-primary/10 w-full py-3 rounded-2xl flex flex-col items-center justify-center gap-3 pb-4 mb-4"
      >
        <div className="size-28 bg-text-secondary/10 rounded-full shadow-2xl border-2 border-transparent group-hover:border-primary overflow-hidden">
          <img
            src={user?.avatar}
            alt="profile picture"
            className="size-full rounded-full scale-105 group-hover:scale-110 object-cover object-center"
          />
        </div>
        <div className="flex gap-1">
          <span className="text-text capitalize font-semibold">
            {user?.firstname}
          </span>
          <span className="text-text capitalize font-semibold">
            {user?.lastname}
          </span>
        </div>
      </Link>
      <nav className="flex-1 flex flex-col py-3 border-t-2 border-text-secondary/10">
        <NavLink
          to=""
          className="group w-full p-2 px-3 rounded  transition hover:bg-background/50  flex items-center gap-4"
        >
          {({ isActive }) => (
            <>
              <FaHome
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              />
              <span
                className={clsx(
                  "text-lg font-bold transition group-hover:text-primary",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              >
                لوحة التحكم
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="lessons"
          className="group w-full p-2 px-3 rounded  transition hover:bg-background/50  flex items-center gap-4"
        >
          {({ isActive }) => (
            <>
              <FaBookOpen
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              />
              <span
                className={clsx(
                  "text-lg font-bold transition group-hover:text-primary",
                  isActive ? "text-primary" : "text-text-secondary"
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
            <FaMessage className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text-secondary"
                )} />
            <span className={clsx(
                  "text-lg font-bold transition group-hover:text-primary",
                  isActive ? "text-primary" : "text-text-secondary"
                )}>
              الرسائل
            </span>
            {messageCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {messageCount}
              </span>
            )}
          </NavLink> */}
        <NavLink
          to={`store?sort=popular&branch=${user?.branch}&class=${user?.class}`}
          className="group w-full p-2 px-3 rounded  transition hover:bg-background/50  flex items-center gap-4"
        >
          {({ isActive }) => (
            <>
              <FaStore
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              />
              <span
                className={clsx(
                  "text-lg font-bold transition group-hover:text-primary",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              >
                المتجر{" "}
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="orders"
          className="group w-full p-2 px-3 rounded  transition hover:bg-background/50  flex items-center gap-4"
        >
          {({ isActive }) => (
            <>
              <FaFileAlt
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              />
              <span
                className={clsx(
                  "text-lg font-bold transition group-hover:text-primary",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              >
                طلبات
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="settings"
          className="group w-full p-2 px-3 mt-auto rounded  transition hover:bg-background/50  flex items-center gap-4"
        >
          {({ isActive }) => (
            <>
              <FaGear
                className={clsx(
                  "text-lg  transition group-hover:text-green-500",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              />
              <span
                className={clsx(
                  "text-lg font-bold transition group-hover:text-primary",
                  isActive ? "text-primary" : "text-text-secondary"
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
          className="group w-full p-2 px-3 rounded  transition hover:bg-background/50  flex items-center gap-4"
        >
          <TbLogout className="text-xl text-text-secondary transition group-hover:text-green-500" />
          <span className="text-lg font-bold text-text-secondary transition group-hover:text-primary">
            تسجيل الخروج
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default Aside;

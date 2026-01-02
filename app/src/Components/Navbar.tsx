;
import { NavLink } from "react-router";
import { FaHome, FaBookOpen, FaStore } from "react-icons/fa";
import { clsx } from "clsx";
import { FaMessage } from "react-icons/fa6";
import { useContext } from "react";
import type { AuthContextType } from "../contexts/contexts";
import { AuthContext } from "../contexts/contexts";

const Navbar = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  if (!authContext) {
    return null;
  }
  const { user } = authContext;

  return (
    <nav className="fixed z-50 -bottom-0.5 left-0 h-20 w-full p-3 bg-surface rounded-t-2xl flex md:hidden justify-around items-center">
      <NavLink
        to=""
        className="group p-1 flex flex-col items-center gap-1"
        style={({ isActive }) => ({
          color: isActive ? "rgba(255, 255, 255, 0.1)" : "",
        })}
      >
        {({ isActive }) => (
          <>
            <FaHome
              className={clsx(
                "text-3xl  transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            />
            <span
              className={clsx(
                "text-sm font-bold  transition group-hover:text-green-500",
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
        className="group p-1 flex flex-col items-center gap-1"
        style={({ isActive }) => ({
          color: isActive ? "rgba(255, 255, 255, 0.1)" : "",
        })}
      >
        {({ isActive }) => (
          <>
            <FaBookOpen
              className={clsx(
                "text-3xl  transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            />
            <span
              className={clsx(
                "text-sm font-bold  transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            >
              الدروس
            </span>
          </>
        )}
      </NavLink>
      <NavLink
        to="store"
        className="group p-1 flex flex-col items-center gap-1"
        style={({ isActive }) => ({
          color: isActive ? "rgba(255, 255, 255, 0.1)" : "",
        })}
      >
        {({ isActive }) => (
          <>
            <FaStore
              className={clsx(
                "text-3xl  transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            />
            <span
              className={clsx(
                "text-sm font-bold  transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            >
              المتجر
            </span>
          </>
        )}
      </NavLink>
      <NavLink
        to="messages"
        className="group p-1 flex flex-col items-center gap-1"
        style={({ isActive }) => ({
          color: isActive ? "rgba(255, 255, 255, 0.1)" : "",
        })}
      >
        {({ isActive }) => (
          <>
            <FaMessage
              className={clsx(
                "text-3xl  transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            />
            <span
              className={clsx(
                "text-sm  font-bold transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            >
              المحادثة
            </span>
          </>
        )}
      </NavLink>
      <NavLink
        to="settings"
        className="group p-1 flex flex-col items-center gap-1"
        style={({ isActive }) => ({
          color: isActive ? "rgba(255, 255, 255, 0.1)" : "",
        })}
      >
        {({ isActive }) => (
          <>
            <img
              src={user?.avatar}
              alt="profile avatar"
              className={clsx("size-8 rounded-full border-2 ",
                isActive ? "border-primary" : "border-transparent"
              )}
            />
            <span
              className={clsx(
                "text-sm  font-bold transition group-hover:text-green-500",
                isActive ? "text-green-500" : "text-white/70"
              )}
            >
              الإعدادات
            </span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;

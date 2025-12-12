import { clsx } from "clsx";
import { useState, useEffect } from "react";

const Settings = () => {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="w-full bg-green-400/10 rounded-2xl p-4 shadow flex flex-col justify-start items-center gap-3 mb-6">
        <h1 className="w-full text-start text-2xl font-semibold mb-6">
          Account
        </h1>
        <img
          src="https://picsum.photos/id/237/200/300"
          alt="profile"
          className="size-36 rounded-full object-cover object-center border-4 border-green-400"
        />
        <h4 className="hover:text-green-400/50 transition cursor-pointer">
          Edit Profile
        </h4>
        <div className="flex justify-center items-end gap-2">
          <h1 className="text-2xl font-semibold">USERNAME</h1>
          <h4 className="text-base font-semibold hover:text-green-400/50 transition cursor-pointer">
            (Edit)
          </h4>
        </div>
      </div>
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
      )}
    </>
  );
};

export default Settings;

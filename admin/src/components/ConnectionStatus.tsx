;
import { useState, useEffect } from "react";
import { clsx } from "clsx";

const ConnectionStatus = () => {
  const [connected, setConnected] = useState<boolean>(true);

  useEffect(() => {
    const handleOnline = () => setConnected(true);
    const handleOffline = () => setConnected(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 w-full bg-red-500 h-8 overflow-hidden flex flex-row-reverse justify-center items-center gap-1 translate-y-full [&.active]:translate-y-0",
        !connected && "active"
      )}
    >
      <button
        className="text-white font-bold text-base cursor-pointer hover:underline"
        onClick={() => window.location.reload()}
      >
        إعادة تحميل الصفحة؟
      </button>
      <h1 className="text-white text-base">لقد فقدنا الاتصال بالإنترنت</h1>
    </div>
  );
};

export default ConnectionStatus;

import { useEffect, useEffectEvent } from "react";
import { clsx } from "clsx";

const Alert = ({ show, setShow, title, text }) => {

  const handleAlert = useEffectEvent(() => setShow(false));

  useEffect(() => {
    if (!show) {
      return;
    }
    const timer = setTimeout(() => {
      handleAlert();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  return (
    <div
      className={clsx(
        "z-50 fixed left-5 bottom-5 w-96 h-24 bg-primary rounded translate-y-72 [&.active]:translate-y-0 p-5 flex flex-col justify-center items-center",
        show && "active"
      )}
    >
      <h1 className='text-white font-bold text-base' >{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Alert;

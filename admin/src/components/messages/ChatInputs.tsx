;
import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

const ChatInputs = ({ handleSendMessage }) => {
  const formRef = useRef(null);
  const handleForm = (e) => {
    e.preventDefault()
    handleSendMessage(e);
    formRef.current.reset();
  };
  return (
    <form ref={formRef} onSubmit={handleForm} className="flex gap-3">
      <div className="w-full relative flex">
        <input
          type="text"
          name="message"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleForm();
            }
          }}
          className="flex-1 rounded-lg outline-none bg-background px-3 py-2 border border-transparent focus:border-primary/50 text-text"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 "
        >
          <IoSend className="text-primary text-xl rotate-180 cursor-pointer hover:text-primary-hover" />
        </button>
      </div>
      <div className="flex justify-center items-center gap-3 px-3">
        <FaImage
          title="أضف صورة"
          className="text-2xl text-primary cursor-pointer hover:text-primary-hover"
        />
        <FaFilePdf
          title="أضف ملف PDF"
          className="text-2xl text-primary cursor-pointer hover:text-primary-hover"
        />
      </div>
    </form>
  );
};

export default ChatInputs;

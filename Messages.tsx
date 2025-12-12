import { useState, useRef, useOptimistic, startTransition } from "react";
import { clsx } from "clsx";

import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

type messageType = {
  sender: string;
  type: "message" | "image" | "file";
  content: string;
  time?: string;
  status: "pending" | "sent" | "failed";
  handleRetrySend?: (id: string) => void;
  id?: string;
};

const Message = ({ sender, type, content, time, status }: messageType) => {
  switch (type) {
    case "message":
      return (
        <div
          className={clsx(
            "w-2/3 py-3 flex items-start justify-start",
            sender === "Professor" && "self-end"
          )}
        >
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="profile picture"
            className="size-6 rounded-full object-fill"
          />
          <div className="pl-3 pr-1 flex-1 flex flex-col gap-1">
            <p className="bg-green-400/10 p-3 rounded-2xl text-base">
              {content}
            </p>
            {status === "pending" ? (
              <span className="text-xs text-white/50">Sending</span>
            ) : status === "sent" ? (
              <span className="text-xs text-white/50">Sent {time}</span>
            ) : (
              <span className="text-xs text-amber-300/80">Failed</span>
            )}
          </div>
          <div className="w-6 h-full flex justify-center items-start">
            {status === "failed" && (
              <FaArrowRotateLeft
                onClick={() => {}}
                className="mt-4 text-sm cursor-pointer text-amber-300/80"
              />
            )}
          </div>
        </div>
      );

    default:
      break;
  }
};

const Messages = () => {
  const [sentMessage, setSentMessage] = useState<string>("");
  // const [sentImage, setSentImage] = useState<File>(null);
  // const [sentFile, setSentFile] = useState<File>(null);
  const [messages, setMessages] = useState<messageType[]>([]);

  const attachImageRef = useRef<HTMLInputElement | null>(null);
  const attachFileRef = useRef<HTMLInputElement | null>(null);

  const [optimisticMessages, addOptimisticMessages] = useOptimistic<messageType[], (a:messageType)=>void>(
    messages,
    (currentMessages, newMessage) => {
      const exist = currentMessages.find((m) => m.id === newMessage.id);
      if (exist) {
        return setMessages(
          currentMessages.map((m) => (m.id === newMessage.id ? newMessage : m))
        );
      }
      return [...currentMessages, newMessage];
    }
  );

  const handleAddMessage = async () => {
    if (sentMessage === "") {
      return;
    }

    const id = Date.now().toString();
    const content = sentMessage;
    setSentMessage("");

    startTransition(() => {
      addOptimisticMessages({
        id,
        sender: "student",
        type: "message",
        content,
        status: "pending",
        date: Date.now(),
      });
    });

    const realMessage = await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          id,
          sender: "student",
          type: "message",
          content,
          status: "sent",
          date: Date.now(),
        });
      }, 300)
    );

    startTransition(() => {
      addOptimisticMessages(realMessage);
      setMessages((prev) => [...prev, realMessage]);
    });
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      handleAddMessage();
    }
  };

  const handleRetrySend = async (id: string) => {
    const msg = messages.filter((m) => m.id === id)[0];
    startTransition(addOptimisticMessages({ ...msg, status: "pending" }));
    const resendingMsg = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...msg,
          status: "sent",
        });
      }, 300);

      startTransition(() => {
        addOptimisticMessages(resendingMsg);
        setMessages((perv) =>
          perv.map((m) => {
            return m.id === id ? resendingMsg : m;
          })
        );
      });
    });
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">الرسائل</h1>
      <div className="flex-1 bg-black/20 w-full rounded-2xl p-3 overflow-y-auto flex flex-col items-start justify-end gap-4">
        {optimisticMessages.length === 0 ? (
          <p className="text-white self-center my-auto">
            لا توجد رسائل في الوقت الراهن.
          </p>
        ) : (
          optimisticMessages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender}
              content={msg.content}
              type={msg.type}
              status={msg.status}
              handleRetrySend={handleRetrySend}
            />
          ))
        )}
      </div>
      <div className=" w-full mt-6 flex items-center gap-2">
        <div
          onClick={() => {
            if (attachFileRef.current) {
              attachFileRef.current.click();
            }}}
          className="size-11 text-green-400 text-2xl bg-black/20 p-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-green-400/5 transition"
        >
          <ImAttachment className="text-green-400 text-xl" />
        </div>
        <div
          onClick={() => {
            if (attachImageRef.current) {
              attachImageRef.current.click();
            }
          }}
          className="size-11 text-green-400 text-2xl bg-black/20 p-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-green-400/5 transition"
        >
          <FaImage className="text-green-400 text-xl" />
        </div>
        <div className="relative flex-1 ">
          <input
            type="text"
            value={sentMessage}
            onChange={(e) => setSentMessage(e.target.value)}
            onKeyDown={(e) => handleInputEnter(e)}
            className="w-full px-4 py-2 rounded-2xl bg-black/20 border border-transparent focus:border-green-400 transition outline-none "
          />
          <IoSend
            onClick={() => handleAddMessage()}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-xl cursor-pointer"
          />
        </div>
        <input
          type="file"
          accept=".pdf"
          ref={attachFileRef}
          style={{ display: "none" }}
        />
        <input
          type="file"
          accept="image/*"
          ref={attachImageRef}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default Messages;

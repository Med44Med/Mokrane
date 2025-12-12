import {
  useRef,
  useEffect,
  useEffectEvent,
  startTransition,
  useOptimistic,
} from "react";

import { IoIosArrowForward } from "react-icons/io";

import supabase from "../../utilis/supabase";
import ChatMessages from "./ChatMessages";
import ChatInputs from "./ChatInputs";

const ChatLayout = ({
  messages,
  setMessages,
  sender,
  loading,
  error,
  searchParams,
  clearParams,
}) => {
  const bottomRef = useRef(null);

  const [optimisticMessage, addOptimisticMessage] = useOptimistic(
    messages,
    (messages, newMessage) => [
      ...messages,
      { type: "text", content: newMessage },
    ]
  );

  const addMessage = useEffectEvent((payload) => {
    setMessages((perv) => {
      const newArray = [...perv, payload?.new];

      return newArray;
    });
  });

  useEffect(() => {
    if (!searchParams) {
      return;
    }

    const chatChannel = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => addMessage(payload)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatChannel);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSendMessage = async (e) => {
    const formData = new FormData(e.target);

    const sendMessage = formData.get("message");

    if (!sendMessage) {
      return;
    }

    addOptimisticMessage(sendMessage);
    startTransition(async () => {
      const { error } = await supabase.from("messages").insert([
        {
          student: searchParams,
          type: "text",
          content: sendMessage,
          sender: false,
        },
      ]);
      if (error) {
        console.log(error);
      }
    });

  };

  return (
    <div className="flex-2 overflow-y-auto flex flex-col gap-3 bg-surface rounded-xl p-3">
      {loading ? (
        <h1 className="text-text m-auto">الرجاء الانتظار...</h1>
      ) : error ? (
        <h1 className="text-text m-auto">{error.message}</h1>
      ) : (
        <>
          <div className="flex justify-start items-center gap-1">
            <IoIosArrowForward
              className="text-text text-2xl cursor-pointer hover:text-primary"
              onClick={clearParams}
            />
            <h1 className="text-text text-xl font-bold">
              {sender?.lastname + " " + sender?.firstname}
            </h1>
          </div>
          <div className="flex-1 bg-background rounded-lg overflow-y-auto p-3">
            <ChatMessages messages={optimisticMessage} sender={sender} />
            <div ref={bottomRef} />
          </div>
          <ChatInputs handleSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatLayout;

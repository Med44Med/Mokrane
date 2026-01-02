;
import { clsx } from "clsx";
import { Day } from "../../utilis/Day";

const ChatMessage = ({ message, sender }) => {

  return (
    <div
      className={clsx(
        "w-2/3 flex gap-2",
        message?.sender && "self-end flex-row-reverse"
      )}
    >
      <img src={sender.avatar} alt="" className="size-8 rounded-full" />
      <div className="flex-1 flex flex-col">
        <p
          className={clsx(
            "text-white  p-2 min-h-8 rounded-lg",
            message?.sender ? "bg-blue-500" : "bg-primary"
          )}
        >
          {message.content}
        </p>
        <p
          className={clsx(
            "text-text-secondary self-end text-sm",
            message?.sender && "ml-auto"
          )}
        >
          {Day(message.created_at) + (message?.seen && " - تمت رؤية الرسالة")}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

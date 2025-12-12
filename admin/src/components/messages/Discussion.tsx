import { useEffect } from "react";
import supabase from "../../utilis/supabase";
import { clsx } from "clsx";

const Discussion = ({ data, setChat, chatId }) => (
  // useEffect(() => {
  //   (async () => {
  //     const {data,error} = await supabase.from('messages').select().eq('sender',data.sender)
  //   })()
  // }, [data])

  <div
    onClick={()=>setChat(data?.student)}
    className={clsx(
      "w-full h-20 rounded flex gap-3 items-center border-t border-text-secondary/50 py-3 px-1 cursor-pointer",
      chatId === data?.student && "bg-primary/20"
    )}
  >
    <img
      src={data?.profiles?.avatar}
      alt={data?.profiles?.firstname || "avatar"}
      className="size-14 rounded-full"
    />
    <div className="h-full flex-1 flex flex-col justify-start items-start gap-1">
      <h1 className="text-text text-xl font-bold">
        {data?.profiles?.firstname + " " + data?.profiles?.firstname}
      </h1>
      <p
        className={clsx(
          "text-text text-base font-semibold line-clamp-1",
          data?.seen
            ? "text-text-secondary font-normal"
            : "text-text font-semibold"
        )}
      >
        {data?.content}
      </p>
    </div>
    <h1 className="text-text-secondary mt-1">{data?.time}</h1>
    <div className="w-4">
      {!data?.seen && <div className="size-2 rounded-full bg-primary" />}
    </div>
  </div>
);

export default Discussion;

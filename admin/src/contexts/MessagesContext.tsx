import React from "react";
import { useState, useEffect } from "react";
import { MessageContext } from "./contexts.ts";
import supabase from "../utilis/supabase";

const MessagesProvider = ({ children }) => {
  const [messageNotifications, setMessageNotifications] = useState<
    number | null
  >(null);

  useEffect(() => {
    (async () => {
      const { error, count } = await supabase
        .from("my_chats_in_messages")
        .select("*", { count: "exact", head: true })
        .eq("seen", false);

      if (error) {
        setMessageNotifications(null);
        return;
      }
      setMessageNotifications(count);
    })();
  }, []);

  return (
    <MessageContext.Provider
      value={{ messageNotifications, setMessageNotifications }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessagesProvider;

import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router";

import Header from "../components/Header";
import ChatList from "../components/messages/ChatList";
import ChatLayout from "../components/messages/ChatLayout";

import { useState, useEffect } from "react";
import supabase from "../utilis/supabase";

const Messages = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [onlyUnseen, setOnlyUnseen] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [loadingDiscussion, setLoadingDiscussion] = useState(false);
  const [errorDiscussion, setErrorDiscussion] = useState("");

  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [errorMessages, setErrorMessages] = useState("الرجاء الانتظار لحظة");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("my_chats_in_messages")
        .select("*,profiles(firstname,lastname,avatar)")
        .order("created_at", { ascending: true });
      // infinite scroll to be added here

      if (error) {
        setError(error?.message);
        setLoading(false);
        return;
      }
      console.log(data);

      setDiscussions(data);
      setLoadingDiscussion(false);
    })();
  }, [onlyUnseen]);

  useEffect(() => {
    if (!searchParams.get("query")) {
      return;
    }
    (async () => {
      setErrorMessages("");
      setLoadingMessages(true);
      const { data: user, error: fetchUserErr } = await supabase
        .from("profiles")
        .select("firstname,lastname,avatar")
        .eq("id", searchParams.get("query"))
        .single();
      if (fetchUserErr) {
        setErrorMessages(fetchUserErr.message);
        setLoadingMessages(false);
        return;
      }

      const { data, error } = await supabase
        .from("messages")
        .select()
        .eq("student", searchParams.get("query"))
        .order("created_at", { ascending: true });
      if (error) {
        setErrorMessages(error.message);
        setLoadingMessages(false);
        return;
      }
      const { error: settingSeenError } = await supabase
        .from("messages")
        .update({ seen: true })
        .eq("student", searchParams.get("query"));

      if (settingSeenError) {
        console.log(settingSeenError);
      }

      setSender(user);
      setMessages(data);
      setLoadingMessages(false);
    })();
  }, [searchParams]);

  const setChat = (chatId) => {
    setSearchParams(`?query=${chatId}`);
  };
  const clearParams = () => {
    setSearchParams((params) => {
      params.delete("query");
      return params;
    });
  };
  const startNewChat = () => {
    console.log("start new chat");
  };

  return (
    <>
      <Helmet>
        <title>العقل المدبر | الرسائل</title>
      </Helmet>
      <div className="h-screen w-full flex flex-col">
        <Header title={"الرسائل"} />
        <div className="h-full flex-1 flex gap-5 overflow-y-hidden pb-5">
          <ChatList
            unSeen={onlyUnseen}
            setUnseen={setOnlyUnseen}
            discussions={discussions}
            loading={loadingDiscussion}
            chatId={searchParams.get("query")}
            setChat={setChat}
            startNewChat={startNewChat}
          />
          {searchParams ? (
            <ChatLayout
              clearParams={clearParams}
              searchParams={searchParams.get("query")}
              messages={messages}
              setMessages={setMessages}
              sender={sender}
              loading={loadingMessages}
              error={errorMessages}
            />
          ) : (
            <div className="flex-2 overflow-y-auto flex flex-col gap-3 bg-surface rounded-xl p-5">
              <IoIosChatboxes className="text-7xl text-text mt-auto mx-auto" />
              <h1 className="text-text text-xl font-bold mx-auto">
                مرحباً بكم في صفحة الرسائل
              </h1>
              <p className="text-text-secondary w-72 text-center mx-auto">
                لا تتردد في بدء محادثة مع طلابك عن طريق اختيار محادثة أو النقر
                على الزر أدناه لإضافة محادثة جديدة
              </p>
              <Button className="mt-5 mb-auto  mx-auto">
                <h1>ابدأ محادثة جديدة</h1>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;

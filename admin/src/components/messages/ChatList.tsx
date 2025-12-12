import Discussion from "./Discussion";
import ChatListSkeletons from "./ChatListSkeletons";
import Button from "../Button";
import { useNavigate } from "react-router";
const ChatList = ({
  unSeen,
  setUnseen,
  discussions,
  loading,
  chatId,
  setChat,
  error,
  startNewChat,
}) => {
  const navigate = useNavigate();
  const forceReload = () => {
    navigate(0);
  };
  return (
    <div className=" h-full flex-1 flex flex-col bg-surface rounded-xl p-5">
      <div className=" w-full bg-background rounded-xl p-1 flex">
        <div className="relative flex-1 flex p-1">
          <div
            className="absolute top-0 right-0 h-full w-1/2 bg-primary/30 rounded-xl"
            style={{
              transform: unSeen ? "translateX(-100%)" : "translateX(0%)",
            }}
          />
          <h1
            className="z-10 flex-1 text-center text-text font-semibold cursor-pointer"
            onClick={() => setUnseen(false)}
          >
            الكل
          </h1>
          <h1
            className="z-10 flex-1 text-center text-text font-semibold cursor-pointer"
            onClick={() => setUnseen(true)}
          >
            غير المقروء
          </h1>
        </div>
      </div>
      <div className=" flex-1 h-full w-full flex flex-col mt-5 overflow-y-auto">
        <div className=" w-full">
          {loading ? (
            <ChatListSkeletons />
          ) : error ? (
            <>
              <h1 className="text-text text-lg font-semibold mx-auto mt-10 text-center">
                لقد حدث خطأ ما، يرجى إعادة التحميل
              </h1>
              <Button onClick={forceReload} className="w-fit mt-3 mx-auto">
                <h1>إعادة التحميل</h1>
              </Button>
            </>
          ) : discussions.length === 0 ? (
            <>
              <p className="text-text-secondary w-72 text-center mx-auto mt-10">
                لا تتردد في نقر على الزر أدناه لإضافة محادثة جديدة
              </p>
              <Button onClick={startNewChat} className="mt-3 mb-auto  mx-auto">
                <h1>ابدأ محادثة جديدة</h1>
              </Button>
            </>
          ) : (
            discussions.map((d, index) => (
              <Discussion
                data={d}
                key={index}
                setChat={setChat}
                chatId={chatId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;

import { Helmet } from "react-helmet";
import Header from "@/Components/Header";
import { Surface, Skeleton } from "@/Components/UI";
import { SubHeading } from "@/Components/Typo";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useEffectEvent,
} from "react";
import { Link } from "react-router";

import { LuSquareArrowUpLeft } from "react-icons/lu";
import { SubText } from "@/Components/Typo";
import { AuthContext } from "@/contexts/contexts.ts";
import supabase from "@/utilis/supabase";
import DashboardLoading from "./DashboardLoading";
import DashboardData from "./DashboardData";
import DashboardError from "./DashboardError";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const id = user?.id;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("حدث خطأ ما! الرجاء المحاولة مرة أخرى.");
  const [lastLesson, setLastLesson] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);

  const fetchData = async (id: string | null) => {
    setError("");
    setLoading(true);
    setLastLesson(localStorage.getItem("last_lesson"));
    const { count: notificationsCount, error: notificationsError } =
      await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("seen", false)
        .eq("user", id);
    if (notificationsError) {
      setError(notificationsError.message);
      setLoading(false);
      return;
    }
    setNotifications(notificationsCount || 0);
    const { count: messagesCount, error: messagesError } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("seen", false)
      .eq("user", id);

    if (messagesError) {
      setError(messagesError.message);
      setLoading(false);
      return;
    }
    setMessages(messagesCount || 0);
    setLoading(false);
  };

  const sideEvent = useEffectEvent((id: string | null) => {
    fetchData(id);
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    sideEvent(id);
  }, [id]);

  const carouselData: { image: string; url?: string; title?: string }[] = [
    { image: "https://picsum.photos/id/9/1800/1200", url: "/store" },
    {
      image: "https://picsum.photos/id/11/1800/1200",
      url: "/store",
      title: "تابع الدرس السابق",
    },
    { image: "https://picsum.photos/id/12/1800/1200", url: "/store" },
  ];

  return (
    <>
      <Helmet>
        <title>المنصة | الصفحة الرئيسية </title>
      </Helmet>
      <Header title="لوحة التحكم" />
      <div className="min-h-[calc(100vh-90px)] grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-3 gap-3 pt-5 pb-10">
        {loading ? (
          <DashboardLoading />
        ) : error ? (
          <DashboardError error={error} retry={() => fetchData(id)} />
        ) : (
          <DashboardData
            lastLesson={lastLesson}
            notifications={notifications}
            messages={messages}
            carouselData={carouselData}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;

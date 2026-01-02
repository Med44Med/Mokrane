import { useState, useEffect, useEffectEvent } from "react";
import supabase from "@/utilis/supabase";

export const useFetch = (text) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (text: string) => {
    switch (text) {
      case "lessons":
        (async () => {
          setError("");
          setLoading(true);
          const { data: lessons, error: lessonsError } = await supabase
            .from("lessons")
            .select("class,branch,title,description,thumbnail")
            // .eq("isLive", true);
          if (lessonsError) {
            setError(lessonsError.message);
            console.log(lessonsError);

            setLoading(false);
            return;
          }
          setData(lessons);
          setLoading(false);
        })();
        break;

      default:
        break;
    }
  };
  const effectEvent = useEffectEvent((text) => fetchData(text));
  useEffect(() => {
    if (!text) return;
    effectEvent(text);
  }, [text]);

  return [data, loading, error];
};

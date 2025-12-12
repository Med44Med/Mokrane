import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { BrochureType } from "../types.ts";
import supabase from "../utilis/supabase";
import { Day } from "../utilis/Day";

function Brochure() {
  const { title } = useParams<{ title: string }>();

  const [brochure, setBrochure] = useState<BrochureType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("brochures")
        .select("*")
        .eq("title", title)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setBrochure(data);
      setLoading(false);
    })();
  }, [title]);

  return (
    <>
      <div className="flex justify-between items-start gap-2 mb-10">
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-3xl font-semibold ">{title}</h1>
          {brochure && (
            <>
              <h1>{` ${brochure?.class} - ${brochure?.branch}`}</h1>
              <h1>{Day(brochure.created_at)}</h1>
            </>
          )}
        </div>
        <div className='flex gap-3'>
          <button className="text-white text-nowrap  cursor-pointer transition duration-300 hover:text-green-600">
            أضف إلى سلة           </button>
          <button className="bg-green-500 text-white text-nowrap px-10 py-2 rounded cursor-pointer transition duration-300 hover:bg-green-600">
            شراء
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : !brochure ? (
        <p>No brochure found.</p>
      ) : (
        <>
          <img
            src={brochure.thumbnail || "/default-brochure.png"} // to check later
            alt={brochure.title}
            className="self-center w-2/3 h-auto object-cover object-center rounded-2xl shadow"
          />
          <p className="mt-10 text-base">{brochure.description}</p>
        </>
      )}
    </>
  );
}

export default Brochure;

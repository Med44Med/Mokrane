import converter from "../utilis/converter";
import { useState, useRef, useEffect, useEffectEvent } from "react";
import supabase from "../utilis/supabase";

const AddLessonThumbnail = ({ lesson, setLesson, setPhase }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const updateThumbnail = useEffectEvent((url) => {
    setLesson((perv) => ({ ...perv, thumbnail: url }));
    setPhase("contents");
  });

  useEffect(() => {
    if (!thumbnail) {
      return;
    }
    (async () => {
      const rezized = await converter(thumbnail, 600);
      const { data, error } = await supabase.storage
        .from("lessons_thumbnails")
        .upload(`${Date.now()}_${thumbnail.name}`, rezized);
      if (error) {
        alert("حدث خطأ أثناء رفع الصورة");
        console.log(error);
        setThumbnail(null);
        return;
      }
      const url = supabase.storage
        .from("lessons_thumbnails")
        .getPublicUrl(data.path);

      console.log(url.data.publicUrl);

      const { error: UpdateLessonURL } = await supabase
        .from("lessons")
        .update({ thumbnail: url.data.publicUrl })
        .eq("title", lesson.title);
      if (UpdateLessonURL) {
        return;
      }
      updateThumbnail(url.data.publicUrl);
    })();
  }, [thumbnail]);

  return (
    <div className="w-full bg-surface p-5 rounded-lg flex flex-col">
      <div className="flex flex-col gap-2">
        <label htmlFor="thumbnail" className="text-text font-semibold  mb-5">
          الصورة المصغرة
        </label>
        <input
          type="file"
          id="thumbnail"
          className="hidden"
          ref={thumbnailRef}
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          accept="image/*"
        />
        <div
          onClick={() => thumbnailRef.current?.click()}
          className="relative self-center w-2/3 h-48 mb-5 hover:bg-green-500/20 rounded-lg border-2 border-dashed border-green-500 flex justify-center items-center cursor-pointer"
        >
          {lesson.thumbnail && (
            <img
              src={lesson.thumbnail}
              alt="thumbnail"
              className="absolute inset-0 object-cover object-center "
            />
          )}
          <h1 className="text-lg text-green-500 font-semibold">
            انقر هنا لإضافة صورتك أو اسحبها هنا
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AddLessonThumbnail;

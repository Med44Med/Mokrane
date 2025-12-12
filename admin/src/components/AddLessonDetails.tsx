import { useState } from "react";
import supabase from "../utilis/supabase";
const AddLessonDetails = ({ lesson, setLesson ,setPhase}) => {
  const [loading, setLoading] = useState(false);

  const handleLessonDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("lessons")
      .insert([
        {
          title: lesson.title,
          description: lesson.description,
          class: lesson.class,
          branch: lesson.branch,
          price: lesson.price,
          sale: lesson.sale,
        },
      ])
      .select();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    // setLesson({ ...lesson, id: data[0].id, created_at: data[0].created_at });
    setLoading(false);
    setPhase('thumbnail')
  };

  return (
    <div className="w-full bg-surface p-5 rounded-lg flex flex-col">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 mb-10">
          <label htmlFor="title" className="text-text font-semibold">
            عنوان الدرس
          </label>
          <input
            type="text"
            required
            id="title"
            className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
            placeholder="أدخل عنوان الدرس"
            value={lesson.title}
            onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 mb-10">
          <label htmlFor="description" className="text-text font-semibold">
            وصف الدرس
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="أدخل وصف الدرس"
            className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition resize-none"
            value={lesson.description}
            onChange={(e) =>
              setLesson({ ...lesson, description: e.target.value })
            }
          />
        </div>
        <div className="flex gap-10  mb-10">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="class" className="text-text font-semibold">
              اختيار القسم
            </label>
            <select
              value={lesson.class}
              required
              onChange={(e) => setLesson({ ...lesson, class: e.target.value })}
              className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
            >
              <option value="">اختر قسم</option>
              <option value="الأولة الثانوي">الأولة الثانوي</option>
              <option value="الثانية الثانوي">الثانية الثانوي</option>
              <option value="الثالثة الثانوي">الثالثة الثانوي</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="branch" className="text-text font-semibold">
              اختيار الشعبة
            </label>
            <select
              required
              value={lesson.branch}
              onChange={(e) => setLesson({ ...lesson, branch: e.target.value })}
              className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
            >
              <option value="">اختر شعبة</option>
              <option value="العلوم التجريبية">العلوم التجريبية</option>
              <option value="تقني رياضي">تقني رياضي</option>
              <option value="رياضيات">رياضيات</option>
            </select>
          </div>
        </div>
        <div className="flex gap-10  mb-10">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="price" className="text-text font-semibold">
              سعر الدرس
            </label>
            <input
              type="number"
              required
              id="price"
              className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
              placeholder="0"
              step={500}
              min={0}
              value={lesson.price}
              onChange={(e) => setLesson({ ...lesson, price: e.target.value })}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="promo" className="text-text font-semibold">
              سعر الدرس بعد الخصم
            </label>
            <input
              type="number"
              id="promo"
              className="w-full px-3 py-2 bg-background text-text rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
              placeholder="0"
              step={500}
              min={0}
              value={lesson.sale}
              onChange={(e) => setLesson({ ...lesson, sale: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          onClick={(e) => handleLessonDetails(e)}
          className="mt-10 w-full md:w-1/2 self-center py-3 bg-green-500 rounded-lg flex justify-center items-center hover:bg-green-600 transition cursor-pointer"
        >
          <h1 className="text-white font-semibold">
            {loading ? "تحميل..." : "حفظ تفاصيل الدرس"}
          </h1>
        </button>
      </form>
    </div>
  );
};

export default AddLessonDetails;

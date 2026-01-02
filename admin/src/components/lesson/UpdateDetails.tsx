;
import Popup from "../Popup";
import { useState, useEffect, useEffectEvent } from "react";
import Button from "../Button";
import supabase from "../../utilis/supabase";

const UpdateDetails = ({ show, setShow, lesson }) => {
  const [newLessonDetails, setNewLessonDetails] = useState({
    title: lesson.title,
    description: lesson.description,
    class: lesson.class,
    branch: lesson.branch,
    price: lesson.price,
    sale: lesson.sale,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetState = useEffectEvent(() =>
    setNewLessonDetails({
      title: lesson.title,
      description: lesson.description,
      class: lesson.class,
      branch: lesson.branch,
      price: lesson.price,
      sale: lesson.sale,
    })
  );
  useEffect(() => {
    if (!show) {
      resetState();
    }
  }, [show]);

  const handleDetailsUpdate = async () => {
    setLoading(true)
    const { error } = await supabase
    .from("lessons")
    .update({
        title: newLessonDetails.title,
        description: newLessonDetails.description,
        class: newLessonDetails.class,
        branch: newLessonDetails.branch,
        price: newLessonDetails.price,
        sale: newLessonDetails.sale,
    })
    .eq("id", lesson.id);
    if (error) {
        setError(error.message);
        console.log(error);
        setLoading(false)
        return
    }
    setLoading(false)
    setShow(false)
  };
  return (
    <Popup show={show} setShow={setShow}>
      <div className="w-2/3 flex flex-col gap-2 mb-5">
        <label htmlFor="title" className="text-text font-semibold">
          عنوان الدرس
        </label>
        <input
          type="text"
          required
          id="title"
          className="w-full px-3 py-2 bg-surface text-text rounded-lg border-2 border-text-secondary/10 outline-none focus:border-green-500/80 transition"
          placeholder="أدخل عنوان الدرس"
          value={newLessonDetails.title}
          onChange={(e) =>
            setNewLessonDetails({ ...newLessonDetails, title: e.target.value })
          }
        />
      </div>
      <div className="w-2/3 flex flex-col gap-2 mb-10">
        <label htmlFor="description" className="text-text font-semibold">
          وصف الدرس
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="أدخل وصف الدرس"
          className="resize-none w-full px-3 py-2 bg-surface text-text rounded-lg border-2 border-text-secondary/10 outline-none focus:border-green-500/80 transition"
          value={newLessonDetails.description}
          onChange={(e) =>
            setNewLessonDetails({
              ...newLessonDetails,
              description: e.target.value,
            })
          }
        />
      </div>
      <div className="w-2/3 flex gap-10  mb-10">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="class" className="text-text font-semibold">
            اختيار القسم
          </label>
          <select
            value={newLessonDetails.class}
            required
            onChange={(e) =>
              setNewLessonDetails({
                ...newLessonDetails,
                class: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-surface text-text rounded-lg border-2 border-text-secondary/10 outline-none focus:border-green-500/80 transition"
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
            value={newLessonDetails.branch}
            onChange={(e) =>
              setNewLessonDetails({
                ...newLessonDetails,
                branch: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-surface text-text rounded-lg border-2 border-text-secondary/10 outline-none focus:border-green-500/80 transition"
          >
            <option value="">اختر شعبة</option>
            <option value="العلوم التجريبية">العلوم التجريبية</option>
            <option value="تقني رياضي">تقني رياضي</option>
            <option value="رياضيات">رياضيات</option>
          </select>
        </div>
      </div>
      <div className="w-2/3 flex gap-10  mb-10">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="price" className="text-text font-semibold">
            سعر الدرس
          </label>
          <input
            type="number"
            required
            id="price"
            className="w-full px-3 py-2 bg-surface text-text rounded-lg border-2 border-text-secondary/10 outline-none focus:border-green-500/80 transition"
            placeholder="0"
            step={500}
            min={0}
            value={newLessonDetails.price}
            onChange={(e) =>
              setNewLessonDetails({
                ...newLessonDetails,
                price: e.target.value,
              })
            }
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="promo" className="text-text font-semibold">
            سعر الدرس بعد الخصم
          </label>
          <input
            type="number"
            id="promo"
            className="w-full px-3 py-2 bg-surface text-text rounded-lg border-2 border-text-secondary/10 outline-none focus:border-green-500/80 transition"
            placeholder="0"
            step={500}
            min={0}
            value={newLessonDetails.sale}
            onChange={(e) =>
              setNewLessonDetails({ ...newLessonDetails, sale: e.target.value })
            }
          />
        </div>
      </div>
      <Button className="w-2/3" onClick={handleDetailsUpdate}>
        <h1 className="text-white font-semibold">
          {loading ? "تحميل..." : "تحديث تفاصيل الدرس"}
        </h1>
      </Button>
    </Popup>
  );
};

export default UpdateDetails;

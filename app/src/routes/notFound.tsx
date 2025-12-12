import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main
      dir="rtl"
      className="h-dvh w-screen bg-black/0 p-0 m-0 flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl font-semibold mb-1 text-green-500">Error 404</h1>
      <h1 className="text-2xl font-semibold mb-10">هذه الصفحة غير موجودة</h1>
      <div className="flex justify-center items-center gap-10">
        <button onClick={() => navigate("-1", { replace: true })} className='bg-green-500 text-lg font-semibold px-10 py-2 rounded cursor-pointer transition hover:bg-green-600' >العودة إلى الصفحة السابقة</button>
        <button onClick={() => navigate("/", { replace: true })} className='bg-green-500 text-lg font-semibold px-10 py-2 rounded cursor-pointer transition hover:bg-green-600' >العودة إلى الصفحة الرئيسية</button>
      </div>
    </main>
  );
};

export default NotFound;

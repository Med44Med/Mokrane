;
import { FaSpinner } from 'react-icons/fa';

const LessonsLoading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4" >
      <FaSpinner className="animate-spin text-green-400 text-4xl" />
      <p className="text-text">جارٍ تحميل الدروس، يرجى الانتظار...</p>
    </div>
  );
};

export default LessonsLoading;

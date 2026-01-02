import { SubHeading } from '@/Components/Typo';
import { MdErrorOutline } from "react-icons/md";
import Button from '@/Components/UI/Button';

const LessonError = ({ error,retry }: { error: string; retry: () => void }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <MdErrorOutline className='text-7xl text-primary'/>
      <SubHeading className='mb-5 text-center'>{error}</SubHeading>
      <Button onClick={retry}>إعادة المحاولة</Button>
    </div>
  );
};

export default LessonError;

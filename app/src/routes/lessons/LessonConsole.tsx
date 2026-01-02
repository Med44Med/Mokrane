import { useState } from 'react';
import Input from '@/Components/UI/Input';

const LessonConsole = () => {
    const [search, setSearch] = useState("");
  return (
    <div className='w-full flex justify-start items-center my-5'>
      <Input
        className="w-full md:w-1/3"
        placeholder="بحث..."
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default LessonConsole;

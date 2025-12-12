import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/contexts.ts";
import { FaShareSquare } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { MdWavingHand } from "react-icons/md";
import { BiSad } from "react-icons/bi";
import type { AuthContextType } from "../contexts/contexts.ts";
import { Helmet } from "react-helmet";
import Input from "../UI/Input";
const Dashboard = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  if (!authContext) {
    return null;
  }
  const { user } = authContext;

  const handleSubmit = () => {};

  return (
    <>
      <Helmet>
        <title>المنصة | الصفحة الرئيسية </title>
      </Helmet>
      <div className="pb-10 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          مرحبًا,{" "}
          <span className="text-green-500 capitalize">{user?.lastname} </span>
          <MdWavingHand className="inline-block text-2xl text-yellow-300" />
        </h1>
        <div className="flex items-center gap-4">
          <Link to="settings">
            <FaGear className="text-2xl text-white transition hover:text-green-400" />
          </Link>
          <Link to="profile">
            <IoPersonCircle className="text-3xl text-white transition hover:text-green-400" />
          </Link>
        </div>
      </div>
      {/* <div className="flex-1 w-full h-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 gap-4">
        <div className="relative rounded-xl shadow bg-black/10 flex flex-col justify-center items-center gap-3">
          <BiSad className="text-6xl text-green-400" />
          <span className="text-white text-xl">No classroom are available</span>
          <span>next classroom will be at xxxxx</span>
          <Link
            to="classrooms"
            className="absolute top-4 right-4 text-xl hover:text-green-400"
          >
            <FaShareSquare />
          </Link>
        </div>
      </div> */}
      <form className='flex flex-col w-1/2'>
        <Input className="mb-3 w-1/3" name="1er_prenom" autoFocus={true} />
        <Input className="mb-3 w-1/3" name="1er_nom" />
        <Input className="mb-3 w-1/3" name="2eme_prenom" />
        <Input className="mb-3 w-1/3" name="2eme_nom" />
        <button
          className="bg-green-500 text-white rounded w-32"
          onClick={handleSubmit}
          type="submit"
        >
          SHOW
        </button>
      </form>
    </>
  );
};

export default Dashboard;

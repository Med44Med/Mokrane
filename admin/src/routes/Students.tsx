import { useState, useEffect, useEffectEvent } from "react";
import { Helmet } from "react-helmet";
import Header from "@/Components/Header";
import { FaFilter } from "react-icons/fa";
import { Day } from "../utilis/Day";
import Popup from "../components/Popup";
import { Link } from "react-router";

import Loading from "../components/Spinner";
import supabase from "../utilis/supabase";
import { IoClose } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoChatbubbleSharp } from "react-icons/io5";
import { clsx } from "clsx";
import { classroom, branch } from "../assets/constatns";

const Student = ({ e, onClick }) => (
  <tr className="h-12 cursor-pointer hover:bg-primary/20 " onClick={onClick}>
    <td className="text-text text-base px-3">
      <img src={e.avatar} alt="avatar" className="size-8 rounded-full" />
    </td>
    <td className="text-text text-base px-3 border-l border-white/10 text-nowrap">
      {e.lastname + " " + e.firstname}
    </td>
    <td className="text-text text-base px-3 text-center border-l border-white/10 text-nowrap">
      {e.parent}
    </td>
    <td className="text-text text-base px-3 text-center border-l border-white/10 text-nowrap">
      {e.tel}
    </td>
    <td className="text-text text-base px-3 text-center border-l border-white/10 text-nowrap">
      {e.class}
    </td>
    <td className="text-text text-base px-3 text-center border-l border-white/10 text-nowrap">
      {e.branch}
    </td>
    <td className="text-text text-base px-3 text-center text-nowrap">
      {Day(e.created_at)}
    </td>
  </tr>
);

const Students = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);

  const [filter, setFilter] = useState({
    class: "all",
    branch: "all",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id,created_at,firstname,lastname,tel,class,branch,avatar,sexe,parent",
          { count: "exact" }
        );
      // .eq("role", "user");

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }
      setStudents(data);
      setLoading(false);
    })();
  }, []);

  const handleUnSelect = useEffectEvent(() => setSelected(null));
  useEffect(() => {
    if (showDetails === false) {
      handleUnSelect();
    }
  }, [showDetails]);

  const handleFilter = async (classroom, branch) => {
    setLoading(true);
    const fetchUser = supabase.from("profiles").select().eq("role", "user");

    if (classroom !== "all" && branch !== "all") {
      const { data, error } = await fetchUser
        .eq("class", classroom)
        .eq("branch", branch);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setStudents(data);
      setLoading(false);
      return;
    } else if (classroom === "all" && branch !== "all") {
      const { data, error } = await fetchUser.eq("branch", branch);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setStudents(data);
      setLoading(false);
    } else if (classroom !== "all" && branch === "all") {
      const { data, error } = await fetchUser.eq("class", classroom);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setStudents(data);
      setLoading(false);
    } else {
      const { data, error } = await fetchUser;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setStudents(data);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>العقل المدبر | قائمة الطلاب</title>
      </Helmet>

      <Header title={"قائمة الطلاب"} />
      <h1 className="text-text font-semibold">{studentCount} طالب</h1>
      <div className="w-full flex justify-between items-center gap-3 mb-10">
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="البحث عن الطالب..."
          className="flex-1 md:flex-none w-1/2 px-5 py-2 bg-surface text-text shadow rounded-lg border-2 border-transparent outline-none focus:border-green-500/80 transition"
        />
        <div className="flex justify-end items-end gap-3">
          <div className="flex gap-2">
            {filter.class !== "all" && (
              <div className="group bg-primary/20 hover:bg-primary rounded-2xl px-2 py-0.5 border border-primary  flex justify-center items-center gap-1">
                <h1 className="text-primary group-hover:text-white">قسم :</h1>
                <h1 className="text-primary group-hover:text-white">
                  {filter.class}
                </h1>
                <IoClose
                  className="text-primary cursor-pointer group-hover:text-white"
                  onClick={() => {
                    setFilter((perv) => ({ ...perv, class: "all" }));
                    handleFilter("all", filter.branch);
                  }}
                />
              </div>
            )}
            {filter.branch !== "all" && (
              <div className="group bg-primary/20 hover:bg-primary rounded-2xl px-2 py-0.5 border border-primary  flex justify-center items-center gap-1">
                <h1 className="text-primary group-hover:text-white">
                  التخصص :
                </h1>
                <h1 className="text-primary group-hover:text-white">
                  {filter.branch}
                </h1>
                <IoClose
                  className="text-primary cursor-pointer group-hover:text-white"
                  onClick={() => {
                    setFilter((perv) => ({ ...perv, branch: "all" }));
                    handleFilter(filter.class, "all");
                  }}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="px-3 md:px-5 py-2 bg-transparent md:bg-primary rounded-lg flex justify-center items-center gap-3 hover:bg-primary-hover transition cursor-pointer"
          >
            <h1 className="text-white font-semibold hidden md:block">تصفية</h1>
            <FaFilter className="text-primary text-xl md:text-white" />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full bg-surface overflow-x-auto rounded-xl">
        {loading ? (
          <Loading className="mt-32" />
        ) : (
          <table className="w-full bg-surface shadow  ">
            <thead>
              <tr>
                <td></td>
                <td className="text-nowrap w-1/3 text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center">
                  الاسم
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center">
                  اسم الوالد
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 border-l border-b border-white/10 text-center">
                  هاتف الوالدين
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center">
                  القسم
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center  ">
                  التخصص
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 px-3 border-b border-white/10 text-center">
                  تاريخ التسجيل
                </td>
              </tr>
            </thead>
            <tbody>
              {students.map((e, index) => (
                <Student
                  key={index}
                  e={e}
                  onClick={() => {
                    setSelected(index);
                    setShowDetails(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Popup show={showDetails ? true : false} setShow={setShowDetails}>
        <img
          src={students[selected]?.avatar}
          alt="profile"
          className="size-36 rounded-full mb-5"
        />
        <h1 className="text-text font-bold text-2xl">
          {students[selected]?.lastname + " " + students[selected]?.firstname}
        </h1>
        <div className="mt-auto flex justify-center items-center gap-3">
          <a
            href={`tel:${students[selected]?.tel}`}
            className="flex items-center gap-3 bg-primary hover:bg-primary-hover px-3 py-1 rounded"
          >
            <BsFillTelephoneFill className="text-text text-lg" />
            <h1 className="text-text">الاتصال</h1>
          </a>
          <Link
            to={`/messages?person=${students[selected]?.id}`}
            className="flex items-center gap-3 bg-primary hover:bg-primary-hover px-3 py-1 rounded"
          >
            <IoChatbubbleSharp className="text-text text-lg" />
            <h1 className="text-text text-lg">المحادثة</h1>
          </Link>
        </div>
      </Popup>
      <div
        className={clsx(
          "group z-50 absolute left-0 top-0 h-full w-full transition-opacity duration-300",
          showFilter
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        >
        <div
          className="absolute inset-0  transition ease-out backdrop-blur-sm bg-black/50"
          onClick={() => setShowFilter(false)}
        />
        <div
          className={clsx(
            "z-10 absolute bg-background top-0 left-0 w-3/4 md:w-1/3 h-full transition p-5 flex flex-col duration-300 delay-300",
            showFilter ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <form
            className="flex-1 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries());
              // handleFilter(data.class, data.branch);
              setFilter(data);
              setShowFilter(false);
            }}
          >
            <label className="text-text">سنة الدراسية :</label>
            <select
              name="class"
              defaultValue={filter.class}
              className="bg-surface rounded text-text outline-none border border-text/30 focus:border-primary"
            >
              <option value="all">الكل</option>
              {classroom.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
            <label className="text-text"> الشعبة :</label>
            <select
              name="branch"
              defaultValue={filter.branch}
              className="bg-surface rounded text-text outline-none border border-text/30 focus:border-primary"
            >
              <option value="all">الكل</option>
              {branch.map((b) => (
                <option value={b} key={b}>
                  {b}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 transition px-10 py-2 rounded mt-auto flex gap-3 items-center justify-center cursor-pointer"
            >
              <h1 className="text-white text-lg font-semibold">تصفية</h1>
              <FaFilter className="text-white text-lg" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Students;

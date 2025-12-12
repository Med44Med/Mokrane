import { useSearchParams } from "react-router";
import Button from "../components/Button";

const EditLesson = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("target"));

  return (
    <div className="bg-surface shadow w-full rounded-xl flex flex-col gap-3 p-5">
      <p className="text-text-secondary text-base text-justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
        nesciunt consequuntur eius, laudantium ratione quos, doloribus aliquid
        placeat, vitae molestiae vel quae asperiores! In, unde laboriosam! Fugit
        suscipit laudantium ea. Placeat perferendis nemo sequi fuga iure nihil
        ducimus qui doloremque ipsam?{" "}
        <span className="text-text font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          dicta!
        </span>
        Ullam iure quisquam et hic illum eum consectetur architecto explicabo
        ipsam libero dignissimos, nulla harum, ad distinctio aut iusto?
        Laboriosam ullam odit atque ipsum quos tenetur nesciunt magnam animi,
        repellat minima, enim dolor asperiores cumque harum maiores ipsa eius
        accusamus id dolorem natus porro! Rem corrupti, molestiae doloremque id
        cupiditate delectus vitae beatae esse, itaque dicta at modi assumenda!
      </p>
      <button className="bg-primary transition hover:bg-primary-hover text-background px-10 py-2 rounded font-black ">
        Go
      </button>
      <Button onClick={() => console.log("hello")}>Go</Button>
    </div>
  );
};

export default EditLesson;

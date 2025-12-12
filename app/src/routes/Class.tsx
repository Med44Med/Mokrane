import { useLoaderData } from "react-router";

const Class = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);

  return (
    <>
      <div>Class n°: {loaderData.id}</div>
        <div>Class Title: {loaderData.title}</div>
    </>
  );
};

export default Class;

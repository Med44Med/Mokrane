import Button from "../Button";
const UpdateContents = ({ type, value, index, setModifyIndex, setValue }) => {
  switch (type) {
    case "title":
      return (
        <div className="group  relative w-full p-1 py-3 border-2 border-transparent hover:border-green-500/80 rounded-lg transition overflow-hidden flex gap-3 justify-between items-end">
          <input
            type="text"
            autoFocus
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setModifyIndex(null);
              }
            }}
            onChange={(e) =>
              setValue((perv) =>
                perv.map((item, i) =>
                  i === index ? { ...item, value: e.target.value } : item
                )
              )
            }
            className="text-xl text-text font-bold flex-1 outline-none bg-background py-3 px-1 rounded"
          />
          <Button onClick={() => setModifyIndex(null)}>تعديل</Button>
        </div>
      );
    case "text":
      return (
        <div className="group  relative w-full p-1 py-3 border-2 border-transparent hover:border-green-500/80 rounded-lg transition overflow-hidden flex gap-3 justify-between items-end">
          <textarea
            autoFocus
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setModifyIndex(null);
              }
            }}
            onChange={(e) =>
              setValue((perv) =>
                perv.map((item, i) =>
                  i === index ? { ...item, value: e.target.value } : item
                )
              )
            }
            className="h-56 resize-none text-base text-text font-normal flex-1 outline-none bg-background py-3 px-1 rounded"
          />
          <Button onClick={() => setModifyIndex(null)}>تعديل</Button>
        </div>
      );
    default:
      return null;
  }
};

export default UpdateContents;

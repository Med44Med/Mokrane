import { Surface } from "@/Components/UI";
import { SubHeading, Text } from "@/Components/Typo";
import Input from "@/Components/UI/Input";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/contexts.ts";
import type { AuthContextType } from "../../contexts/contexts";

const UpdateCredentials = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  const { user } = authContext!
  const [update, setUpdate] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  return (
    <Surface className="p-5 mb-5 flex flex-col justify-start">
      <SubHeading className="mb-4">تحديث بيانات الملف الشخصي</SubHeading>
      {/* Update credentials form goes here */}
      <form className="flex flex-col justify-start items-center gap-2">
        <Text className="w-1/2">الاسم</Text>
        <Input
          type="text"
          className="w-1/2 mb-3"
          placeholder={user?.firstname}
          value={update.firstname}
          onChange={(e) =>
            setUpdate((perv) => ({ ...perv, firstname: e.target.value }))
          }
        />
        <Text className="w-1/2">اللقب</Text>
        <Input
          type="text"
          className="w-1/2 mb-3"
          placeholder={user?.lastname}
          value={update.lastname}
          onChange={(e) =>
            setUpdate((perv) => ({ ...perv, lastname: e.target.value }))
          }
        />
        <Text className="w-1/2">البريد الإلكتروني</Text>
        <Input
          type="email"
          className="w-1/2 mb-3"
          placeholder={user?.email}
          value={update.email}
          onChange={(e) =>
            setUpdate((perv) => ({ ...perv, email: e.target.value }))
          }
        />
      </form>
    </Surface>
  );
};

export default UpdateCredentials;

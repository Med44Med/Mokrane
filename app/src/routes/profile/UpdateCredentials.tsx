import { Surface } from "@/Components/UI";
import { SubHeading, Text } from "@/Components/Typo";
import Input from "@/Components/UI/Input";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/contexts.ts";
import type { AuthContextType } from "@/contexts/contexts";
import supabase from "@/utilis/supabase";

const UpdateCredentials = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  const { user } = authContext!;
  const { email } = user;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErr("يرجى ملء جميع الحقول");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErr("كلمات المرور الجديدة غير متطابقة");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: oldPassword,
    });
    if (signInError) {
      setErr("كلمة المرور القديمة غير صحيحة");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setErr("حدث خطأ أثناء تحديث كلمة المرور");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <Surface className="p-5 mb-5 flex flex-col justify-start">
      <SubHeading className="mb-4">تحديث كلمة المرور</SubHeading>
      {/* Update credentials form goes here */}
      <form className="flex flex-col justify-start items-center gap-2">
        <Text className="w-1/2">كلمة المرور القديمة</Text>
        <Input
          type="password"
          required
          className="w-1/2 mb-3"
          placeholder="كلمة المرور القديمة"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Text className="w-1/2">كلمة المرور الجديدة</Text>
        <Input
          type="password"
          required
          className="w-1/2 mb-3"
          placeholder="كلمة المرور الجديدة"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Text className="w-1/2">تأكيد كلمة المرور الجديدة</Text>
        <Input
          type="password"
          required
          className="w-1/2 mb-3"
          placeholder="تأكيد كلمة المرور الجديدة"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleUpdate}
          disabled={loading}
          className="mt-4 w-1/2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition cursor-pointer"
        >
          {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
        </button>
        {err && <Text className="mb-4 w-1/2 text-red-500/80!">{err}</Text>}
      </form>
    </Surface>
  );
};

export default UpdateCredentials;

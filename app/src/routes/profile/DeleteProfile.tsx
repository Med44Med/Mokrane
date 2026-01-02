import supabase from '@/utilis/supabase';
import { Surface } from "@/Components/UI";
import { SubHeading, Text } from "@/Components/Typo";

const DeleteProfile = () => {
  const handleDelete = async () => {
    const { error: deleteError } = await supabase.rpc("delete_user");
    if (deleteError) {
      console.log(deleteError);
      return;
    } else {
      await supabase.auth.signOut();
    }
  };
  const handleConfirm = () => {
    if (
      confirm(
        "هل أنت متأكد من رغبتك في حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء."
      )
    ) {
      handleDelete();
    } else {
      console.log("canceled");
    }
  };

  return (
    <Surface className="bg-orange-400/50! border-orange-400! p-5 mb-5 flex flex-col justify-start items-center">
      <SubHeading className="w-full">تحديث صورة الملف الشخصي</SubHeading>
      <Text className="mt-2 w-full text-center">
        بحذف حسابك، لن تتمكن من تسجيل الدخول إليه مرة أخرى، وسيتم مسح بياناتك
        نهائياً.
      </Text>
      <button
        onClick={() => handleConfirm()}
        className="mt-10 w-1/2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition cursor-pointer"
      >
        حذف الحساب
      </button>
    </Surface>
  );
};

export default DeleteProfile;

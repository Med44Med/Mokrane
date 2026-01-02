;
import { Surface } from "@/Components/UI";
import { SubHeading, Text } from "@/Components/Typo";
import { useContext, useRef, useState, useEffect, useEffectEvent } from "react";
import { AuthContext } from "@/contexts/contexts.ts";
import type { AuthContextType } from "../../../../admin/src/contexts/contexts";
import { SubSurface } from "../../Components/UI";
import supabase from "@/utilis/supabase";
import { ImSpinner8 } from "react-icons/im";
import converter from "../../utilis/converter";

const UpdateAvatar = () => {
  const { user, updateProfileAvatar } = useContext(
    AuthContext
  ) as AuthContextType;
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<Error | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const UpdateAvatar = async () => {
    setLoading(true);
    setErr(null);
    try {
      console.log("converting avatar...");
      const convertedAvatar = await converter(avatar, 500);
      console.log(avatar);
      
      console.log("updating avatar...");
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${user?.id}/${avatar?.name}`, convertedAvatar, {
          cacheControl: "max-age=0",
          upsert: true,
        });
      if (error) {
        throw error;
      }
      console.log("retriving url...");

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user?.id}/${avatar?.name}`);
      
      console.log(urlData);
      console.log("updating profile...");

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar: urlData.publicUrl })
        .eq("id", user?.id);
      if (updateError) {
        throw updateError;
      }
      console.log("Done.");

      updateProfileAvatar(urlData.publicUrl);
    } catch (error) {
      setErr(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = useEffectEvent(() => UpdateAvatar());

  useEffect(() => {
    if (!avatar) return;
    updateEvent();
  }, [avatar]);

  return (
    <Surface className="p-5 mb-5 flex flex-col justify-start">
      <SubHeading>تحديث صورة الملف الشخصي</SubHeading>
      <div className="my-3 flex flex-col justify-center items-center gap-3">
        <SubSurface
          onClick={() => inputRef.current?.click()}
          className="group overflow-hidden p-2 flex justify-center items-center rounded-full! cursor-pointer "
        >
          <div className="relative size-40 rounded-full overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-primary/50 rounded-full z-10 flex justify-center items-center">
                <ImSpinner8 className="animate-spin text-white text-4xl" />
              </div>
            )}
            <img
              src={user?.avatar || "https://picsum.photos/id/1/200/300"}
              alt=""
              className="size-40 rounded-full object-cover group-hover:scale-105 overflow-hidden "
            />
          </div>
        </SubSurface>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          ref={inputRef}
          className="hidden"
        />
        {err && <Text className="text-red-500! mt-2">{err.message}</Text>}
      </div>
    </Surface>
  );
};

export default UpdateAvatar;

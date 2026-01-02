import { useEffect, useState, lazy } from "react";
import Header from "@/Components/Header";
import UpdateAvatar from "./UpdateAvatar";
const UpdateCredentials = lazy(() => import("./UpdateCredentials"));
import DeleteProfile from "./DeleteProfile";
import UpdateInfo from "./UpdateInfo";
import supabase from "@/utilis/supabase";

const Profile = () => {
  const [provider, setProvider] = useState("");
  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      return session;
    })().then(
      ({
        data: {
          session: {
            user: {
              app_metadata: { provider },
            },
          },
        },
      }) => {
        setProvider(provider);
      }
    );
  }, []);

  return (
    <>
      <Header title="الملف الشخصي" />
      <UpdateAvatar />
      <UpdateInfo />
      {provider === "email" && <UpdateCredentials />}
      <DeleteProfile />
    </>
  );
};

export default Profile;

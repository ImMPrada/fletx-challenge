import { useEffect } from "react";
import { useMe } from "../../hooks/use-me";
import Loading from "../loading";

const Profile = () => {
  const { user, isLoading, fetchUser } = useMe();

  useEffect(() => {
    fetchUser();
   
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
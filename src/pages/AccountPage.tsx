import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../Components/AccountNavigation";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  // knowing the page i am in
  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  // logout
  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect(true);
  }

  if (redirect) return <Navigate to={"/"} />;

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary"></div>
      </div>
    );
  }
  if (ready && !user) return <Navigate to={"/login"} />;

  return (
    <div>
      <AccountNavigation />
      {subpage === "profile" && (
        <div className="mx-auto max-w-xl text-center">
          <p>Logged in as {user?.name} </p>
          <button onClick={logout} className="primary mt-2 max-w-sm">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;

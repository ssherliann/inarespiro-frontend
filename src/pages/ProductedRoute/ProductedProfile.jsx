import { Navigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useAuth } from "../../contexts/AuthContext";

function ProductedProfile() {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn === true && <Profile />}
      {loggedIn === false && <Navigate to={"/"} />}
    </>
  );
}

export default ProductedProfile;

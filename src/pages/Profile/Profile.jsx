import { useAuth } from "../../contexts/AuthContext";
import { Text, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css"

function Profile() {
  const { user, logout, loggedIn } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className={styles.profile}>
      {loggedIn === false && (
        <>
          <Alert status="warning">
            <AlertIcon />
            You are not logged in. please login and try again.
          </Alert>
          <Link to="/signin">
            <Button>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button>
              Register
            </Button>
          </Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Text className={styles.title}>Profile</Text>
            <Text className={styles.email}>Email: {user.email}</Text>
            <Link to="/">
              <Button className={styles.buttonLogOut} onClick={handleLogout}>
                Logout
              </Button>
            </Link>
        </>
      )}
    </div>
  );
}

export default Profile;

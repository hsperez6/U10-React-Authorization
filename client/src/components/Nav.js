import { useContext } from "react";
import { Link } from "react-router-dom";

import userContext from "../context/UserContext";

const Nav = () => {
  const { authUser } = useContext(userContext);

  return (
    <nav>
      {authUser === null ? (
        <>
          <Link className="signup" to="/signup">Sign up</Link>
          <Link className="signin" to="/signin">Sign in</Link>
        </>
      ) : (
        <>
          <span>Welcome {authUser.name}</span>
          <Link className="settings" to="/settings">Settings</Link>
          <Link className="signout" to="/signout">Sign out</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;

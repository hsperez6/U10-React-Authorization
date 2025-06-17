import { useContext } from "react";

import UserContext from "../context/UserContext";

const Authenticated = () => {

  const { authUser } = useContext(UserContext);

  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>{authUser.name} is Authenticated</h1>
        <p>Your username is {authUser.username}</p>
        <p>Head over to Settings to change up your preferences</p>
      </div>
    </div>
  );
}

export default Authenticated;
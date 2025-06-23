import { createContext, useState } from "react";
import Cookies from "js-cookie";

import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {

  const cookie = Cookies.get("authorizedUser");
  const [authUser, setAuthUser] = useState( cookie ? JSON.parse(cookie) : null);

  const signIn = async (credentials) => {
    // const encodedCredentials = btoa(
    //   `${credentials.username}:${credentials.password}`
    // );

    // const fetchOptions = {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Basic ${encodedCredentials}`,
    //   },
    // };

    const response = await api("/users", "GET", null, credentials);



    if (response.status === 200) {
      const user = await response.json();
      setAuthUser(user);
      Cookies.set("authorizedUser", JSON.stringify(user), { expires: 1 });
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authorizedUser");
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        actions: {
          signIn,
          signOut,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

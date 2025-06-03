import { createContext } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {

  const signIn = async () => {

  }

  const signOut = () => {

  }

  return (
    <UserContext.Provider value={{}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
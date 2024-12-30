import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { showSuccessToast, showErrorToast } from "../../lib/Toast";
import ActionProvider from "./ActionContext";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  // console.log(children)
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  async function handleLogin(values) {
    try {
      const { data } = await axios.post("/users/employee/signin", values);
      if (data.success) {
        // showSuccessToast(data.message);
        setIsAuth(true);
        setUser(data.data);
        console.log("Signed-in user:", data.data);
        return true;
      }
    } catch (error) {
      const msg = error.response.data.error;
      showErrorToast(msg);
      return false;
    }
  }

  async function authUser() {
    try {
      const { data } = await axios.get("/users/auth");
      console.log(data);
      if (data.success) {
        setIsAuth(true);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    authUser();
  }, []);


  // async function signOut() {
  //   try {
  //     const { data } = await axios.get("/users/manager/logout");
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const value = {
    handleLogin,
    user,
    isAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      <ActionProvider>{children}</ActionProvider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;

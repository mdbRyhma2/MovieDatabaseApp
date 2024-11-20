import { useState } from "react";
import { UserContext } from "./userContext";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default function UserProvider({ children }) {
  
  // Get the stored user data from sessionStorage
  const userFromSessionStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState(
    userFromSessionStorage
      ? JSON.parse(userFromSessionStorage)
      : { email: "", username: "", password: "" }
  );

  // Function for user signup
  const signUp = async () => {
    const json = JSON.stringify(user);
    const headers = { headers: { "Content-Type": "application/json" } };
    try {
      await axios.post(url + "/user/register", json, headers);
      setUser({ email: "", username: "", password: "" });
    } catch (error) {
      throw error;
    }
  };

  // Function for user login
  const logIn = async () => {
    // Login with email or username
    const identifier = user.email || user.username;
    const json = JSON.stringify({ identifier, password: user.password });
    const headers = { headers: { "Content-Type": "application/json" } };
    
    try {
      const response = await axios.post(url + "/user/login", json, headers);
      const token = response.data.token;
      setUser(response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setUser({ email: "", password: "" });
      throw error;
    }
  };
  

  return (
    <UserContext.Provider value={{ user, setUser, signUp, logIn }}>
      {children}
    </UserContext.Provider>
  );
}

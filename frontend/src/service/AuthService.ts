import axios from "axios";

import Cookies from "js-cookie";

//TODO spostare in env
const API_URL = "http://localhost:8080/api/auth/"; // TODO: move to env

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(API_URL + "login", {
      username,
      password,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(API_URL + "register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const getUser = async () => {
  if (!Cookies.get("_auth")) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(API_URL + "user", {
      headers: {
        Authorization: `Bearer ${Cookies.get("_auth")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {
  Cookies.remove("_auth");
  
  console.log("Logout successful");
};



export const getToken = () => {
  return Cookies.get("_auth");
}

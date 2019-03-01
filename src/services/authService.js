import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt()); //get ride of bi-directional dependencies

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function isAdmin() {
  const user = getCurrentUser();
  return true;
  return user.isAdmin ? true : false;
  //return user.isAdmin ? true : false;
  //return { isAdmin };
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  isAdmin
};

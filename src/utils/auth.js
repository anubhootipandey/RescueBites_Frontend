import {jwtDecode} from 'jwt-decode';

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};

export const isAdmin = () => {
  return getUserRole() === "admin";
};

export const logout = () => {
  localStorage.removeItem('token');
};

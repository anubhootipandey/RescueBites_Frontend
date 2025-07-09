// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  // If roles are restricted and current role is not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />; // or show a 403 page
  }

  return children;
};

export default ProtectedRoute;

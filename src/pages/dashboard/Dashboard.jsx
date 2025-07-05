import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "donor") {
        navigate("/donor");
      } else if (role === "recipient") {
        navigate("/recipient/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("JWT decode failed:", error);
      navigate("/login");
    }
  }, [navigate]);

  return <div className="text-center mt-8">Redirecting...</div>;
}

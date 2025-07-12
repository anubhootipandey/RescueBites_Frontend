import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Donor from "./pages/Donor";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequestList from "./pages/admin/RequestList";
import Dashboard from "./pages/dashboard/Dashboard";
import AddDonationForm from "./components/donor/AddDonationForm";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import EditDonation from "./components/donor/EditDonation";
import RecipientDashboard from "./components/recipient/RecipientDashboard";
import RequestFoodForm from "./components/recipient/RequestFoodForm";
import About from "./pages/About";
import Profile from "./pages/Profile";
import AIRecipeGenerator from "./pages/AIRecipeGenerator";
import Community from "./pages/community/Community";
import GuestDashboard from "./pages/GuestDashboard";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor/create" element={<AddDonationForm />} />
        <Route path="/donor/edit/:id" element={<EditDonation />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe-generator" element={<AIRecipeGenerator />} />
        <Route path="/community" element={<Community />} />
        <Route path="/faq" element={<FAQ />} />

        <Route
          path="/guest"
          element={
            <ProtectedRoute allowedRoles={["guest"]}>
              <GuestDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <Donor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipient/dashboard"
          element={
            <ProtectedRoute allowedRoles={["recipient"]}>
              <RecipientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipient/request"
          element={
            <ProtectedRoute allowedRoles={["recipient"]}>
              <RequestFoodForm />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RequestList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

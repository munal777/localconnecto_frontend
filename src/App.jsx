import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ListedItems from "./components/ListedItems";
import About from "./components/About";
import NotFound from "./components/NotFound";
import { userAuthentication } from "./components/auth";
import RedirectGoogleAuth from "./components/GoogleRedirectHandler";
import ProfileUpdateForm from "./components/UpdateProfile";
// import { AuthContext, AuthProvider } from "./components/auth";
// import ProtectedRoute from "./components/AuthAccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css"; 
import Footer from "./components/Footer";

function App() {
  const { isAuthorized } = userAuthentication()

  return (
    
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login/callback" element={<RedirectGoogleAuth />} />
          <Route path="/" element={<Home />} />
          <Route path="/listed_items" element={<ListedItems />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={isAuthorized ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isAuthorized ? <Navigate to="/" /> : <Signup />} />
          <Route path="/profile" element={isAuthorized ? <ProfileUpdateForm />: <Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;

import React from "react";
import Navbar from "./components/Navbar";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./style.css"; 
import Home from "./components/pages/Home";
import ListedItems from "./components/pages/ListedItems";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import { userAuthentication } from "./components/auth/auth";
import ProfileUpdateForm from "./components/UpdateProfile";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Dashboard from "./components/pages/Dashboard";
import RedirectGoogleAuth from "./components/auth/GoogleRedirectHandler";
import CreateListing from "./components/CreateListing";
import ListingDetail from "./components/ListingDetails";
import Profile from "./components/pages/Profile";

function App() {
  const { isAuthorized } = userAuthentication();

  return (
    
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login/callback" element={<RedirectGoogleAuth />} />
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<ListedItems />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={isAuthorized ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isAuthorized ? <Navigate to="/" /> : <Signup />} />
          <Route path="/profile/edit" element={isAuthorized ? <ProfileUpdateForm />: <Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listings/new" element={<CreateListing />} />
          <Route path="/listings/item/:id" element={<ListingDetail />} />
          <Route path="/profile" element={isAuthorized ? <Profile /> : <Login />}/>
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;

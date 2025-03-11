import React, { use } from "react";
import NavbarGuest from "./components/Navbar/NavbarGuest";
import NavbarUser from "./components/Navbar/NavbarUser";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import ListedItems from "./components/ListedItems";
import About from "./components/About";
import NotFound from "./components/NotFound";
import { userAuthentication } from "./components/auth";
import RedirectGoogleAuth from "./components/GoogleRedirectHandler";
import ProfileUpdateForm from "./components/UpdateProfile";


function App() {
  const {isAuthorized} = userAuthentication()
  const ProtectedLogin = () => {
    return isAuthorized ? <Navigate to='/' /> : <Login />
  }

  const ProtectedRegister = () => {
    return isAuthorized ? <Navigate to='/' /> : <Signup />
  }

  return (
    <>
      <Router>
        <NavbarUser />
        <Routes>
          <Route path="/login/callback" element={<RedirectGoogleAuth />} />
          <Route path="/" element={<Home />} />
          <Route path="/listed_items" element={<ListedItems />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileUpdateForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useState, useRef, useEffect, useContext } from "react";
import { LogOut, User, Upload, Heart, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { userAuthentication } from "./auth/auth";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isAuthorized, logout } = userAuthentication();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the dropdown when a link is clicked
  };

  const handleLogout = () => {
    setIsOpen(false); // Close the dropdown before logging out
    logout();
  };

  let imgSrc = "/src/assets/profile.jpg";

  return (
    <div className="relative flex justify-end" ref={dropdownRef}>
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center space-x-2 rounded-full focus:ring-3 focus:ring-indigo-600"
  >
    <img
      className="w-10 h-10 object-cover rounded-full"
      src={imgSrc}
      alt="user photo"
    />
  </button>
  {isOpen && (
    <div className="absolute right-0 mt-12 md:mt-14 w-64 bg-white border border-gray-200 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.2)] z-10">
      <div className="p-4 text-center border-b border-gray-200">
        <img
          className="w-16 h-16 rounded-full mx-auto object-cover transition-transform duration-300 hover:scale-105"
          src={imgSrc}
          alt="Profile"
        />
        <p className="text-lg font-semibold text-indigo-700">Munal Poudel</p>
        <p className="text-sm text-gray-500">np05cp4s240102@iic.edu.np</p>
      </div>
      <div className="p-2 space-y-2">
        <Link
          to="/profile"
          className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-sm"
          onClick={handleLinkClick} // Close dropdown on click
        >
          <User className="w-5 h-5 mr-2" /> Edit Profile
        </Link>
        <a
          href="#"
          className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-sm"
          onClick={handleLinkClick} // Close dropdown on click
        >
          <Heart className="w-5 h-5 mr-2" /> Saved Items
        </a>
        <Link
          to="/listings/new"
          className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-sm"
          onClick={handleLinkClick} // Close dropdown on click
        >
          <Upload className="w-5 h-5 mr-2" /> Create Listing
        </Link>
        <div className="border-t border-gray-200"></div>
        {isAuthorized && (
          <Link
            to="/login"
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 rounded-sm"
            onClick={handleLogout} // Close dropdown and logout
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </Link>
        )}
      </div>
    </div>
  )}
</div>
  );
}
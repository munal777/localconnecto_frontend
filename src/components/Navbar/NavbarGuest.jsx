import React from "react";
import { Search, Heart, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavbarGuest() {
  return (
    <>
      <nav className="flex px-4 py-2 justify-between items-center shadow-lg">
        <div className="w-10 md:w-12 lg:w-14 flex items-center space-x-3">
          <img src="src/assets/LC2.png" alt="" className="w-full h-auto" />
          <p className=" font-serif  md:text-xl font-semibold">localConnecto</p>
        </div>

        <div className="flex justify-center w-1/5 relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 text-gray-500" />
          <input
            type="search"
            className="border-2 border-gray-400 rounded-2xl py-1 pl-10 pr-4 w-full focus:outline-none focus:border-gray-500"
            placeholder="Search for anything"
          />
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/listed_items">Listed Items</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>

        <div className="flex space-x-3.5">
          <div className="flex items-center space-x-4.5">
            <Heart />
            <ShoppingBasket />
          </div>
          <NavLink to="/login">
            <Button className="bg-green-500" btnName={"Log in"} />
          </NavLink>
          <NavLink to="/signup">
            <Button className="bg-red-500" btnName={"Sign up"} />
          </NavLink>
        </div>
      </nav>
    </>
  );
}

function Button({ className, btnName }) {
  return (
    <button
      className={`px-2 py-1 font-bold lg:py-2 lg:px-3 rounded-[0.5rem] text-white ${className}`}
    >
      {btnName}
    </button>
  );
}

export default NavbarGuest;

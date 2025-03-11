// import React, { useState } from "react";
// import { Search, Heart, ShoppingBasket, LogOut, User, Activity, Gift } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import ProfileDropdown from "./ToggleMenu";

// function NavbarUser() {

//   return (
//     <>
//       <nav className="flex px-4 py-2 justify-between items-center shadow-lg">
//         <div className="w-10 md:w-12 lg:w-14 flex items-center space-x-3">
//           <img src="src/assets/LC2.png" alt="" className="w-full h-auto" />
//           <p className=" font-serif  md:text-xl font-semibold">localConnecto</p>
//         </div>

//         <div className="flex justify-center w-1/5 relative">
//           <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 text-gray-500" />
//           <input
//             type="search"
//             className="border-2 border-gray-400 rounded-2xl py-1 pl-10 pr-4 w-full focus:outline-none focus:border-gray-500"
//             placeholder="Search for anything"
//           />
//         </div>
//         <div>
//           <ul className="flex space-x-4">
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/listed_items">Listed Items</NavLink>
//             </li>
//             <li>
//               <NavLink to="/about">About</NavLink>
//             </li>
//           </ul>
//         </div>

//         <div className="flex space-x-3.5">
//           <div className="flex items-center space-x-4.5">
//             <Heart />
//             <ShoppingBasket />
//           </div>
//           <div>
//           {/* <button
//             type="button"
//             className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//             onClick={<ProfileDropdown/>}
//           >
//             <span className="sr-only">Open user menu</span>
//             <img
//               className="w-8 h-8 rounded-full"
//               src="/docs/images/people/profile-picture-3.jpg"
//               alt="user photo"
//             />
//           </button> */}
//           <ProfileDropdown />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default NavbarUser;
import React, { useState } from "react";
import { Search, Heart, ShoppingBasket, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ToggleMenu";

function NavbarUser() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-lg">
        <div className="flex items-center space-x-3">
          <img
            src="src/assets/LC2.png"
            alt="logo"
            className="w-10 md:w-12 lg:w-14"
          />
          <p className="font-serif text-lg md:text-xl font-semibold">
            localConnecto
          </p>
        </div>

        <div className="hidden md:flex justify-center w-1/3 relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 text-gray-500" />
          <input
            type="search"
            className="border border-gray-400 rounded-2xl py-1 pl-10 pr-4 w-full focus:outline-none focus:border-gray-500"
            placeholder="Search for anything"
          />
        </div>

        <div className="hidden md:flex items-center space-x-5">
          <NavLink to="/" className="hover:text-blue-500">
            Home
          </NavLink>
          <NavLink to="/listed_items" className="hover:text-blue-500">
            Listed Items
          </NavLink>
          <NavLink to="/about" className="hover:text-blue-500">
            About
          </NavLink>
        </div>

        <div className="flex space-x-2 md:space-x-8 items-center">
          <Heart className="hidden md:block cursor-pointer" />
          <ShoppingBasket className="hidden md:block cursor-pointer" />
          <ProfileDropdown />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden  p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-2">
          <NavLink
            to="/"
            className="block py-2 border-b"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/listed_items"
            className="block py-2 border-b"
            onClick={() => setMenuOpen(false)}
          >
            Listed Items
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
        </div>
      )}
    </>
  );
}

export default NavbarUser;

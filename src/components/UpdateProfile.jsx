import React from "react";
import { Camera } from "lucide-react";

const ProfileUpdateForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className="bg-gradient-to-rmin-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Update Profile</h2>
          <div className="text-center mt-4 md:mt-0">
            <div className="relative">
              <img
                src=""
                alt="Profile Picture"
                className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 transition-transform duration-300 hover:scale-105 ring-2 ring-gray-200"
              />
              <label
                htmlFor="upload_profile"
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
              >
                <Camera className="w-6 h-6 text-blue-700"/>
              </label>
              <input
                type="file"
                name="profile"
                id="upload_profile"
                hidden
                required
              />
            </div>
            <button className="mt-4 bg-indigo-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring-2 ring-gray-200 hover:ring-indigo-300">
              Change Profile Picture
            </button>
          </div>
        </div>

        {/* Profile Update Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter your location"
            />
          </div>

          {/* Unchangeable Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                value="john.doe@example.com"
                readOnly
              />
              <span className="absolute right-3 top-2 text-sm text-gray-500">
                Unchangeable
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
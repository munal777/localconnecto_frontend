import React from "react";
import { CheckCircle, Heart, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { userAuthentication } from "./auth";

function About() {
  const { isAuthorized } = userAuthentication();

  return (
    <div className="flex flex-col border-t-1 border-gray-300">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-indigo-700">
                  About LocalConnecto
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  We're on a mission to build stronger communities through local
                  connections and sustainable sharing.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[300px] sm:h-[400px]">
                <img
                  src="/src/assets/share.jpg"
                  alt="LocalConnecto community"
                  className="object-cover rounded-xl  w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-700">
                Our Story
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                How LocalConnecto came to be
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-8">
            <p className="text-gray-600 mb-4">
              LocalConnecto was founded in 2024 with a simple idea for the SYP:
              to create a platform that helps people connect with their
              neighbors while reducing waste and promoting sustainability.
            </p>
            <p className="text-gray-600 mb-4">
              Our founder, Munal Poudel, noticed how many perfectly good items
              were being thrown away in her neighborhood while others were in
              need of those same items. She envisioned a community-based
              platform where people could easily share, give away, or sell items
              locally.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small community project has grown into a
              thriving platform connecting thousands of users across multiple
              cities. We're proud to have facilitated countless exchanges that
              have kept items out of landfills and helped people find what they
              need without buying new.
            </p>
            <p className="text-gray-600">
              Today, LocalConnecto continues to grow with the mission of
              strengthening local communities, promoting sustainable
              consumption, and making it easy for neighbors to help each other.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 bg-indigo-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-700">
                How It Works
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple steps to connect with your community
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <Search className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700">Find Items</h3>
              <p className="text-gray-600">
                Browse listings in your area or search for specific items you
                need
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <MessageCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700">Connect</h3>
              <p className="text-gray-600">
                Message the owner to arrange pickup or delivery details
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <Heart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700">Exchange</h3>
              <p className="text-gray-600">
                Meet locally to complete the exchange and build community
                connections
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-700">
                Why Choose LocalConnecto
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Benefits that set us apart
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" />
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  Community Focused
                </h3>
                <p className="text-gray-600">
                  We prioritize local connections, helping you meet and build
                  relationships with people in your neighborhood.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" />
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  Environmentally Friendly
                </h3>
                <p className="text-gray-600">
                  By reusing and recycling items, we help reduce waste and
                  promote sustainable consumption habits.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" />
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  Easy to Use
                </h3>
                <p className="text-gray-600">
                  Our intuitive platform makes it simple to list items, search
                  for what you need, and connect with others.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-indigo-600" />
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  Safe and Secure
                </h3>
                <p className="text-gray-600">
                  User verification and community ratings help ensure safe and
                  trustworthy exchanges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-indigo-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Community Today
              </h2>
              <p className="max-w-[700px] text-indigo-100 md:text-xl lg:text-lg xl:text-xl">
                Start connecting with your neighbors and find items you need
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              {!isAuthorized && (
                <Link to="/login">
                  <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-md font-medium transition">
                    Sign Up Free
                  </button>
                </Link>
              )}
              <Link to="/listings">
                <button className="border border-white text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition">
                  Browse Listings
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

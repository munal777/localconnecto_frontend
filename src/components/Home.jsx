import {
  ArrowRight,
  Gift,
  MapPin,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { userAuthentication } from "./auth";

function Home() {
  const { isAuthorized } = userAuthentication();

  return (
    <div className="flex flex-col pt-7">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-indigo-700">
                  Connect with your local community
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Find free items or buy from people in your neighborhood.
                  LocalConnecto makes it easy to discover and share within your
                  community.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/listings">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                    Explore Listings <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
                {!isAuthorized && (
                  <Link to="/signup">
                    <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md">
                      Sign Up Free
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                <img
                  src="/src/assets/share.jpg"
                  alt="LocalConnecto marketplace"
                  className="object-cover rounded-xl  w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-indigo-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-700">
                How LocalConnecto Works
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connect with your community in three simple steps
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <Search className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700">Find Items</h3>
              <p className="text-gray-600">
                Search for free or purchasable items in your local area
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <MapPin className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700">
                Connect Locally
              </h3>
              <p className="text-gray-600">
                Filter by location to find items in your neighborhood
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <ShoppingBag className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700">Get or Buy</h3>
              <p className="text-gray-600">
                Arrange pickup for free items or purchase what you need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-700">
                Browse Categories
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover items by category in your local community
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/listings?category=${category.slug}`}
                className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 mb-3">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-indigo-700 font-medium">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-indigo-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Community Says
              </h2>
              <p className="max-w-[700px] text-indigo-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of happy users in your local area
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col justify-between p-6 bg-white rounded-xl shadow-sm text-gray-800"
              >
                <div>
                  <p className="mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isAuthorized && (
        <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-700">
                Ready to join your local community?
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and start discovering items in your neighborhood
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/login">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                  Get Started Free
                </button>
              </Link>
              <Link to="/listings">
                <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md">
                  Browse Listings
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}

const categories = [
  { name: "Free Items", slug: "free", icon: Gift },
  { name: "Furniture", slug: "furniture", icon: ShoppingBag },
  { name: "Electronics", slug: "electronics", icon: ShoppingBag },
  { name: "Clothing", slug: "clothing", icon: ShoppingBag },
  { name: "Books", slug: "books", icon: ShoppingBag },
  { name: "Toys", slug: "toys", icon: ShoppingBag },
  { name: "Sports", slug: "sports", icon: ShoppingBag },
  { name: "Other", slug: "other", icon: ShoppingBag },
];

const testimonials = [
  {
    text: "I found a free couch in my neighborhood that was exactly what I needed for my new apartment!",
    name: "Deekila Sherpa",
    location: "Pokhara, Kaski",
  },
  {
    text: "LocalConnecto helped me declutter my home and give items to people who actually needed them.",
    name: "Namrata Shrestha",
    location: "Thamel, Kathmandu",
  },
  {
    text: "I've met so many wonderful neighbors through exchanging items on this platform.",
    name: "Rohan Poudel",
    location: "Itahari, Sunsari",
  },
];

export default Home;

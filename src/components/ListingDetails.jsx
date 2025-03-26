import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Tag, User, Info } from "lucide-react";
import { toast } from "react-toastify";

// Sample listing data - in a real app, this would come from a database
const listingsData = [
  {
    id: "1",
    title: "Mountain Bike - Great Condition",
    price: 150,
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91",
    ],
    location: "Brooklyn, NY",
    category: "Sports",
    condition: "Good",
    description:
      "Mountain bike in great condition. Perfect for trails and city riding. Shimano gears, front suspension, and recently tuned up. Minor scratches but mechanically perfect. Pickup only.",
    postedDate: "2023-09-15T15:30:00Z",
    seller: {
      id: "101",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.8,
      joinedDate: "January 2023",
    },
  },
  {
    id: "2",
    title: "Wooden Coffee Table",
    price: 65,
    images: [
      "https://images.unsplash.com/photo-1533090368676-1f5a5c25d06b",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
      "https://images.unsplash.com/photo-1594224457860-02a83a933c1c",
    ],
    location: "Queens, NY",
    category: "Furniture",
    condition: "Like New",
    description:
      'Beautiful wooden coffee table with a modern design. Solid oak with a dark finish. Dimensions: 40" x 24" x 18". Only selling because we are moving to a smaller apartment. No damage or scratches.',
    postedDate: "2023-09-10T12:15:00Z",
    seller: {
      id: "102",
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      rating: 4.9,
      joinedDate: "March 2022",
    },
  },
  {
    id: "3",
    title: "MacBook Pro 2021",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    ],
    location: "Manhattan, NY",
    category: "Electronics",
    condition: "Good",
    description:
      "MacBook Pro 2021 model with M1 chip, 16GB RAM, and 512GB SSD. Battery health at 92%. Minor wear on the keyboard but works perfectly. Includes charger and original box. Local pickup preferred.",
    postedDate: "2023-09-05T09:45:00Z",
    seller: {
      id: "103",
      name: "David Wong",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      rating: 4.7,
      joinedDate: "November 2021",
    },
  },
  {
    id: "4",
    title: "Houseplant Collection",
    price: "Free",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78",
    ],
    location: "Bronx, NY",
    category: "Home",
    condition: "Good",
    description:
      "Free houseplant collection to a good home. Moving out of state and can't take my plants with me. Collection includes spider plants, pothos, snake plant, and a few succulents. All healthy and well cared for.",
    postedDate: "2023-09-01T17:20:00Z",
    seller: {
      id: "104",
      name: "Taylor Smith",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      rating: 4.6,
      joinedDate: "April 2023",
    },
  },
];

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // Find the listing by ID
  const listing = listingsData.find((item) => item.id === id);

  // Handle error if listing not found
  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Listing Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The listing you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/listings">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Back to Listings
              </button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleContactSeller = () => {
    toast.success("Contact request sent to seller!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-10 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex text-sm font-medium">
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link
                  to="/listings"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Listings
                </Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link
                  to={`/listings/${listing.category.toLowerCase()}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {listing.category}
                </Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-900 truncate max-w-[150px] sm:max-w-none">
                  {listing.title}
                </span>
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image Gallery */}
              <div className="lg:col-span-2 space-y-4">
                {/* Main image */}
                <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video relative">
                  <img
                    src={listing.images[activeImageIndex]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                        index === activeImageIndex
                          ? "border-indigo-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Listing Details */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900">Details</h2>

                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500">
                          Condition
                        </h3>
                        <p className="text-gray-900 font-medium">
                          {listing.condition}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500">
                          Category
                        </h3>
                        <p className="text-gray-900 font-medium">
                          {listing.category}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Location
                      </h3>
                      <div className="flex items-center mt-1">
                        <MapPin size={16} className="text-gray-400 mr-1" />
                        <p className="text-gray-900">{listing.location}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Description
                      </h3>
                      <p className="text-gray-700 mt-2 whitespace-pre-line">
                        {listing.description}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Posted
                      </h3>
                      <p className="text-gray-900">
                        {formatDate(listing.postedDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Listing Info & Seller */}
              <div className="space-y-6">
                {/* Listing Title & Price */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {listing.title}
                    </h1>

                    <div className="flex items-center mb-4">
                      <MapPin size={16} className="text-gray-400 mr-1" />
                      <span className="text-gray-600 text-sm">
                        {listing.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p
                        className={`text-2xl font-bold ${
                          listing.price === "Free"
                            ? "text-green-600"
                            : "text-indigo-600"
                        }`}
                      >
                        {listing.price === "Free"
                          ? "Free"
                          : `$${listing.price.toFixed(2)}`}
                      </p>
                      <button
                        onClick={() => toggleFavorite(listing.id)}
                        className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${
                          favorites.includes(listing.id)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                        aria-label={
                          favorites.includes(listing.id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Seller Information
                    </h2>

                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={listing.seller.avatar}
                          alt={listing.seller.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900">
                          {listing.seller.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Member since {listing.seller.joinedDate}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleContactSeller}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <Info size={20} className="text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">
                          Safety Tips
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• Meet in a safe, public place</li>
                          <li>• Don't share personal financial information</li>
                          <li>• Inspect the item before paying</li>
                          <li>• Report suspicious behavior</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetail;

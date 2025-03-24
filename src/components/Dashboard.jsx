import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Settings, Plus, LogOut, Grid, List, MoreVertical, BarChart3, Users } from 'lucide-react';

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: 'Vintage Coffee Table',
    description: 'Mid-century modern coffee table in excellent condition.',
    price: 75,
    location: 'Downtown',
    category: 'buy',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584dd43?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    createdAt: '2023-06-12',
  },
  {
    id: 2,
    title: 'Indoor Plants',
    description: 'Various indoor plants, free to a good home.',
    price: 0,
    location: 'Northside',
    category: 'free',
    image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    createdAt: '2023-06-10',
  },
  {
    id: 3,
    title: 'Desk Lamp',
    description: 'Modern LED desk lamp with multiple brightness settings.',
    price: 25,
    location: 'Eastside',
    category: 'buy',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    createdAt: '2023-06-08',
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [viewMode, setViewMode] = useState('grid');

  return (
      <div className="min-h-screen bg-gray-50 border-1 border-gray-200 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
          {/* Dashboard Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-up">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome, Alex</h1>
                  <p className="text-gray-600">Manage your listings and account settings</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/listings/new" className="bg-indigo-700 text-white py-2 px-3 font-semibold rounded-xl flex items-center hover:bg-indigo-800">
                  <Plus className="w-5 h-5 mr-2" />
                  <span>Create New Listing</span>
                </Link>
              </div>
            </div>
          </div>

           {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-10">
        <div className="bg-white shadow-lg border-1 border-gray-100 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-indigo-100 p-3">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Listings</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg border-1 border-gray-100 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-indigo-100 p-3">
              <Heart className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Saved Items</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg border-1 border-gray-100 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-indigo-100 p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Connections</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg border-1 border-gray-100 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-indigo-100 p-3">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Views</p>
              <p className="text-2xl font-semibold">142</p>
            </div>
          </div>
        </div>
      </div>

          {/* Dashboard Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-up">
                <nav className="flex flex-col">
                  <button 
                    className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors ${activeTab === 'listings' ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-600' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('listings')}
                  >
                    <Package className="w-5 h-5 mr-3" />
                    <span className="font-medium">My Listings</span>
                  </button>
                  <button 
                    className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors ${activeTab === 'saved' ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-600' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('saved')}
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    <span className="font-medium">Saved Items</span>
                  </button>
                  <button 
                    className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-600' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span className="font-medium">Settings</span>
                  </button>
                  <Link 
                    to="/login" 
                    className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors text-gray-700 mt-auto border-t border-gray-100"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-medium">Sign Out</span>
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Active Listings Content */}
              {activeTab === 'listings' && (
                <div className="animate-fade-up">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Your Active Listings</h2>
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <button 
                          className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                          onClick={() => setViewMode('grid')}
                          aria-label="Grid View"
                        >
                          <Grid className="w-5 h-5" />
                        </button>
                        <button 
                          className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                          onClick={() => setViewMode('list')}
                          aria-label="List View"
                        >
                          <List className="w-5 h-5" />
                        </button>        
                      </div>
                    </div>

                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockListings.map((listing) => (
                          <div key={listing.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                            <div className="relative h-48 bg-gray-200">
                              <img 
                                src={listing.image} 
                                alt={listing.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <span className={`text-xs font-medium py-1 px-2 rounded-full ${listing.category === 'free' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'}`}>
                                  {listing.category === 'free' ? 'Free' : `$${listing.price}`}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{listing.title}</h3>
                              <p className="text-sm text-gray-500 mb-2">Location: {listing.location}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Listed: {listing.createdAt}</span>
                                <div className="relative">
                                  <button className="text-gray-500 hover:text-indigo-600">
                                    <MoreVertical className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mockListings.map((listing) => (
                          <div key={listing.id} className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                            <div className="w-24 sm:w-32 md:w-48 h-24 sm:h-32 bg-gray-200 flex-shrink-0">
                              <img 
                                src={listing.image} 
                                alt={listing.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                                <span className={`text-xs font-medium py-1 px-2 rounded-full ${listing.category === 'free' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'}`}>
                                  {listing.category === 'free' ? 'Free' : `$${listing.price}`}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{listing.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">Location: {listing.location}</span>
                                <span className="text-xs text-gray-500">Listed: {listing.createdAt}</span>
                                <button className="text-gray-500 hover:text-indigo-600">
                                  <MoreVertical className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Saved Items Content */}
              {activeTab === 'saved' && (
                <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-up">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Saved Items</h2>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Heart className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved items yet</h3>
                    <p className="text-gray-600 mb-6">When you save listings you're interested in, they'll appear here.</p>
                    <Link to="/listings" className="btn-secondary">
                      Browse Listings
                    </Link>
                  </div>
                </div>
              )}

              {/* Settings Content */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-up">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="input-field"
                            defaultValue="Alex Johnson"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="input-field"
                            defaultValue="alex@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            className="input-field"
                            defaultValue="Downtown"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number (Optional)
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="input-field"
                            placeholder="Add a phone number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email_notifications"
                              name="email_notifications"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email_notifications" className="font-medium text-gray-700">Email Notifications</label>
                            <p className="text-gray-500">Receive email updates about your listings and messages.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="new_listings"
                              name="new_listings"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="new_listings" className="font-medium text-gray-700">New Listings Alerts</label>
                            <p className="text-gray-500">Get notified when new items are listed in your area.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button type="button" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
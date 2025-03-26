import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  MapPin, 
  Tag 
} from 'lucide-react';

const ListedItems = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [viewMode, setViewMode] = useState('grid');
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredListings, setFilteredListings] = useState(allListings);

  // Apply filters
  useEffect(() => {
    let filtered = [...allListings];
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    // Filter by location
    if (location !== 'all') {
      filtered = filtered.filter(item => item.location === location);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        item => item.title.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term)
      );
    }
    
    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        break;
    }
    
    setFilteredListings(filtered);
  }, [category, location, sortBy, searchTerm]);

  // Update category when URL param changes
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const locations = ['all', 'Downtown', 'Northside', 'Eastside', 'Westside', 'Southside'];

  return (
    <div className="min-h-screen bg-gray-50 border-1 border-gray-200 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Listings</h1>
            <p className="text-gray-600">Find items for free or to buy in your local area</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/listings/new" className="bg-indigo-700 text-white py-2 px-3 rounded-xl  flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              <span>Create Listing</span>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="md:w-auto flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5 mr-2 text-gray-500" />
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-2">
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

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category-filter"
                  className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All Items</option>
                  <option value="free">Free Items</option>
                  <option value="buy">Items to Buy</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location-filter"
                  className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sort-filter"
                  className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Listings */}
        <div className="animate-fade-up">
          {filteredListings.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} to={`/listings/item/${listing.id}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full flex flex-col">
                      <div className="relative h-56 bg-gray-200">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold">
                              {listing.category === 'free' ? 'Free' : `$${listing.price}`}
                            </span>
                            <span className="text-white text-sm flex items-center">
                              <MapPin className="w-4 h-4 mr-1" /> {listing.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                          {listing.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{listing.description}</p>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 text-indigo-600 mr-1" />
                          <span className="text-xs font-medium text-indigo-600">
                            {listing.category === 'free' ? 'Free Item' : 'For Sale'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} to={`/listings/${listing.id}`} className="group block">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 md:w-64 h-48 sm:h-auto bg-gray-200 flex-shrink-0">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 sm:hidden bg-gradient-to-t from-black/60 to-transparent p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold">
                              {listing.category === 'free' ? 'Free' : `$${listing.price}`}
                            </span>
                            <span className="text-white text-sm flex items-center">
                              <MapPin className="w-4 h-4 mr-1" /> {listing.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                              {listing.title}
                            </h3>
                            <span className="text-lg font-semibold text-indigo-600 hidden sm:block">
                              {listing.category === 'free' ? 'Free' : `$${listing.price}`}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{listing.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 text-indigo-600 mr-1" />
                            <span className="text-xs font-medium text-indigo-600">
                              {listing.category === 'free' ? 'Free Item' : 'For Sale'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 flex items-center hidden sm:flex">
                            <MapPin className="w-4 h-4 mr-1" /> {listing.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any listings matching your search criteria. Try adjusting your filters or search term.
                </p>
                <button 
                  onClick={() => {
                    setCategory('all');
                    setLocation('all');
                    setSortBy('newest');
                    setSearchTerm('');
                  }}
                  className="bg-gray-300 py-2 px-4 rounded-md"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListedItems;



const allListings = [
  {
    id: 1,
    title: 'Vintage Coffee Table',
    description: 'Mid-century modern coffee table in excellent condition.',
    price: 75,
    location: 'Downtown',
    category: 'buy',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584dd43?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    title: 'Indoor Plants',
    description: 'Various indoor plants, free to a good home.',
    price: 0,
    location: 'Northside',
    category: 'free',
    image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    title: 'Desk Lamp',
    description: 'Modern LED desk lamp with multiple brightness settings.',
    price: 25,
    location: 'Eastside',
    category: 'buy',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    title: 'Bookshelf',
    description: 'Sturdy wooshfgs sfsd fsjdfhsd jsfjshf sjf sf sfjs fsjfhsdf sf sfjs fsjfhsdf sf sfjs fsjfhsdf sf sfjs fsjfhsdf vsf sfjs fsjfhsdfsf sfjs fsjfhsdf sf sfjs fsjfhsdf sf sfjs fsjfhsdfsf sfjs fsjfhsdf sjfshfsdjf sjfbsjfhsjdf sjhshfv den bookshelf, perfect for any home office or living room.',
    price: 50,
    location: 'Westside',
    category: 'buy',
    image: 'https://images.unsplash.com/photo-1494173853739-c21f58b16055?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 5,
    title: 'Kids Toys',
    description: 'Assorted children\'s toys in good condition, free to a family in need.',
    price: 0,
    location: 'Southside',
    category: 'free',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 6,
    title: 'Bicycle',
    description: 'Adult mountain bike, some wear but in good working condition.',
    price: 120,
    location: 'Downtown',
    category: 'buy',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
  },
];
import React from 'react'
import { useState } from "react"
import { Search, MapPin, Filter, ChevronDown, Check, Heart } from "lucide-react"

function ListedItems() {
  return (
    <div className="container py-6">
      <ListingsBrowser/>
    </div>
  )
}

export default ListedItems

function ListingsBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedItems, setSelectedItems] = useState("All Items")
  const [selectedPrice, setSelectedPrice] = useState("Any Price")
  const [selectedSort, setSelectedSort] = useState("Newest First")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPriceDropdown, setShowPriceDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showItemsDropdown, setShowItemsDropdown] = useState(false)

  const categories = ["All Categories", "Electronics", "Furniture", "Clothing", "Books"]
  const itemOptions = ["All Items", "Free Items", "For Sale"]
  const priceRanges = ["Any Price", "Free", "Under $25", "$25 - $50", "$50 - $100", "Over $100"]
  const sortOptions = ["Newest First", "Oldest First", "Price: Low to High", "Price: High to Low"]
  const locations = ["All Locations", "Portland, OR", "Seattle, WA", "San Francisco, CA"]

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters)
  }

  const handleApplyFilters = () => {
    // Logic to apply filters would go here
    console.log({
      searchQuery,
      selectedCategory,
      selectedPrice,
      selectedSort,
      selectedLocation,
    })

    // Close all dropdowns
    setShowCategoryDropdown(false)
    setShowPriceDropdown(false)
    setShowSortDropdown(false)
    setShowLocationDropdown(false)
    setShowItemsDropdown(false)
  }

  const closeAllDropdowns = () => {
    setShowCategoryDropdown(false)
    setShowPriceDropdown(false)
    setShowSortDropdown(false)
    setShowLocationDropdown(false)
    setShowItemsDropdown(false)
  }

  const toggleDropdown = (dropdown) => {
    closeAllDropdowns()
    switch (dropdown) {
      case "category":
        setShowCategoryDropdown(!showCategoryDropdown)
        break
      case "price":
        setShowPriceDropdown(!showPriceDropdown)
        break
      case "sort":
        setShowSortDropdown(!showSortDropdown)
        break
      case "location":
        setShowLocationDropdown(!showLocationDropdown)
        break
      case "items":
        setShowItemsDropdown(!showItemsDropdown)
        break
    }
  }

  const selectOption = (type, option) => {
    switch (type) {
      case "category":
        setSelectedCategory(option)
        setShowCategoryDropdown(false)
        break
      case "price":
        setSelectedPrice(option)
        setShowPriceDropdown(false)
        break
      case "sort":
        setSelectedSort(option)
        setShowSortDropdown(false)
        break
      case "location":
        setSelectedLocation(option)
        setShowLocationDropdown(false)
        break
      case "items":
        setSelectedItems(option)
        setShowItemsDropdown(false)
        break
    }
  }

  return (
    <div className="w-full mx-auto  min-h-screen  px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-xl font-bold text-indigo-600">Browse Listings</h1>
          <p className="text-sm text-gray-600">Find items in your local community</p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm"
          onClick={toggleAdvancedFilters}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Listings..."
            className="pl-10 w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Items Dropdown */}
        <div className="relative min-w-[150px]">
          <button
            className="flex items-center justify-between w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
            onClick={() => toggleDropdown("items")}
          >
            <span>{selectedItems}</span>
            <ChevronDown size={16} />
          </button>

          {showItemsDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {itemOptions.map((item) => (
                <div
                  key={item}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => selectOption("items", item)}
                >
                  {item === selectedItems && <Check size={16} className="mr-2 text-indigo-600" />}
                  <span className={item === selectedItems ? "ml-0" : "ml-6"}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="relative min-w-[150px]">
          <button
            className="flex items-center justify-between w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
            onClick={() => toggleDropdown("location")}
          >
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-gray-400" />
              <span>{selectedLocation}</span>
            </div>
            <ChevronDown size={16} />
          </button>

          {showLocationDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {locations.map((location) => (
                <div
                  key={location}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => selectOption("location", location)}
                >
                  {location === selectedLocation && <Check size={16} className="mr-2 text-indigo-600" />}
                  <span className={location === selectedLocation ? "ml-0" : "ml-6"}>{location}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mb-6 p-6 border border-gray-200 rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-4">Advanced Filters</h2>

          <div className="flex flex-wrap items-end gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-2 text-sm font-medium">Category</label>
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                  onClick={() => toggleDropdown("category")}
                >
                  <span>{selectedCategory}</span>
                  <ChevronDown size={16} />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => selectOption("category", category)}
                      >
                        {category === selectedCategory && <Check size={16} className="mr-2 text-indigo-600" />}
                        <span className={category === selectedCategory ? "ml-0" : "ml-6"}>{category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-2 text-sm font-medium">Price Range</label>
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                  onClick={() => toggleDropdown("price")}
                >
                  <span>{selectedPrice}</span>
                  <ChevronDown size={16} />
                </button>

                {showPriceDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {priceRanges.map((price) => (
                      <div
                        key={price}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => selectOption("price", price)}
                      >
                        {price === selectedPrice && <Check size={16} className="mr-2 text-indigo-600" />}
                        <span className={price === selectedPrice ? "ml-0" : "ml-6"}>{price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sort By Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-2 text-sm font-medium">Sort By</label>
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                  onClick={() => toggleDropdown("sort")}
                >
                  <span>{selectedSort}</span>
                  <ChevronDown size={16} />
                </button>

                {showSortDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {sortOptions.map((sort) => (
                      <div
                        key={sort}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => selectOption("sort", sort)}
                      >
                        {sort === selectedSort && <Check size={16} className="mr-2 text-indigo-600" />}
                        <span className={sort === selectedSort ? "ml-0" : "ml-6"}>{sort}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      
    </div>
  )
}
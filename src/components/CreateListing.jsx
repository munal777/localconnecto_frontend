import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Image, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

// Sample categories and conditions for the demo
const categories = [
  'Electronics', 'Furniture', 'Clothing', 'Books', 'Toys', 'Sports', 'Home', 'Vehicles', 'Other'
];

const conditions = [
  'New', 'Like New', 'Good', 'Fair', 'Poor'
];

const CreateListing = () => {
  const navigate = useNavigate();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [images, setImages] = useState([]);
  
  // Form validation errors
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    location: '',
    images: ''
  });

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      category: '',
      condition: '',
      location: '',
      images: ''
    };

    if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
      isValid = false;
    }

    if (description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
      isValid = false;
    }

    if (!category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!condition) {
      newErrors.condition = "Condition is required";
      isValid = false;
    }

    if (location.length < 3) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    if (images.length === 0) {
      newErrors.images = "Please add at least one image";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In a real app, this would send data to a backend
    console.log('Form submitted', { 
      title, 
      description, 
      category, 
      condition, 
      price: isFree ? '0' : price, 
      location, 
      isFree, 
      images 
    });
    
    // Show success message
    toast.success("Listing created successfully!");
    
    // Redirect to listings page
    setTimeout(() => {
      navigate('/listings');
    }, 1500);
  };

  // Handle image upload
  const handleImageUpload = () => {
    // In a real app, this would handle actual file uploads
    // For demo, we're adding placeholder images
    const placeholderImages = [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    ];
    
    // Add a random image from the placeholders
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    setImages([...images, randomImage]);
    
    // Clear the images error if we've added an image
    if (errors.images && images.length === 0) {
      setErrors({ ...errors, images: '' });
    }
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Toggle between free and priced item
  const toggleIsFree = () => {
    setIsFree(!isFree);
    if (!isFree) {
      setPrice('0');
    } else {
      setPrice('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow pt-14 pb-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
          <Link to="/listings" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span>Back to Listings</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Listing</h1>
            
            <div className="bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Listing Details</h2>
                  <p className="text-gray-600 mt-1">
                    Provide information about the item you want to list.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a descriptive title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      A clear title will help people find your item.
                    </p>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your item in detail..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      Include condition, features, and reason for selling.
                    </p>
                  </div>
                  
                  {/* Categories and Condition - Side by side on larger screens */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>
                    
                    {/* Condition */}
                    <div>
                      <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                        Condition
                      </label>
                      <select
                        id="condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="" disabled>Select condition</option>
                        {conditions.map((cond) => (
                          <option key={cond} value={cond}>{cond}</option>
                        ))}
                      </select>
                      {errors.condition && (
                        <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div>
                    <div className="flex items-center mb-4">
                      <button
                        type="button"
                        onClick={toggleIsFree}
                        className={`relative inline-flex h-6 w-11 mr-3 items-center rounded-full transition-colors ${
                          isFree ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`${
                            isFree ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 rounded-full bg-white transition-transform`}
                        />
                      </button>
                      <span className="font-medium text-sm">This item is free</span>
                    </div>
                    
                    {!isFree && (
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Enter price"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Brooklyn, NY"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      Enter your neighborhood or area for local pickup.
                    </p>
                  </div>
                  
                  {/* Image Upload */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Images</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Add up to 5 images of your item. The first image will be the cover.
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                            <img 
                              src={image} 
                              alt={`Listing image ${index + 1}`} 
                              className="w-full h-full object-cover" 
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        
                        {images.length < 5 && (
                          <button
                            type="button"
                            onClick={handleImageUpload}
                            className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 hover:border-indigo-500 transition-colors"
                          >
                            <Image className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Add Image</span>
                          </button>
                        )}
                      </div>
                      
                      {errors.images && (
                        <p className="text-sm text-red-600">{errors.images}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit button */}
                  <div className="pt-4 flex justify-end space-x-4">
                    <button 
                      type="button" 
                      onClick={() => navigate('/listings')}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateListing;

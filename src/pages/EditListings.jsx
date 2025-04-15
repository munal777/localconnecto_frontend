import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Tag,
  Save,
  UploadCloud,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/api";

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form fields
  const [listingData, setListingData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesresponse = await api.get("/categories/");
        setCategories(categoriesresponse.data);

        if (id) {
          const response = await api.get(`/items/${id}/`);
          setListingData(response.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load Data");
        navigate('/listings');
      }
    };

    fetchData();
  }, [id]);

  // console.log(listingData?.listing_type)

  // Initialize form with listing data
  useEffect(() => {
    if (listingData) {
      setTitle(listingData.title);
      setDescription(listingData.description);

      if (listingData.listing_type === "free") {
        setIsFree(true);
        setPrice("free");
      } else {
        setPrice(listingData.price);
      }

      setCategory(listingData.category);
      setCondition(listingData.condition);
      setLocation(listingData.location);
      setImages(listingData.images);
    }
  }, [listingData, navigate]);


  const getImageURL = (imageObj) => {
    if (!imageObj || !imageObj.image) return '';

    let imageUrl = imageObj.image;
    if (imageUrl.startsWith('image/upload/')) {
      return `https://res.cloudinary.com/dzetcdznm/${imageUrl}`;
    }
    return imageUrl
  }

  // Handle new image file selection
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList);
      setNewImages((prev) => [...prev, ...filesArray]);

      // Create preview URLs for new images
      const newPreviewUrls = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  // Handle removing an existing image
  const removeExistingImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle removing a new image
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));

    // Also remove the preview URL and revoke the object URL to free memory
    const urlToRemove = previewUrls[index];
    URL.revokeObjectURL(urlToRemove);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Save images changes
  const handleSaveImages = () => {
    // In a real app, you would upload the new images to a server/storage
    toast.success("Images updated successfully!");

    // Clear new images after successful upload
    // In a real app, you would get the URLs from the server and add them to the images array
    setNewImages([]);

    // Add preview URLs to images array (simulating server response)
    setImages((prev) => [...prev, ...previewUrls]);
    setPreviewUrls([]);
  };

  // Save listing details
  const handleSaveDetails = (e) => {
    e.preventDefault();

    // Validate form
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    // Fixed: Correctly check if price is valid when not free
    if (!isFree && typeof price === "number" && price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!category) {
      toast.error("Category is required");
      return;
    }

    if (!condition) {
      toast.error("Condition is required");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return;
    }

    // In a real app, you would send the updated data to a server
    // For this demo, we'll just show a success message and navigate back to the listing
    toast.success("Listing updated successfully!");
    navigate(`/listings/${id}`);
  };

  // Handle price toggle between free and paid
  const handlePriceToggle = (e) => {
    const isChecked = e.target.checked;
    setIsFree(isChecked);
    if (isChecked) {
      setPrice("free");
    } else {
      setPrice(price);
    }
  };

  if (!listingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/listings/${id}`)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Edit Listing</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Images Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Listing Images
              </h2>
              {(newImages.length > 0 ||
                images.length !== listingData.images.length) && (
                <button
                  onClick={handleSaveImages}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Save Images
                </button>
              )}
            </div>

            {/* Current Images */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Current Images
              </p>
              {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-md overflow-hidden border border-gray-200"
                    >
                      <img
                        src={image.image}
                        alt={`Listing image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No images available
                </p>
              )}
            </div>

            {/* New Images */}
            {newImages.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  New Images
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-md overflow-hidden border border-gray-200"
                    >
                      <img
                        src={url}
                        alt={`New image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-2 py-1 bg-indigo-600 text-xs font-medium rounded">
                          New
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div>
              <label
                htmlFor="image-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <UploadCloud size={16} className="mr-2 text-gray-500" />
                Add Images
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="mt-2 text-xs text-gray-500">
                You can upload multiple images. Max 5MB per image.
              </p>
            </div>
          </div>

          {/* Listing Details Form */}
          <form onSubmit={handleSaveDetails} className="p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Listing Details
              </h2>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  maxLength={100}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {100 - title.length} characters remaining
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your item, include condition, features, etc."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <div className="flex items-center space-x-4">
                  {!isFree && (
                    <div className="relative rounded-md shadow-sm flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rs</span>
                      </div>
                      <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isFree}
                      />
                    </div>
                  )}
                  <div className="flex items-center">
                    <input
                      id="free-toggle"
                      type="checkbox"
                      checked={isFree}
                      onChange={handlePriceToggle}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="free-toggle"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Free item
                    </label>
                  </div>
                </div>
              </div>

              {/* Category & Condition - side by side on larger screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Condition
                  </label>
                  <select
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select condition</option>
                    {conditions.map((cond) => (
                      <option key={cond} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
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
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  // onClick={() => navigate(`/item/${id}`)}  -commmented just for commit
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  <Save size={16} className="mr-2" />
                  Save Details
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditListing;

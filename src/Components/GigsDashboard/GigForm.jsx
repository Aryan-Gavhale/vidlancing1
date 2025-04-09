import { useState } from "react";
import {
  AlertCircle,
  Check,
  DollarSign,
  Clock,
  RefreshCw,
  Tag,
  Eye,
} from "lucide-react";

const CreateGigForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    pricing: "",
    deliveryTime: "",
    revisionCount: "",
    tags: "",
    requirements: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    "Design",
    "Development",
    "Writing",
    "Marketing",
    "Video & Animation",
    "Music & Audio",
    "Business"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formattedData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        pricing: formData.pricing,
        deliveryTime: parseInt(formData.deliveryTime, 10),
        revisionCount: parseInt(formData.revisionCount, 10) || 0,
        requirements: formData.requirements || ""
      };
      
      const response = await fetch('http://localhost:3000/api/v1/gig/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formattedData),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to create gig");
      }
      
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        category: "",
        pricing: "",
        deliveryTime: "",
        revisionCount: "",
        tags: "",
        requirements: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Gig</h1>
        <p className="text-gray-600">Showcase your services and attract clients.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-2">
            <Check size={18} />
            <p>Gig created successfully!</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">Basic Information</h3>
              <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Required</div>
            </div>
            <p className="text-gray-500">Let clients know what you offer and why they should choose you.</p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">
              Gig Title
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Professional Website Design"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
            <p className="text-sm text-gray-500">
              A catchy title helps your gig stand out and appear in search results.
            </p>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you'll do, your style, and what clients can expect."
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            ></textarea>
            <p className="text-sm text-gray-500">
              Be specific about what you offer and what makes your service unique.
            </p>
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="block font-medium">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {/* <ChevronDown size={18} className="text-gray-500" /> */}
              </div>
            </div>
          </div>
          
          {/* Pricing & Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="pricing" className="block font-medium">
                Price ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign size={18} className="text-gray-500" />
                </div>
                <input
                  type="number"
                  id="pricing"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  placeholder="50.00"
                  className="w-full pl-9 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="deliveryTime" className="block font-medium">
                Delivery Time (days)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Clock size={18} className="text-gray-500" />
                </div>
                <input
                  type="number"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  min="1"
                  placeholder="3"
                  className="w-full pl-9 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Revisions */}
          <div className="space-y-2">
            <label htmlFor="revisionCount" className="block font-medium">
              Number of Revisions
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <RefreshCw size={18} className="text-gray-500" />
              </div>
              <input
                type="number"
                id="revisionCount"
                name="revisionCount"
                value={formData.revisionCount}
                onChange={handleChange}
                min="0"
                placeholder="1"
                className="w-full pl-9 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="block font-medium">
              Tags
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="design, logo, creative (comma separated)"
                className="w-full pl-9 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <p className="text-sm text-gray-500">
              Add tags to help clients find your gig. Separate with commas.
            </p>
          </div>
          
          {/* Requirements */}
          <div className="space-y-2">
            <label htmlFor="requirements" className="block font-medium">
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="What information do you need from clients?"
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            ></textarea>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-6 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2"
              >
                <Eye size={18} />
                Preview
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Create Gig
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGigForm;
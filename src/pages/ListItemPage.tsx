import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Camera, Plus, X, Sparkles, DollarSign, TrendingUp, Wand2 } from 'lucide-react';
import ListingBoost from '../components/ListingBoost';
import AIListingAssistant from '../components/AIListingAssistant';

interface ListItemForm {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
}

const ListItemPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [showBoostOptions, setShowBoostOptions] = useState(false);
  const [listingId, setListingId] = useState<string | null>(null);
  const [aiGenerated, setAiGenerated] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ListItemForm>();

  const categories = [
    'Furniture', 'Electronics', 'Textbooks', 'Decor', 'Appliances', 
    'Clothing', 'Sports', 'Kitchen', 'Lighting', 'Storage'
  ];

  const conditions = ['Like New', 'Good', 'Fair', 'Poor'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIDataGenerated = (aiData: any) => {
    setValue('title', aiData.title);
    setValue('description', aiData.description);
    setValue('category', aiData.category);
    setValue('condition', aiData.condition);
    setValue('price', aiData.suggestedPrice);
    setAiGenerated(true);
  };

  const onSubmit = (data: ListItemForm) => {
    console.log('Listing data:', { ...data, images, aiGenerated });
    
    // Simulate listing creation
    const newListingId = `listing-${Date.now()}`;
    setListingId(newListingId);
    setShowBoostOptions(true);
  };

  const handleBoostPurchase = (boostId: string, listingId: string) => {
    console.log('Boost purchased:', boostId, 'for listing:', listingId);
    alert('Boost purchased successfully! Your listing is now featured.');
    setShowBoostOptions(false);
  };

  if (showBoostOptions && listingId) {
    return (
      <div className="min-h-screen bg-gradient-dark px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Item Listed Successfully!
            </h1>
            <p className="text-sage-300">
              Your item is now live. Want to boost it for more visibility?
            </p>
          </div>
          
          <ListingBoost 
            listingId={listingId}
            onBoostPurchase={handleBoostPurchase}
          />
          
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowBoostOptions(false)}
              className="px-6 py-3 bg-sage-700 text-white rounded-xl hover:bg-sage-600 transition-colors"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark px-6 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            List Your Item
          </h1>
          <p className="text-sage-300">
            Upload photos and let AI automatically fill out your listing details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
            <h3 className="text-lg font-semibold text-white mb-4">Photos</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-sage-600 rounded-xl cursor-pointer hover:border-sage-500 transition-colors">
                  <Camera size={20} className="text-sage-400 mb-1" />
                  <span className="text-xs text-sage-400">Add Photo</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <p className="text-sm text-sage-400">
              Add up to 5 photos. AI will analyze them to auto-fill your listing details.
            </p>
          </div>

          {/* AI Listing Assistant */}
          <AIListingAssistant
            images={images}
            onDataGenerated={handleAIDataGenerated}
            isProcessing={isAIProcessing}
            setIsProcessing={setIsAIProcessing}
          />

          {/* Manual Item Details */}
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Item Details</h3>
              {aiGenerated && (
                <div className="flex items-center text-green-400 text-sm">
                  <Wand2 size={14} className="mr-1" />
                  AI Generated
                </div>
              )}
            </div>
            
            <div>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                placeholder="Item title (e.g., IKEA Desk Lamp - Perfect for Studying)"
                className="w-full px-4 py-3 bg-charcoal-700 border border-sage-600 rounded-xl text-white placeholder-sage-400 focus:border-sage-500 focus:outline-none transition-colors"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register('description', { required: 'Description is required' })}
                placeholder="Describe the item, its condition, and why you're selling it..."
                rows={6}
                className="w-full px-4 py-3 bg-charcoal-700 border border-sage-600 rounded-xl text-white placeholder-sage-400 focus:border-sage-500 focus:outline-none transition-colors resize-none"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-3 bg-charcoal-700 border border-sage-600 rounded-xl text-white focus:border-sage-500 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-charcoal-700">
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('condition', { required: 'Condition is required' })}
                  className="w-full px-4 py-3 bg-charcoal-700 border border-sage-600 rounded-xl text-white focus:border-sage-500 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Item condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition} className="bg-charcoal-700">
                      {condition}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="text-red-400 text-sm mt-1">{errors.condition.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-400" size={20} />
                <input
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 1, message: 'Price must be at least $1' }
                  })}
                  type="number"
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-3 bg-charcoal-700 border border-sage-600 rounded-xl text-white placeholder-sage-400 focus:border-sage-500 focus:outline-none transition-colors"
                />
              </div>
              {errors.price && (
                <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Boost Preview */}
          <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-accent-400 mr-2" size={16} />
              <span className="text-accent-400 font-medium">Want more visibility?</span>
            </div>
            <p className="text-sage-300 text-sm">
              After listing, you can boost your item to get 3-10x more views and sell faster!
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAIProcessing}
            className="w-full bg-gradient-sage text-white font-semibold py-4 rounded-2xl hover:shadow-premium transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="mr-2" size={20} />
            {isAIProcessing ? 'AI Processing...' : 'List Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListItemPage;
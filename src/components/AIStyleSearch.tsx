import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Search, Filter, X } from 'lucide-react';
import { roomStyles } from '../data/mockData';

interface AIStyleSearchProps {
  onStyleSelect: (style: string) => void;
  onPhotoUpload: (file: File) => void;
  selectedStyle?: string;
}

const AIStyleSearch: React.FC<AIStyleSearchProps> = ({ 
  onStyleSelect, 
  onPhotoUpload, 
  selectedStyle 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedPhoto(imageUrl);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        onStyleSelect('minimal'); // Auto-detect style
      }, 2000);
      
      onPhotoUpload(file);
    }
  };

  return (
    <div className="mb-6">
      {/* AI Search Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-primary text-white p-4 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center">
          <Sparkles className="mr-3" size={20} />
          <div className="text-left">
            <p className="font-semibold">AI Style Search</p>
            <p className="text-sm opacity-90">Find items that match your room style</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Filter size={20} />
        </motion.div>
      </button>

      {/* Expanded AI Search Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-dark-800/40 backdrop-blur-lg rounded-2xl p-6 border border-dark-700"
          >
            {/* Photo Upload Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Upload Your Room Photo
              </h3>
              
              {!uploadedPhoto ? (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-dark-600 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                    <Camera size={32} className="text-dark-400 mx-auto mb-3" />
                    <p className="text-white font-medium mb-1">Take or upload a photo</p>
                    <p className="text-sm text-dark-400">AI will analyze your style preferences</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedPhoto}
                    alt="Your room"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setUploadedPhoto(null);
                      setIsAnalyzing(false);
                    }}
                    className="absolute top-3 right-3 p-2 bg-dark-900/80 text-white rounded-full hover:bg-dark-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-dark-900/80 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto mb-3"></div>
                        <p className="text-primary-400 font-medium">Analyzing your style...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Style Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Or Choose Your Style
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {roomStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onStyleSelect(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedStyle === style.id
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-dark-600 hover:border-dark-500'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{style.emoji}</span>
                      <h4 className="font-semibold text-white">{style.name}</h4>
                    </div>
                    <p className="text-sm text-dark-400">{style.description}</p>
                    
                    {/* Color Palette */}
                    <div className="flex mt-3 space-x-1">
                      {style.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-dark-600"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            {selectedStyle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl"
              >
                <div className="flex items-center mb-2">
                  <Sparkles className="text-primary-400 mr-2" size={16} />
                  <span className="text-primary-400 font-medium">AI Recommendations Active</span>
                </div>
                <p className="text-sm text-dark-300">
                  Showing auctions that match your {roomStyles.find(s => s.id === selectedStyle)?.name.toLowerCase()} style. 
                  You'll get notifications when new matching items are listed!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIStyleSearch;
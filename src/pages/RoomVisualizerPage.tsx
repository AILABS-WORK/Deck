import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Download, RefreshCw, Palette, Wand2, Layers, Eye } from 'lucide-react';
import { roomStyles } from '../data/mockData';
import AIStylePrompt from '../components/AIStylePrompt';
import ARRoomVisualizer from '../components/ARRoomVisualizer';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';

const RoomVisualizerPage: React.FC = () => {
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedStyles, setGeneratedStyles] = useState<Array<{style: string, image: string, prompt?: string}>>([]);
  const [selectedGenerated, setSelectedGenerated] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'style' | 'ar' | 'recommendations'>('style');
  const [placedARItems, setPlacedARItems] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRoomImage(imageUrl);
      setGeneratedStyles([]);
      setSelectedGenerated(null);
    }
  };

  const handleStyleGenerate = (prompt: string, mood: string, elements: string[]) => {
    setCustomPrompt(prompt);
    setIsProcessing(true);
    
    // Simulate AI generation with custom prompts
    setTimeout(() => {
      const mockGeneratedImages = [
        { 
          style: 'custom_1', 
          image: roomImage || '', 
          prompt: prompt 
        },
        { 
          style: 'custom_2', 
          image: roomImage || '', 
          prompt: `${prompt} with modern touches` 
        },
        { 
          style: 'custom_3', 
          image: roomImage || '', 
          prompt: `${prompt} with vintage elements` 
        },
        { 
          style: 'custom_4', 
          image: roomImage || '', 
          prompt: `${prompt} with maximalist flair` 
        }
      ];
      
      setGeneratedStyles(mockGeneratedImages);
      setIsProcessing(false);
    }, 3000);
  };

  const generateStyleVariations = () => {
    if ((!selectedStyle && !customPrompt) || !roomImage) return;
    
    setIsProcessing(true);
    
    // Simulate AI generation of different style variations
    setTimeout(() => {
      const mockGeneratedImages = [
        { style: selectedStyle || 'custom', image: roomImage },
        { style: (selectedStyle || 'custom') + '_variant1', image: roomImage },
        { style: (selectedStyle || 'custom') + '_variant2', image: roomImage },
        { style: (selectedStyle || 'custom') + '_variant3', image: roomImage }
      ];
      
      setGeneratedStyles(mockGeneratedImages);
      setIsProcessing(false);
    }, 3000);
  };

  const saveRoomLook = () => {
    alert('Room style saved! You\'ll get notifications when matching auction items are available.');
  };

  const modes = [
    { id: 'style', label: 'AI Styling', icon: Wand2, description: 'Generate room styles' },
    { id: 'ar', label: 'AR Preview', icon: Layers, description: 'Place auction items' },
    { id: 'recommendations', label: 'Smart Picks', icon: Eye, description: 'Personalized items' }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark px-6 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img 
              src="/ChatGPT Image Jun 25, 2025, 05_33_42 PM.jpg" 
              alt="Deck'd" 
              className="w-8 h-8 rounded-lg mr-3"
            />
            <h1 className="text-3xl font-display font-bold text-white">
              AI Room Designer
            </h1>
          </div>
          <p className="text-sage-300">
            Transform your space with AI-powered styling, AR visualization, and personalized auction recommendations
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex space-x-1 bg-charcoal-800 rounded-xl p-1 mb-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as any)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${
                activeMode === mode.id
                  ? 'bg-gradient-sage text-white shadow-lg'
                  : 'text-sage-300 hover:text-white hover:bg-sage-700'
              }`}
            >
              <mode.icon size={18} className="mr-2" />
              <div className="text-left">
                <p className="font-medium text-sm">{mode.label}</p>
                <p className="text-xs opacity-75">{mode.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Room Photo Upload */}
        {!roomImage ? (
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-12 border border-sage-700 text-center mb-8">
            <label className="cursor-pointer">
              <div className="flex flex-col items-center">
                <Camera size={48} className="text-sage-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Upload Your Room</h3>
                <p className="text-sage-300 mb-6">Take a photo of your dorm room to get started</p>
                <div className="bg-gradient-sage text-white px-6 py-3 rounded-xl font-medium hover:shadow-premium transition-all duration-300">
                  Choose Photo
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Your Room</h3>
              <button
                onClick={() => {
                  setRoomImage(null);
                  setGeneratedStyles([]);
                  setSelectedGenerated(null);
                }}
                className="p-2 bg-sage-700 text-white rounded-lg hover:bg-sage-600 transition-colors"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <img
              src={roomImage}
              alt="Your room"
              className="w-full max-h-96 object-cover rounded-xl"
            />
          </div>
        )}

        {/* Mode Content */}
        {roomImage && (
          <>
            {/* AI Styling Mode */}
            {activeMode === 'style' && (
              <div className="space-y-8">
                {/* AI Style Prompt Component */}
                <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
                  <AIStylePrompt 
                    onStyleGenerate={handleStyleGenerate}
                    isProcessing={isProcessing}
                  />
                </div>

                {/* Traditional Style Selection */}
                <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Palette className="mr-2" size={20} />
                    Or Choose Preset Style
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {roomStyles.map(style => (
                      <button
                        key={style.id}
                        onClick={() => {
                          setSelectedStyle(style.id);
                          setCustomPrompt('');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedStyle === style.id && !customPrompt
                            ? 'border-sage-400 bg-sage-500/10'
                            : 'border-sage-600 hover:border-sage-500'
                        }`}
                      >
                        <div className="text-3xl mb-2">{style.emoji}</div>
                        <h4 className="font-semibold text-white">{style.name}</h4>
                        <p className="text-sm text-sage-400">{style.description}</p>
                        
                        {/* Color Palette */}
                        <div className="flex mt-3 space-x-1 justify-center">
                          {style.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-sage-600"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={generateStyleVariations}
                    disabled={(!selectedStyle && !customPrompt) || isProcessing}
                    className="w-full bg-gradient-sage text-white font-semibold py-4 rounded-xl hover:shadow-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Wand2 className="mr-2" size={20} />
                    {isProcessing ? 'Generating Style Variations...' : 'Generate Preset Style Variations'}
                  </button>
                </div>

                {/* AI Processing */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-sage-500/10 border border-sage-500/20 rounded-2xl p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Sparkles className="text-sage-400 mr-2 animate-pulse" size={20} />
                      <span className="text-sage-400 font-medium">
                        AI is generating {customPrompt ? 'custom' : roomStyles.find(s => s.id === selectedStyle)?.name} style variations...
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="animate-pulse bg-sage-500/20 h-2 rounded-full"></div>
                      <p className="text-sm text-sage-300">
                        Creating multiple style options • Analyzing lighting • Matching furniture • Finding auction items
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Generated Style Variations */}
                {generatedStyles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      AI Generated Style Variations
                    </h3>
                    <p className="text-sage-300 mb-6">
                      Choose your favorite style to get personalized auction recommendations
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {generatedStyles.map((generated, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedGenerated(generated.style)}
                          className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                            selectedGenerated === generated.style
                              ? 'border-sage-400 shadow-lg'
                              : 'border-sage-600 hover:border-sage-500'
                          }`}
                        >
                          <img
                            src={generated.image}
                            alt={`Style variation ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white font-medium text-sm">
                              {generated.prompt ? `Custom Style ${index + 1}` : `Variation ${index + 1}`}
                            </p>
                            {generated.prompt && (
                              <p className="text-sage-300 text-xs truncate">
                                {generated.prompt}
                              </p>
                            )}
                          </div>
                          {selectedGenerated === generated.style && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-sage-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {selectedGenerated && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4 mb-4"
                      >
                        <div className="flex items-center mb-2">
                          <Sparkles className="text-sage-400 mr-2" size={16} />
                          <span className="text-sage-400 font-medium">Style Selected!</span>
                        </div>
                        <p className="text-sm text-sage-300">
                          Great choice! We'll now show you auction items that match this style and 
                          send notifications when similar items are listed.
                        </p>
                      </motion.div>
                    )}
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={saveRoomLook}
                        disabled={!selectedGenerated}
                        className="flex-1 bg-gradient-sage text-white font-semibold py-3 rounded-xl hover:shadow-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <Download className="mr-2" size={20} />
                        Save & Get Recommendations
                      </button>
                      <button
                        onClick={() => setGeneratedStyles([])}
                        className="px-6 py-3 bg-sage-700 text-white rounded-xl hover:bg-sage-600 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* AR Visualization Mode */}
            {activeMode === 'ar' && (
              <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
                <ARRoomVisualizer 
                  roomImage={roomImage}
                  onItemsChange={(items) => setPlacedARItems(items.map(item => item.auctionId))}
                />
              </div>
            )}

            {/* Recommendations Mode */}
            {activeMode === 'recommendations' && (
              <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
                <PersonalizedRecommendations 
                  userStyle={selectedStyle || 'minimal'}
                  roomImage={roomImage}
                  placedItems={placedARItems}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RoomVisualizerPage;
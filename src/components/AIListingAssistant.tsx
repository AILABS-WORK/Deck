import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, DollarSign, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface AIListingData {
  title: string;
  description: string;
  category: string;
  condition: string;
  suggestedPrice: number;
  priceConfidence: number;
  sellLikelihood: number;
  marketInsights: string[];
  tags: string[];
}

interface AIListingAssistantProps {
  images: string[];
  onDataGenerated: (data: AIListingData) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const AIListingAssistant: React.FC<AIListingAssistantProps> = ({
  images,
  onDataGenerated,
  isProcessing,
  setIsProcessing
}) => {
  const [aiData, setAiData] = useState<AIListingData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (images.length > 0 && !aiData) {
      generateAIData();
    }
  }, [images]);

  const generateAIData = async () => {
    setIsProcessing(true);
    
    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      const mockAIData: AIListingData = {
        title: "IKEA Desk Lamp - Perfect Study Light for Dorm",
        description: "This sleek IKEA desk lamp is perfect for late-night study sessions! Features adjustable arm and head for optimal lighting positioning. The minimalist white design fits any dorm aesthetic. Excellent condition with minor wear on the base. Energy-efficient LED bulb included. Great for reading, studying, or ambient lighting. Moving out and need it gone ASAP!",
        category: "Lighting",
        condition: "Good",
        suggestedPrice: 18,
        priceConfidence: 87,
        sellLikelihood: 92,
        marketInsights: [
          "Similar lamps sold for $15-22 this week",
          "High demand for study lighting near finals",
          "IKEA brand adds 15% value premium",
          "White/minimalist items sell 40% faster"
        ],
        tags: ["ikea", "study", "minimalist", "led", "adjustable", "dorm-friendly"]
      };
      
      setAiData(mockAIData);
      onDataGenerated(mockAIData);
      setIsProcessing(false);
    }, 3000);
  };

  const getSellLikelihoodColor = (likelihood: number) => {
    if (likelihood >= 80) return 'text-green-400';
    if (likelihood >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSellLikelihoodBg = (likelihood: number) => {
    if (likelihood >= 80) return 'bg-green-500/20 border-green-500/30';
    if (likelihood >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* AI Processing */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sage-500/10 border border-sage-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Sparkles className="text-sage-400 mr-2 animate-pulse" size={20} />
            <span className="text-sage-400 font-medium">AI is analyzing your item...</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-sage-300">Identifying item type</span>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sage-400"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-sage-300">Analyzing condition</span>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sage-400"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-sage-300">Researching market prices</span>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sage-400"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-sage-300">Generating description</span>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sage-400"></div>
            </div>
          </div>
          <div className="mt-4 bg-sage-500/20 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
              className="h-full bg-sage-400 rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* AI Results */}
      {aiData && !isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Wand2 className="text-sage-400 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-white">AI Analysis Complete</h3>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sage-400 hover:text-white transition-colors text-sm"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {/* Sell Likelihood Meter */}
          <div className={`p-4 rounded-xl border mb-6 ${getSellLikelihoodBg(aiData.sellLikelihood)}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <TrendingUp className={`mr-2 ${getSellLikelihoodColor(aiData.sellLikelihood)}`} size={20} />
                <span className="text-white font-medium">Sell Likelihood</span>
              </div>
              <span className={`text-2xl font-bold ${getSellLikelihoodColor(aiData.sellLikelihood)}`}>
                {aiData.sellLikelihood}%
              </span>
            </div>
            <div className="w-full bg-sage-800 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${aiData.sellLikelihood}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-3 rounded-full ${
                  aiData.sellLikelihood >= 80 ? 'bg-green-500' :
                  aiData.sellLikelihood >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              />
            </div>
            <p className="text-sm text-sage-300 mt-2">
              {aiData.sellLikelihood >= 80 ? 'Excellent chance of selling quickly!' :
               aiData.sellLikelihood >= 60 ? 'Good chance of selling within a week' :
               'Consider adjusting price or improving photos'}
            </p>
          </div>

          {/* Price Suggestion */}
          <div className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <DollarSign className="text-sage-400 mr-2" size={20} />
                <span className="text-white font-medium">Suggested Price</span>
              </div>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-white">${aiData.suggestedPrice}</span>
                <div className="ml-3 flex items-center">
                  <CheckCircle className="text-green-400 mr-1" size={16} />
                  <span className="text-green-400 text-sm">{aiData.priceConfidence}% confident</span>
                </div>
              </div>
            </div>
            <p className="text-sage-300 text-sm">
              Based on recent sales of similar items in your area
            </p>
          </div>

          {/* Generated Content Preview */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sage-300 mb-2">
                AI Generated Title
              </label>
              <div className="bg-charcoal-800 border border-sage-600 rounded-xl p-3">
                <p className="text-white">{aiData.title}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-300 mb-2">
                AI Generated Description
              </label>
              <div className="bg-charcoal-800 border border-sage-600 rounded-xl p-3">
                <p className="text-white text-sm leading-relaxed">{aiData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-300 mb-2">
                  Category
                </label>
                <div className="bg-charcoal-800 border border-sage-600 rounded-xl p-3">
                  <p className="text-white">{aiData.category}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-300 mb-2">
                  Condition
                </label>
                <div className="bg-charcoal-800 border border-sage-600 rounded-xl p-3">
                  <p className="text-white">{aiData.condition}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-300 mb-2">
                Suggested Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {aiData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-sage-500/20 text-sage-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Market Insights */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-sage-700"
            >
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Zap className="text-accent-400 mr-2" size={16} />
                Market Insights
              </h4>
              <div className="space-y-2">
                {aiData.marketInsights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <AlertCircle className="text-sage-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <p className="text-sage-300 text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                // Apply all AI suggestions
                onDataGenerated(aiData);
              }}
              className="flex-1 bg-gradient-sage text-white font-semibold py-3 rounded-xl hover:shadow-premium transition-all duration-300"
            >
              Use AI Suggestions
            </button>
            <button
              onClick={() => {
                setAiData(null);
                generateAIData();
              }}
              className="px-6 py-3 bg-sage-700 text-white rounded-xl hover:bg-sage-600 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIListingAssistant;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Palette, Home, Heart, Lightbulb } from 'lucide-react';

interface AIStylePromptProps {
  onStyleGenerate: (prompt: string, mood: string, elements: string[]) => void;
  isProcessing?: boolean;
}

const AIStylePrompt: React.FC<AIStylePromptProps> = ({ onStyleGenerate, isProcessing = false }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const moods = [
    { id: 'cozy', name: 'Cozy & Warm', emoji: '🔥', description: 'Soft textures, warm lighting' },
    { id: 'minimal', name: 'Clean & Minimal', emoji: '⚪', description: 'Simple, uncluttered spaces' },
    { id: 'vibrant', name: 'Bold & Vibrant', emoji: '🌈', description: 'Bright colors, energetic' },
    { id: 'natural', name: 'Natural & Earthy', emoji: '🌿', description: 'Plants, wood, organic shapes' },
    { id: 'modern', name: 'Sleek & Modern', emoji: '✨', description: 'Contemporary, tech-forward' },
    { id: 'vintage', name: 'Retro & Vintage', emoji: '📻', description: 'Classic, nostalgic elements' }
  ];

  const styleElements = [
    'Plants & Greenery', 'Warm Lighting', 'Textured Fabrics', 'Metallic Accents',
    'Geometric Patterns', 'Natural Wood', 'Soft Pastels', 'Bold Colors',
    'Minimalist Furniture', 'Vintage Pieces', 'Modern Art', 'Cozy Textiles',
    'Industrial Elements', 'Bohemian Touches', 'Scandinavian Design', 'Urban Loft'
  ];

  const toggleElement = (element: string) => {
    setSelectedElements(prev => 
      prev.includes(element) 
        ? prev.filter(e => e !== element)
        : [...prev, element]
    );
  };

  const handleGenerate = () => {
    if (!customPrompt && !selectedMood && selectedElements.length === 0) return;
    
    let finalPrompt = customPrompt;
    if (!customPrompt) {
      const moodDesc = moods.find(m => m.id === selectedMood)?.description || '';
      const elementsDesc = selectedElements.join(', ');
      finalPrompt = `${moodDesc}${elementsDesc ? ` with ${elementsDesc}` : ''}`;
    }
    
    onStyleGenerate(finalPrompt, selectedMood, selectedElements);
  };

  const suggestedPrompts = [
    "Cozy minimalist dorm with plants and warm string lights",
    "Modern industrial style with exposed brick and metal accents",
    "Bohemian paradise with tapestries, plants, and colorful textiles",
    "Scandinavian-inspired space with light wood and neutral tones",
    "Maximalist art studio with bold colors and creative chaos"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center">
          <Sparkles className="mr-2" size={20} />
          AI Style Generator
        </h3>
        <p className="text-sage-300">Describe your dream room or choose elements to create the perfect style</p>
      </div>

      {/* Custom Prompt */}
      <div>
        <label className="block text-sm font-medium text-sage-300 mb-2">
          Describe Your Ideal Room Style
        </label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Describe your dream room in detail... (e.g., 'A cozy reading nook with vintage furniture, warm lighting, and lots of books')"
          className="w-full px-4 py-3 bg-charcoal-800 border border-sage-600 rounded-xl text-white placeholder-sage-400 focus:border-sage-400 focus:outline-none transition-colors resize-none"
          rows={3}
        />
      </div>

      {/* Suggested Prompts */}
      <div>
        <label className="block text-sm font-medium text-sage-300 mb-3">
          <Lightbulb className="inline mr-1" size={14} />
          Quick Ideas
        </label>
        <div className="grid gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setCustomPrompt(prompt)}
              className="text-left p-3 bg-sage-800/30 hover:bg-sage-700/50 rounded-lg transition-colors text-sage-300 hover:text-white text-sm"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-sage-400 text-sm">
        — OR BUILD YOUR STYLE —
      </div>

      {/* Mood Selection */}
      <div>
        <label className="block text-sm font-medium text-sage-300 mb-3">
          <Heart className="inline mr-1" size={14} />
          Choose a Mood
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id === selectedMood ? '' : mood.id)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedMood === mood.id
                  ? 'border-sage-400 bg-sage-500/10'
                  : 'border-sage-600 hover:border-sage-500'
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <h4 className="font-medium text-white text-sm">{mood.name}</h4>
              <p className="text-xs text-sage-400">{mood.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Style Elements */}
      <div>
        <label className="block text-sm font-medium text-sage-300 mb-3">
          <Palette className="inline mr-1" size={14} />
          Add Style Elements
        </label>
        <div className="flex flex-wrap gap-2">
          {styleElements.map((element) => (
            <button
              key={element}
              onClick={() => toggleElement(element)}
              className={`px-3 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedElements.includes(element)
                  ? 'bg-sage-500 text-white'
                  : 'bg-sage-800/50 text-sage-300 hover:bg-sage-700/50 hover:text-white'
              }`}
            >
              {element}
            </button>
          ))}
        </div>
        {selectedElements.length > 0 && (
          <p className="text-sage-400 text-sm mt-2">
            Selected: {selectedElements.join(', ')}
          </p>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={(!customPrompt && !selectedMood && selectedElements.length === 0) || isProcessing}
        className="w-full bg-gradient-sage text-white font-semibold py-4 rounded-xl hover:shadow-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <Wand2 className="mr-2" size={20} />
        {isProcessing ? 'Generating Your Style...' : 'Generate AI Room Styles'}
      </button>

      {/* Style Preview */}
      {(selectedMood || selectedElements.length > 0) && !customPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4"
        >
          <div className="flex items-center mb-2">
            <Home className="text-sage-400 mr-2" size={16} />
            <span className="text-sage-400 font-medium">Style Preview</span>
          </div>
          <p className="text-sage-300 text-sm">
            {selectedMood && moods.find(m => m.id === selectedMood)?.description}
            {selectedMood && selectedElements.length > 0 && ' with '}
            {selectedElements.join(', ')}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AIStylePrompt;
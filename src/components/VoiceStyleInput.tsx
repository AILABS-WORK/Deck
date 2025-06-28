import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Sparkles, Play, Square } from 'lucide-react';

interface VoiceStyleInputProps {
  onVoiceInput: (transcript: string) => void;
  isProcessing?: boolean;
}

const VoiceStyleInput: React.FC<VoiceStyleInputProps> = ({ onVoiceInput, isProcessing = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        if (transcript.trim()) {
          onVoiceInput(transcript);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Simulate audio level for visual feedback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const startListening = () => {
    if (recognition && isSupported) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const examplePrompts = [
    "I want a cozy minimalist bedroom with warm lighting and plants",
    "Create a modern gaming setup with RGB lighting and dark colors",
    "Design a boho study space with vintage furniture and tapestries",
    "Make a Scandinavian dorm room with light wood and neutral tones"
  ];

  const playExample = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
        <div className="text-center">
          <MicOff className="w-12 h-12 text-sage-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Voice Input Not Supported</h3>
          <p className="text-sage-400 text-sm">
            Your browser doesn't support voice recognition. Please use the text input instead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Voice Input Interface */}
      <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
            <Mic className="mr-2" size={20} />
            Voice Style Input
          </h3>
          <p className="text-sage-300 mb-6">
            Describe your dream room style using your voice
          </p>

          {/* Voice Button */}
          <div className="relative mb-6">
            <motion.button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25' 
                  : 'bg-gradient-sage hover:shadow-premium'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isListening ? (
                <Square size={32} className="text-white" />
              ) : (
                <Mic size={32} className="text-white" />
              )}
              
              {/* Audio Level Visualization */}
              {isListening && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-red-300 opacity-50"
                  style={{ transform: `scale(${1 + audioLevel / 200})` }}
                />
              )}
            </motion.button>
            
            {/* Status Text */}
            <p className="mt-3 text-sm font-medium">
              {isListening ? (
                <span className="text-red-400">🎤 Listening... Tap to stop</span>
              ) : (
                <span className="text-sage-400">Tap to start speaking</span>
              )}
            </p>
          </div>

          {/* Live Transcript */}
          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4 mb-4"
              >
                <div className="flex items-center mb-2">
                  <Sparkles className="text-sage-400 mr-2" size={16} />
                  <span className="text-sage-400 font-medium">
                    {isListening ? 'Listening...' : 'Transcript'}
                  </span>
                </div>
                <p className="text-white text-left">"{transcript}"</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing State */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4"
            >
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sage-400 mr-3"></div>
                <span className="text-sage-400">Processing your voice input...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Example Prompts */}
      <div className="bg-sage-900/20 backdrop-blur-lg rounded-2xl p-6 border border-sage-700">
        <h4 className="text-white font-medium mb-4 flex items-center">
          <Volume2 className="mr-2" size={16} />
          Example Voice Prompts
        </h4>
        <div className="space-y-3">
          {examplePrompts.map((prompt, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-sage-800/30 rounded-xl hover:bg-sage-700/50 transition-colors"
            >
              <p className="text-sage-300 text-sm flex-1">"{prompt}"</p>
              <div className="flex space-x-2 ml-3">
                <button
                  onClick={() => playExample(prompt)}
                  className="p-2 bg-sage-600 text-white rounded-lg hover:bg-sage-500 transition-colors"
                  title="Play example"
                >
                  <Play size={14} />
                </button>
                <button
                  onClick={() => onVoiceInput(prompt)}
                  className="p-2 bg-sage-500 text-white rounded-lg hover:bg-sage-400 transition-colors"
                  title="Use this prompt"
                >
                  <Sparkles size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4">
        <h4 className="text-sage-400 font-medium mb-2">💡 Voice Input Tips</h4>
        <ul className="text-sage-300 text-sm space-y-1">
          <li>• Speak clearly and at a normal pace</li>
          <li>• Include colors, styles, and specific items you want</li>
          <li>• Mention the room type (bedroom, study area, etc.)</li>
          <li>• Describe the mood or feeling you want</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceStyleInput;
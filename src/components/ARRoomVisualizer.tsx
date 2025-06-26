import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Move, RotateCcw, Trash2, Save, Eye, Layers, Maximize2 } from 'lucide-react';
import { mockAuctions } from '../data/mockData';

interface ARItem {
  id: string;
  auctionId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  title: string;
  image: string;
  price: number;
}

interface ARRoomVisualizerProps {
  roomImage: string;
  onItemsChange?: (items: ARItem[]) => void;
  selectedAuctionItems?: string[];
}

const ARRoomVisualizer: React.FC<ARRoomVisualizerProps> = ({ 
  roomImage, 
  onItemsChange,
  selectedAuctionItems = []
}) => {
  const [placedItems, setPlacedItems] = useState<ARItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showItemPicker, setShowItemPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const availableItems = mockAuctions.filter(auction => 
    selectedAuctionItems.length === 0 || selectedAuctionItems.includes(auction.id)
  );

  const handleRoomClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showItemPicker && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // For demo, place the first available item
      if (availableItems.length > 0) {
        const auction = availableItems[0];
        const newItem: ARItem = {
          id: `item-${Date.now()}`,
          auctionId: auction.id,
          x,
          y,
          scale: 1,
          rotation: 0,
          title: auction.title,
          image: auction.image,
          price: auction.currentBid
        };
        
        const updatedItems = [...placedItems, newItem];
        setPlacedItems(updatedItems);
        onItemsChange?.(updatedItems);
        setShowItemPicker(false);
      }
    }
  };

  const handleItemDrag = (itemId: string, deltaX: number, deltaY: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const deltaXPercent = (deltaX / rect.width) * 100;
    const deltaYPercent = (deltaY / rect.height) * 100;
    
    setPlacedItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              x: Math.max(0, Math.min(100, item.x + deltaXPercent)),
              y: Math.max(0, Math.min(100, item.y + deltaYPercent))
            }
          : item
      )
    );
  };

  const updateItemProperty = (itemId: string, property: keyof ARItem, value: any) => {
    const updatedItems = placedItems.map(item => 
      item.id === itemId ? { ...item, [property]: value } : item
    );
    setPlacedItems(updatedItems);
    onItemsChange?.(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = placedItems.filter(item => item.id !== itemId);
    setPlacedItems(updatedItems);
    onItemsChange?.(updatedItems);
    setSelectedItem(null);
  };

  const addItemFromAuction = (auction: typeof mockAuctions[0]) => {
    const newItem: ARItem = {
      id: `item-${Date.now()}`,
      auctionId: auction.id,
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      title: auction.title,
      image: auction.image,
      price: auction.currentBid
    };
    
    const updatedItems = [...placedItems, newItem];
    setPlacedItems(updatedItems);
    onItemsChange?.(updatedItems);
  };

  return (
    <div className="space-y-6">
      {/* AR Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">AR Room Visualizer</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowItemPicker(!showItemPicker)}
            className={`p-2 rounded-lg transition-colors ${
              showItemPicker 
                ? 'bg-sage-500 text-white' 
                : 'bg-sage-700 text-sage-300 hover:text-white'
            }`}
          >
            <Layers size={16} />
          </button>
          <button
            onClick={() => {
              setPlacedItems([]);
              onItemsChange?.([]);
            }}
            className="p-2 bg-sage-700 text-sage-300 hover:text-white rounded-lg transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Room Container */}
      <div className="relative">
        <div
          ref={containerRef}
          onClick={handleRoomClick}
          className="relative w-full h-96 rounded-xl overflow-hidden cursor-crosshair border-2 border-dashed border-sage-600 hover:border-sage-400 transition-colors"
          style={{ backgroundImage: `url(${roomImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Overlay for better visibility */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Placed Items */}
          {placedItems.map((item) => (
            <motion.div
              key={item.id}
              drag
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              onDrag={(_, info) => handleItemDrag(item.id, info.delta.x, info.delta.y)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item.id);
              }}
              className={`absolute cursor-move ${
                selectedItem === item.id ? 'ring-2 ring-sage-400' : ''
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) scale(${item.scale}) rotate(${item.rotation}deg)`,
              }}
              whileHover={{ scale: item.scale * 1.05 }}
              whileDrag={{ scale: item.scale * 1.1 }}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg shadow-lg border-2 border-white"
                  draggable={false}
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-sage-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ${item.price}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Click instruction */}
          {showItemPicker && placedItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-sage-900/80 text-white px-4 py-2 rounded-lg">
                Click anywhere to place items
              </div>
            </div>
          )}
        </div>

        {/* Item Controls */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-4 right-4 bg-sage-900/90 backdrop-blur-lg rounded-xl p-4 border border-sage-700"
            >
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-sage-300 mb-1">Scale</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={placedItems.find(item => item.id === selectedItem)?.scale || 1}
                    onChange={(e) => updateItemProperty(selectedItem, 'scale', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-sage-300 mb-1">Rotation</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={placedItems.find(item => item.id === selectedItem)?.rotation || 0}
                    onChange={(e) => updateItemProperty(selectedItem, 'rotation', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={() => removeItem(selectedItem)}
                  className="w-full p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Available Items */}
      <AnimatePresence>
        {showItemPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-sage-900/20 rounded-xl p-4 border border-sage-700"
          >
            <h4 className="text-white font-medium mb-3">Available Auction Items</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableItems.slice(0, 8).map((auction) => (
                <button
                  key={auction.id}
                  onClick={() => addItemFromAuction(auction)}
                  className="bg-sage-800/50 rounded-lg p-3 hover:bg-sage-700/50 transition-colors text-left"
                >
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="w-full h-16 object-cover rounded mb-2"
                  />
                  <p className="text-white text-xs font-medium truncate">{auction.title}</p>
                  <p className="text-sage-400 text-xs">${auction.currentBid}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Summary */}
      {placedItems.length > 0 && (
        <div className="bg-sage-500/10 border border-sage-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sage-400 font-medium">Room Total</span>
            <span className="text-white font-bold">
              ${placedItems.reduce((sum, item) => sum + item.price, 0)}
            </span>
          </div>
          <p className="text-sage-300 text-sm">
            {placedItems.length} items placed • Click items to adjust size and rotation
          </p>
        </div>
      )}
    </div>
  );
};

export default ARRoomVisualizer;
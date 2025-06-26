export const mockAuctions = [
  {
    id: '1',
    title: 'IKEA Desk Lamp - Perfect for Studying',
    currentBid: 8,
    originalPrice: 25,
    timeLeft: '2h 34m',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.3 mi',
    bidCount: 7,
    tags: ['lighting', 'study', 'ikea', 'minimalist'],
    sellerXP: 127,
    isWatched: false,
    styleMatch: 'minimal'
  },
  {
    id: '2',
    title: 'Textbook: Organic Chemistry 8th Ed',
    currentBid: 12,
    originalPrice: 300,
    timeLeft: '45m',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.1 mi',
    bidCount: 12,
    tags: ['textbooks', 'chemistry', 'science'],
    sellerXP: 89,
    isWatched: true,
    styleMatch: 'academic'
  },
  {
    id: '3',
    title: 'Mini Fridge - Dorm Size',
    currentBid: 45,
    originalPrice: 180,
    timeLeft: '6h 12m',
    image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.5 mi',
    bidCount: 3,
    tags: ['appliances', 'dorm', 'essential'],
    sellerXP: 203,
    isWatched: false,
    styleMatch: 'dormcore'
  },
  {
    id: '4',
    title: 'Boho Plant Collection with Macrame',
    currentBid: 15,
    originalPrice: 45,
    timeLeft: '1h 23m',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.2 mi',
    bidCount: 9,
    tags: ['plants', 'decor', 'boho', 'macrame'],
    sellerXP: 156,
    isWatched: false,
    styleMatch: 'indie'
  },
  {
    id: '5',
    title: 'Gaming Chair - RGB LED',
    currentBid: 32,
    originalPrice: 150,
    timeLeft: '3h 45m',
    image: 'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.7 mi',
    bidCount: 15,
    tags: ['furniture', 'gaming', 'chair', 'rgb'],
    sellerXP: 312,
    isWatched: true,
    styleMatch: 'gaming'
  },
  {
    id: '6',
    title: 'Scandinavian String Lights',
    currentBid: 6,
    originalPrice: 20,
    timeLeft: '4h 56m',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.4 mi',
    bidCount: 4,
    tags: ['lighting', 'decor', 'scandi', 'cozy'],
    sellerXP: 78,
    isWatched: false,
    styleMatch: 'scandi'
  },
  {
    id: '7',
    title: 'Vintage Tapestry Wall Art',
    currentBid: 18,
    originalPrice: 35,
    timeLeft: '23m',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.6 mi',
    bidCount: 8,
    tags: ['decor', 'vintage', 'tapestry', 'wall-art'],
    sellerXP: 145,
    isWatched: false,
    styleMatch: 'indie'
  },
  {
    id: '8',
    title: 'Modern Desk Organizer Set',
    currentBid: 9,
    originalPrice: 28,
    timeLeft: '5h 18m',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.3 mi',
    bidCount: 6,
    tags: ['organization', 'desk', 'modern', 'productivity'],
    sellerXP: 92,
    isWatched: false,
    styleMatch: 'minimal'
  }
];

export const mockUser = {
  name: 'Alex Chen',
  email: 'alex.chen@mit.edu',
  university: 'MIT',
  dorm: 'Baker House',
  gradYear: '2025',
  xp: 247,
  badgeLevel: 'Eco Warrior',
  itemsSold: 12,
  itemsBought: 8,
  lbsSaved: 156,
  co2Saved: 89,
  preferredStyle: 'minimal',
  watchedItems: ['2', '5'],
  notifications: [
    {
      id: '1',
      type: 'style_match',
      message: 'New minimal style item: Modern Desk Organizer Set',
      time: '5m ago',
      itemId: '8'
    },
    {
      id: '2',
      type: 'auction_ending',
      message: 'Vintage Tapestry ends in 23 minutes!',
      time: '10m ago',
      itemId: '7'
    }
  ]
};

export const roomStyles = [
  {
    id: 'minimal',
    name: 'Minimal',
    emoji: '⚪',
    description: 'Clean lines, neutral colors, less is more',
    colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD'],
    keywords: ['clean', 'simple', 'white', 'organized', 'spacious']
  },
  {
    id: 'scandi',
    name: 'Scandinavian',
    emoji: '🌿',
    description: 'Natural materials, cozy textures, light woods',
    colors: ['#F7F3E9', '#E8DCC6', '#D4B996', '#8B7355'],
    keywords: ['natural', 'wood', 'cozy', 'hygge', 'plants']
  },
  {
    id: 'indie',
    name: 'Indie/Boho',
    emoji: '🌈',
    description: 'Eclectic mix, vintage finds, artistic expression',
    colors: ['#D4A574', '#C67B5C', '#8B4513', '#654321'],
    keywords: ['vintage', 'eclectic', 'artistic', 'colorful', 'unique']
  },
  {
    id: 'dormcore',
    name: 'Dormcore',
    emoji: '🎓',
    description: 'Classic college vibes, functional and fun',
    colors: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B'],
    keywords: ['functional', 'bright', 'college', 'practical', 'social']
  },
  {
    id: 'gaming',
    name: 'Gaming Setup',
    emoji: '🎮',
    description: 'RGB lighting, tech-focused, dark themes',
    colors: ['#000000', '#1A1A1A', '#FF0080', '#00FFFF'],
    keywords: ['rgb', 'tech', 'dark', 'neon', 'gaming']
  }
];
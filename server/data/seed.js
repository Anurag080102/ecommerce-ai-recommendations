const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Product = require('../models/Product');
const User = require('../models/User');

// Sample products with realistic tags for recommendation engine
const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones Pro',
    description: 'Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals.',
    price: 199.99,
    category: 'Electronics',
    tags: ['wireless', 'bluetooth', 'headphones', 'audio', 'noise-cancelling', 'premium', 'over-ear'],
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 50,
    rating: 4.8,
    numReviews: 124,
    featured: true,
  },
  {
    name: 'Wireless Earbuds Sport Edition',
    description: 'Compact true wireless earbuds designed for sports and active lifestyles. Water-resistant with secure fit and powerful bass.',
    price: 79.99,
    category: 'Electronics',
    tags: ['wireless', 'bluetooth', 'earbuds', 'audio', 'sports', 'waterproof', 'compact'],
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    stock: 100,
    rating: 4.5,
    numReviews: 89,
    featured: false,
  },
  {
    name: 'Smart Watch Ultra',
    description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life. Track your fitness goals and stay connected.',
    price: 349.99,
    category: 'Electronics',
    tags: ['smartwatch', 'fitness', 'gps', 'health', 'wearable', 'bluetooth', 'premium'],
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 30,
    rating: 4.7,
    numReviews: 203,
    featured: true,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 360-degree sound. Perfect for outdoor adventures and pool parties.',
    price: 59.99,
    category: 'Electronics',
    tags: ['bluetooth', 'speaker', 'audio', 'portable', 'waterproof', 'outdoor'],
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    stock: 75,
    rating: 4.4,
    numReviews: 156,
    featured: false,
  },
  {
    name: 'Mechanical Gaming Keyboard RGB',
    description: 'Professional mechanical keyboard with customizable RGB lighting, Cherry MX switches, and programmable macros.',
    price: 149.99,
    category: 'Electronics',
    tags: ['keyboard', 'gaming', 'mechanical', 'rgb', 'computer', 'peripheral'],
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
    stock: 40,
    rating: 4.6,
    numReviews: 98,
    featured: false,
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'Ultra-fast wireless gaming mouse with 25K DPI sensor, lightweight design, and 70-hour battery life.',
    price: 129.99,
    category: 'Electronics',
    tags: ['mouse', 'gaming', 'wireless', 'computer', 'peripheral', 'rgb'],
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    stock: 60,
    rating: 4.5,
    numReviews: 77,
    featured: false,
  },
  // Clothing
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft 100% organic cotton t-shirt with a relaxed fit. Available in multiple colors.',
    price: 29.99,
    category: 'Clothing',
    tags: ['cotton', 'tshirt', 'casual', 'organic', 'comfortable', 'basic'],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    stock: 200,
    rating: 4.3,
    numReviews: 312,
    featured: false,
  },
  {
    name: 'Athletic Performance Hoodie',
    description: 'Moisture-wicking hoodie perfect for workouts or casual wear. Features thumb holes and zippered pockets.',
    price: 69.99,
    category: 'Clothing',
    tags: ['hoodie', 'athletic', 'sports', 'workout', 'comfortable', 'moisture-wicking'],
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    stock: 80,
    rating: 4.6,
    numReviews: 145,
    featured: true,
  },
  {
    name: 'Classic Denim Jeans',
    description: 'Timeless straight-fit denim jeans made from premium stretch cotton for all-day comfort.',
    price: 79.99,
    category: 'Clothing',
    tags: ['jeans', 'denim', 'casual', 'classic', 'comfortable', 'cotton'],
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    stock: 120,
    rating: 4.4,
    numReviews: 234,
    featured: false,
  },
  {
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for marathon training.',
    price: 139.99,
    category: 'Clothing',
    tags: ['shoes', 'running', 'sports', 'athletic', 'lightweight', 'breathable'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 45,
    rating: 4.7,
    numReviews: 189,
    featured: true,
  },
  // Home & Garden
  {
    name: 'Smart LED Light Bulb Pack',
    description: 'Set of 4 WiFi-enabled smart bulbs with 16 million colors. Compatible with Alexa and Google Home.',
    price: 49.99,
    category: 'Home & Garden',
    tags: ['smart-home', 'led', 'lighting', 'wifi', 'alexa', 'automation'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    stock: 90,
    rating: 4.5,
    numReviews: 267,
    featured: false,
  },
  {
    name: 'Indoor Plant Collection',
    description: 'Curated set of 3 low-maintenance indoor plants in decorative ceramic pots. Air-purifying varieties.',
    price: 59.99,
    category: 'Home & Garden',
    tags: ['plants', 'indoor', 'decor', 'air-purifying', 'ceramic', 'natural'],
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    stock: 35,
    rating: 4.8,
    numReviews: 156,
    featured: true,
  },
  {
    name: 'Minimalist Desk Lamp',
    description: 'Sleek LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
    price: 44.99,
    category: 'Home & Garden',
    tags: ['lamp', 'desk', 'led', 'lighting', 'minimalist', 'usb', 'office'],
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    stock: 55,
    rating: 4.4,
    numReviews: 98,
    featured: false,
  },
  // Sports
  {
    name: 'Yoga Mat Premium',
    description: 'Extra-thick eco-friendly yoga mat with alignment lines. Non-slip surface and carrying strap included.',
    price: 39.99,
    category: 'Sports',
    tags: ['yoga', 'fitness', 'mat', 'eco-friendly', 'workout', 'non-slip'],
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    stock: 100,
    rating: 4.6,
    numReviews: 234,
    featured: false,
  },
  {
    name: 'Adjustable Dumbbell Set',
    description: 'Space-saving adjustable dumbbells from 5-52.5 lbs. Quick-change weight system for efficient workouts.',
    price: 299.99,
    category: 'Sports',
    tags: ['dumbbells', 'weights', 'fitness', 'strength', 'workout', 'home-gym'],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    stock: 25,
    rating: 4.8,
    numReviews: 167,
    featured: true,
  },
  {
    name: 'Fitness Tracker Band',
    description: 'Lightweight fitness tracker with heart rate monitoring, sleep tracking, and 14-day battery life.',
    price: 49.99,
    category: 'Sports',
    tags: ['fitness', 'tracker', 'wearable', 'health', 'heart-rate', 'sleep'],
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
    stock: 150,
    rating: 4.3,
    numReviews: 289,
    featured: false,
  },
  // Books
  {
    name: 'JavaScript: The Complete Guide',
    description: 'Comprehensive guide to modern JavaScript development. Covers ES6+, async programming, and frameworks.',
    price: 44.99,
    category: 'Books',
    tags: ['javascript', 'programming', 'coding', 'web-development', 'technical', 'learning'],
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    stock: 80,
    rating: 4.7,
    numReviews: 145,
    featured: false,
  },
  {
    name: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning concepts with practical Python examples. Perfect for beginners.',
    price: 54.99,
    category: 'Books',
    tags: ['machine-learning', 'ai', 'python', 'programming', 'data-science', 'technical'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    stock: 60,
    rating: 4.6,
    numReviews: 112,
    featured: true,
  },
  {
    name: 'The Art of Clean Code',
    description: 'Best practices for writing maintainable and efficient code. Essential for professional developers.',
    price: 39.99,
    category: 'Books',
    tags: ['programming', 'coding', 'best-practices', 'software', 'technical', 'professional'],
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
    stock: 70,
    rating: 4.8,
    numReviews: 198,
    featured: false,
  },
  // Health & Beauty
  {
    name: 'Organic Face Serum',
    description: 'Vitamin C and hyaluronic acid serum for glowing, hydrated skin. 100% organic ingredients.',
    price: 34.99,
    category: 'Health & Beauty',
    tags: ['skincare', 'organic', 'serum', 'vitamin-c', 'hydrating', 'natural'],
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
    stock: 85,
    rating: 4.5,
    numReviews: 223,
    featured: true,
  },
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${createdProducts.length} products`);

    // Create admin user
    const createdAdmin = await User.create(adminUser);
    console.log(`✅ Created admin user: ${createdAdmin.email}`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();

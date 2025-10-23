import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import Newsletter from './models/Newsletter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moonlight-clothing');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Running in fallback mode without database');
  }
};

connectDB();

let fabrics = [
  {
    id: 1,
    name: 'Adinkra White Shirt',
    price: 25000,
    story: 'Premium Adinkra design white shirt featuring traditional African symbols. Perfect for cultural events and elegant occasions.',
    image: '/images/adinkra-white-shirt.jpg',
    gender: 'Unisex',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'The Ready-to-Wear Realm', 'Unisex Divine Fits']
  },
  {
    id: 2,
    name: 'Covenant Black Jacket',
    price: 35000,
    story: 'Stylish black jacket with covenant symbols. Premium quality fabric for modern sophistication.',
    image: '/images/covenant-black-jacket.jpg',
    gender: 'Unisex',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits', 'Limited Drop Series']
  },
  {
    id: 3,
    name: 'Covenant Black Kaftan',
    price: 30000,
    story: 'Traditional black kaftan with covenant patterns. Elegant and comfortable for all occasions.',
    image: '/images/covenant-black-kaftan.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Unisex Divine Fits']
  },
  {
    id: 4,
    name: 'Covenant Black Shirt',
    price: 22000,
    story: 'Classic black shirt with covenant design elements. Perfect for everyday wear.',
    image: '/images/covenant-black-shirt.jpg',
    gender: 'Men',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Mens Collection']
  },
  {
    id: 5,
    name: 'Covenant Blue Jeans',
    price: 28000,
    story: 'Premium blue denim with covenant styling. Durable and fashionable.',
    image: '/images/covenant-blue-jeans.jpg',
    gender: 'Unisex',
    products: ['Palazzo casual trousers'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits']
  },
  {
    id: 6,
    name: 'Covenant Blue Set',
    price: 45000,
    story: 'Complete blue two-piece set with covenant designs. Stylish and coordinated.',
    image: '/images/covenant-blue-set.jpg',
    gender: 'Unisex',
    products: ['Two pieces'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits']
  },
  {
    id: 7,
    name: 'Guardian Black Shirt',
    price: 24000,
    story: 'Guardian series black shirt with protective symbols. Strong and elegant design.',
    image: '/images/guardian-black-shirt.jpg',
    gender: 'Men',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Mens Collection']
  },
  {
    id: 8,
    name: 'Guardian White Kaftan',
    price: 32000,
    story: 'Pure white kaftan from the Guardian collection. Spiritual and refined.',
    image: '/images/guardian-white-kaftan.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Unisex Divine Fits']
  },
  {
    id: 9,
    name: 'Green Yellow Shirt',
    price: 26000,
    story: 'Vibrant green and yellow shirt with bold African prints. Stand out in style.',
    image: '/images/green-yellow-shirt.jpg',
    gender: 'Unisex',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Limited Drop Series']
  },
  {
    id: 10,
    name: 'Green Yellow Two Piece',
    price: 48000,
    story: 'Complete green and yellow two-piece set. Bold colors with traditional patterns.',
    image: '/images/green-yellow-two-piece.jpg',
    gender: 'Unisex',
    products: ['Two pieces'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Limited Drop Series']
  },
  {
    id: 11,
    name: 'White Three Piece Set',
    price: 55000,
    story: 'Premium white three-piece set. Complete elegance for special occasions.',
    image: '/images/white-three-piece-set.jpg',
    gender: 'Unisex',
    products: ['Two pieces'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'The Capsule Editions', 'Unisex Divine Fits']
  },
  {
    id: 12,
    name: 'Brown Adinkra Kaftan',
    price: 34000,
    story: 'Rich brown kaftan with intricate Adinkra symbols. Traditional craftsmanship meets modern style.',
    image: '/images/brown-adinkra-kaftan.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Unisex Divine Fits']
  },
  {
    id: 13,
    name: 'Covenant Black Joggers',
    price: 26000,
    story: 'Comfortable black joggers with covenant styling. Perfect for casual comfort and streetwear.',
    image: '/images/covenant-black-joggers.jpg',
    gender: 'Unisex',
    products: ['Palazzo casual trousers'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits']
  },
  {
    id: 14,
    name: 'Covenant Black Pants',
    price: 27000,
    story: 'Sleek black pants with covenant details. Versatile for both formal and casual occasions.',
    image: '/images/covenant-black-pants.jpg',
    gender: 'Unisex',
    products: ['Palazzo casual trousers'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits']
  },
  {
    id: 15,
    name: 'Covenant White Shirt',
    price: 23000,
    story: 'Crisp white shirt from the Covenant collection. Clean lines with symbolic detailing.',
    image: '/images/covenant-white-shirt.jpg',
    gender: 'Unisex',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits']
  },
  {
    id: 16,
    name: 'Gangan Denim',
    price: 29000,
    story: 'Unique denim piece from the Gangan collection. Contemporary African fashion with durability.',
    image: '/images/gangan-denim.jpg',
    gender: 'Unisex',
    products: ['Palazzo casual trousers'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Limited Drop Series']
  },
  {
    id: 17,
    name: 'Guardian Blue Shorts',
    price: 20000,
    story: 'Comfortable blue shorts from the Guardian series. Perfect for warm weather and casual outings.',
    image: '/images/guardian-blue-shorts.jpg',
    gender: 'Unisex',
    products: ['Palazzo casual trousers'],
    whatsapp: '+2348168279958',
    categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits']
  },
  {
    id: 18,
    name: 'Indigo Path Black Shirt',
    price: 25000,
    story: 'Mystical black shirt from the Indigo Path collection. Journey-inspired design for the modern explorer.',
    image: '/images/indigo-path-black-shirt.jpg',
    gender: 'Unisex',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Limited Drop Series', 'Unisex Divine Fits']
  },
  {
    id: 19,
    name: 'Indigo Path White Kaftan',
    price: 33000,
    story: 'Elegant white kaftan from the Indigo Path collection. Spiritual journey meets elegant design.',
    image: '/images/indigo-path-white-kaftan.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Unisex Divine Fits']
  },
  {
    id: 20,
    name: 'Covenant Symbols Collection',
    price: 38000,
    story: 'Special piece featuring the complete Covenant symbols. A collector\'s item and statement piece.',
    image: '/images/covenant-symbols.jpg',
    gender: 'Unisex',
    products: ['Shirts'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Limited Drop Series', 'The Archive Pieces']
  },
  {
    id: 21,
    name: 'Guardian Blue Fabric',
    price: 42000,
    story: 'Premium blue fabric piece from the Guardian collection. Exclusive material with protective symbolism.',
    image: '/images/guardian-blue-fabric.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'Limited Drop Series']
  },
  {
    id: 22,
    name: 'Bridge Between Worlds',
    price: 58000,
    story: 'Exclusive design connecting traditional and contemporary. A bridge between heritage and modern fashion.',
    image: '/images/bridge-between-worlds.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'The Archive Pieces', 'Limited Drop Series']
  },
  {
    id: 23,
    name: 'Guardian of Earth',
    price: 52000,
    story: 'Majestic piece celebrating our connection to earth. Guardian collection\'s signature design.',
    image: '/images/guardian-of-earth.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'The Archive Pieces', 'Limited Drop Series']
  },
  {
    id: 24,
    name: 'The Covenant of Symbols',
    price: 60000,
    story: 'Ultimate piece from the Covenant collection. Complete symbolic representation in premium fabric.',
    image: '/images/the-convenant-of-symbols.jpg',
    gender: 'Unisex',
    products: ['Kaftan'],
    whatsapp: '+2348168279958',
    categories: ['The Sacred Fabrics', 'The Archive Pieces', 'The Capsule Editions']
  }
];

app.get('/api/fabrics', (req, res) => {
  res.json(fabrics);
});

app.get('/api/fabrics/:id', (req, res) => {
  const fabric = fabrics.find(f => f.id === parseInt(req.params.id));
  if (fabric) res.json(fabric);
  else res.status(404).json({ error: 'Not found' });
});

app.post('/api/fabrics', (req, res) => {
  const { name, story, image, products, category, price } = req.body;
  const id = fabrics.length + 1;
  const newFabric = { id, name, story, image, products, category, price };
  fabrics.push(newFabric);
  res.status(201).json(newFabric);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', productsCount: fabrics.length });
});

app.get('/api/fabrics/:id/qrcode', (req, res) => {
  const fabricId = req.params.id;
  const url = `https://moonlightclothings.com/fabric/${fabricId}`;
  res.json({ qrUrl: url });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Moonlight backend running on port ${PORT}`);
  console.log(`Loaded ${fabrics.length} products`);
});

// ============ AUTHENTICATION ENDPOINTS ============

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'moonlight-secret', 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'moonlight-secret', 
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, address },
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ============ NEWSLETTER ENDPOINTS ============

// Subscribe to newsletter
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.active) {
        return res.status(400).json({ error: 'Email already subscribed' });
      } else {
        // Reactivate subscription
        existing.active = true;
        await existing.save();
        return res.json({ message: 'Subscription reactivated successfully!' });
      }
    }

    // Create new subscription
    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter!',
      email: subscription.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Subscription failed', details: error.message });
  }
});

// Get all newsletter subscribers (admin only)
app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ active: true }).sort({ subscribedAt: -1 });
    res.json({ 
      count: subscribers.length,
      subscribers 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// Unsubscribe from newsletter
app.post('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscription = await Newsletter.findOne({ email });
    
    if (!subscription) {
      return res.status(404).json({ error: 'Email not found' });
    }

    subscription.active = false;
    await subscription.save();

    res.json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    res.status(500).json({ error: 'Unsubscribe failed' });
  }
});

// ============ REVIEWS ENDPOINTS ============

// Submit a review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, email, location, rating, reviewText, productName } = req.body;

    if (!name || !email || !reviewText || !rating) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    if (reviewText.length < 20) {
      return res.status(400).json({ error: 'Review must be at least 20 characters long' });
    }

    const review = new Review({
      name,
      email,
      location,
      rating,
      reviewText,
      productName,
      status: 'pending'
    });

    await review.save();

    res.status(201).json({ 
      message: 'Review submitted successfully! It will be published after approval.',
      review: {
        id: review._id,
        name: review.name,
        rating: review.rating,
        reviewText: review.reviewText,
        createdAt: review.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review', details: error.message });
  }
});

// Get approved reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .select('-email'); // Don't expose emails publicly
    
    res.json({ 
      count: reviews.length,
      reviews 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get all reviews (including pending - admin only)
app.get('/api/reviews/all', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ 
      count: reviews.length,
      reviews 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Approve/Reject review (admin only)
app.patch('/api/reviews/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review status updated', review });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review status' });
  }
});

// ============ ORDERS ENDPOINTS ============

// Create order
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { items, customerInfo, subtotal, tax, shipping, total, paymentMethod, notes } = req.body;

    // Generate order number
    const orderNumber = `ML${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const order = new Order({
      userId: req.userId,
      orderNumber,
      items,
      customerInfo,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      notes
    });

    await order.save();

    // Add order to user's orders
    await User.findByIdAndUpdate(req.userId, {
      $push: { orders: order._id }
    });

    res.status(201).json({ 
      message: 'Order created successfully',
      order: {
        orderNumber: order.orderNumber,
        total: order.total,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

// Get user's orders
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ 
      count: orders.length,
      orders 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get specific order
app.get('/api/orders/:orderNumber', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderNumber: req.params.orderNumber,
      userId: req.userId 
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status (admin)
app.patch('/api/orders/:orderNumber/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    updateData.updatedAt = new Date();

    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      updateData,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ============ MIDDLEWARE ============

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'moonlight-secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    next();
  });
}


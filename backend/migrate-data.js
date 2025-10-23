// Data Migration Script - Run this to transfer localStorage data to MongoDB
// This should be run BEFORE deploying to production

import mongoose from 'mongoose';
import User from './models/User.js';
import Review from './models/Review.js';
import Order from './models/Order.js';
import Newsletter from './models/Newsletter.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moonlight-clothing');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Migrate Users
async function migrateUsers(usersData) {
  try {
    const users = JSON.parse(usersData);
    console.log(`\n📤 Migrating ${users.length} users...`);
    
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        // Note: Passwords are stored as plain text in localStorage
        // They will be re-hashed by the User model's pre-save hook
        const user = new User({
          name: userData.name,
          email: userData.email,
          password: userData.password, // Will be hashed automatically
          phone: userData.phone || '',
          address: userData.address || {}
        });
        await user.save();
        console.log(`  ✓ Migrated user: ${userData.email}`);
      } else {
        console.log(`  ⊘ User already exists: ${userData.email}`);
      }
    }
    console.log('✅ Users migration completed');
  } catch (error) {
    console.error('❌ Error migrating users:', error.message);
  }
}

// Migrate Reviews
async function migrateReviews(reviewsData) {
  try {
    const reviews = JSON.parse(reviewsData);
    console.log(`\n📤 Migrating ${reviews.length} reviews...`);
    
    for (const reviewData of reviews) {
      const review = new Review({
        name: reviewData.name,
        email: reviewData.email,
        location: reviewData.location,
        rating: reviewData.rating,
        reviewText: reviewData.reviewText,
        productName: reviewData.productName,
        status: reviewData.status || 'pending',
        createdAt: reviewData.date ? new Date(reviewData.date) : new Date()
      });
      await review.save();
      console.log(`  ✓ Migrated review from: ${reviewData.name}`);
    }
    console.log('✅ Reviews migration completed');
  } catch (error) {
    console.error('❌ Error migrating reviews:', error.message);
  }
}

// Migrate Orders
async function migrateOrders(ordersData) {
  try {
    const orders = JSON.parse(ordersData);
    console.log(`\n📤 Migrating ${orders.length} orders...`);
    
    for (const orderData of orders) {
      // Find user by email
      const user = await User.findOne({ email: orderData.customerInfo?.email });
      
      if (!user) {
        console.log(`  ⚠ No user found for order ${orderData.orderNumber}, skipping...`);
        continue;
      }

      const order = new Order({
        userId: user._id,
        orderNumber: orderData.orderNumber,
        customerInfo: orderData.customerInfo,
        items: orderData.items,
        subtotal: orderData.subtotal,
        tax: orderData.tax || 0,
        shipping: orderData.shipping || 0,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus || 'pending',
        orderStatus: orderData.orderStatus || 'pending',
        notes: orderData.notes,
        createdAt: orderData.createdAt ? new Date(orderData.createdAt) : new Date()
      });
      
      await order.save();
      
      // Add order to user's orders array
      await User.findByIdAndUpdate(user._id, {
        $push: { orders: order._id }
      });
      
      console.log(`  ✓ Migrated order: ${orderData.orderNumber}`);
    }
    console.log('✅ Orders migration completed');
  } catch (error) {
    console.error('❌ Error migrating orders:', error.message);
  }
}

// Main migration function
async function runMigration() {
  console.log('🚀 Starting data migration from localStorage to MongoDB...\n');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  // Instructions
  console.log('INSTRUCTIONS:');
  console.log('1. Open your local website in the browser');
  console.log('2. Open browser Developer Tools (F12)');
  console.log('3. Go to Console tab');
  console.log('4. Run this command:');
  console.log('\n');
  console.log('   const exportData = {');
  console.log('     users: localStorage.getItem("moonlight-users"),');
  console.log('     reviews: localStorage.getItem("moonlight-reviews"),');
  console.log('     orders: localStorage.getItem("moonlight-orders")');
  console.log('   };');
  console.log('   console.log(JSON.stringify(exportData, null, 2));');
  console.log('\n');
  console.log('5. Copy the output');
  console.log('6. Paste it in the DATA_TO_MIGRATE object below (line 130)');
  console.log('7. Uncomment the migration calls (lines 142-144)');
  console.log('8. Run: node backend/migrate-data.js');
  console.log('\n═══════════════════════════════════════════════════════════\n');
  
  // Connect to database
  await connectDB();
  
  // PASTE YOUR EXPORTED DATA HERE
  const DATA_TO_MIGRATE = {
    users: null,      // Paste exported users data here
    reviews: null,    // Paste exported reviews data here
    orders: null      // Paste exported orders data here
  };
  
  // Uncomment these lines after pasting your data
  // if (DATA_TO_MIGRATE.users) await migrateUsers(DATA_TO_MIGRATE.users);
  // if (DATA_TO_MIGRATE.reviews) await migrateReviews(DATA_TO_MIGRATE.reviews);
  // if (DATA_TO_MIGRATE.orders) await migrateOrders(DATA_TO_MIGRATE.orders);
  
  console.log('\n✅ Migration process completed!');
  console.log('\nNext steps:');
  console.log('1. Verify data in MongoDB');
  console.log('2. Test the website with migrated data');
  console.log('3. Deploy to production');
  console.log('\n');
  
  await mongoose.disconnect();
  process.exit(0);
}

// Run migration
runMigration().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
});

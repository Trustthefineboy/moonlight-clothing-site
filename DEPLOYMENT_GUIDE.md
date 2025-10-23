# Moonlight Clothings - Complete Deployment Guide

## Important Information About Data Persistence

### Current Setup (Development)
Your website currently stores data in two places:
1. **Browser LocalStorage** (temporary, client-side only)
2. **MongoDB Database** (permanent, when backend is running)

### What Happens When You Deploy?

When you buy a domain and make your website live, ALL your current data (accounts, orders, reviews, wishlist) stored in **localStorage will NOT transfer** to the live site. Here's why and how to fix it:

## Data Storage Locations

### 1. User Accounts
- **Current**: Stored in browser localStorage
- **After Deployment**: Will be stored in MongoDB database
- **Action Required**: You'll need to re-create your account on the live site OR migrate data before deployment

### 2. Reviews
- **Current**: Submissions go to MongoDB (if backend running) or localStorage (fallback)
- **After Deployment**: All reviews will be in MongoDB
- **Action Required**: Export localStorage reviews and import to MongoDB before going live

### 3. Newsletter Subscriptions
- **Current**: Saved to MongoDB database
- **After Deployment**: Will persist if you use the same database
- **Action Required**: None (if using same database)

### 4. Orders
- **Current**: Stored in localStorage
- **After Deployment**: Will be stored in MongoDB
- **Action Required**: Export orders from localStorage before deployment

### 5. Wishlist
- **Current**: Stored in localStorage per user
- **After Deployment**: Will be stored in MongoDB with user accounts
- **Action Required**: Users will need to re-add items to wishlist

## How to Prepare for Deployment

### Step 1: Install MongoDB
You have two options:

#### Option A: Use MongoDB Atlas (Cloud - Recommended for Production)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Update `backend/.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moonlight-clothing
   ```

#### Option B: Use Local MongoDB (Development Only)
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install MongoDB on your computer
3. Start MongoDB service
4. Connection string will be: `mongodb://localhost:27017/moonlight-clothing`

### Step 2: Install Backend Dependencies
```powershell
cd backend
npm install
```

This will install:
- `mongoose` - MongoDB database driver
- `bcryptjs` - Password hashing for security
- `jsonwebtoken` - User authentication tokens
- `dotenv` - Environment variable management
- `express` - Web server framework
- `cors` - Cross-origin resource sharing

### Step 3: Start the Backend Server
```powershell
cd backend
npm start
```

The backend server will run on `http://localhost:3001`

### Step 4: Export Current Data (IMPORTANT!)

Before deploying, run this in your browser console while on your local site:

```javascript
// Export all localStorage data
const exportData = {
  users: localStorage.getItem('moonlight-users'),
  reviews: localStorage.getItem('moonlight-reviews'),
  orders: localStorage.getItem('moonlight-orders'),
  currentUser: localStorage.getItem('moonlight-current-user')
};

console.log(JSON.stringify(exportData, null, 2));
// Copy this output and save it to a file
```

### Step 5: Import Data to MongoDB

After setting up MongoDB, you can import your data using a migration script.

## Deployment Checklist

### Before Going Live:

- [ ] Set up MongoDB Atlas account
- [ ] Create production database
- [ ] Update `backend/.env` with production MongoDB URI
- [ ] Change JWT_SECRET to a secure random string
- [ ] Export all localStorage data
- [ ] Test newsletter subscription
- [ ] Test review submission
- [ ] Create a test account
- [ ] Place a test order
- [ ] Verify data persists after browser refresh

### Domain & Hosting:

- [ ] Buy domain name (e.g., moonlightclothings.com)
- [ ] Choose hosting provider (Vercel, Netlify, or VPS)
- [ ] Deploy frontend (React app)
- [ ] Deploy backend (Node.js server)
- [ ] Update API URLs in frontend from `localhost:3001` to your production backend URL
- [ ] Configure CORS to allow your domain
- [ ] Set up SSL certificate (HTTPS)

### Environment Variables:

Create a `backend/.env` file for production:
```
MONGODB_URI=your-production-mongodb-uri
PORT=3001
NODE_ENV=production
JWT_SECRET=your-very-secure-random-string-here
EMAIL_SERVICE=gmail
EMAIL_USER=your-business-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

## What Changes After Deployment?

### ✅ Will Work/Persist:
- User accounts (in MongoDB)
- Newsletter subscriptions (in MongoDB)
- Customer reviews (in MongoDB)
- Orders (in MongoDB)
- Product data (in backend code)
- User profiles and addresses (in MongoDB)

### ❌ Will NOT Transfer Automatically:
- Current localStorage accounts
- Current localStorage orders
- Current localStorage wishlist
- Browser cookies and sessions

## Testing Your Deployment

After deploying, test these features:

1. **Sign Up**: Create a new account
2. **Sign In**: Log in with the account
3. **Browse Products**: Add items to cart
4. **Place Order**: Complete a test purchase
5. **Submit Review**: Write and submit a review
6. **Newsletter**: Subscribe with an email
7. **Profile**: Update user profile information
8. **Wishlist**: Add items to wishlist
9. **Close Browser**: Close and reopen - verify you're still logged in
10. **Different Device**: Try accessing from another device

## API Endpoints Created

Your backend now has these endpoints:

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers (admin)
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

### Reviews
- `POST /api/reviews` - Submit a review
- `GET /api/reviews` - Get approved reviews
- `GET /api/reviews/all` - Get all reviews including pending (admin)
- `PATCH /api/reviews/:id/status` - Approve/reject review (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderNumber` - Get specific order
- `PATCH /api/orders/:orderNumber/status` - Update order status (admin)

### Products
- `GET /api/fabrics` - Get all products
- `GET /api/fabrics/:id` - Get single product
- `POST /api/fabrics` - Add new product (admin)

## Security Considerations

1. **Never commit `.env` file** to git (add to `.gitignore`)
2. **Change JWT_SECRET** before deployment
3. **Use HTTPS** in production
4. **Enable MongoDB authentication**
5. **Implement rate limiting** for API endpoints
6. **Sanitize user inputs**
7. **Keep dependencies updated**

## Support & Maintenance

After deployment:
- Monitor MongoDB database usage
- Backup database regularly
- Check server logs for errors
- Update dependencies monthly
- Monitor email deliveries (newsletter)
- Review and approve customer reviews regularly

## Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check backend server logs
3. Verify MongoDB connection
4. Ensure environment variables are set correctly
5. Test API endpoints using Postman or similar tool

---

**Remember**: Your current local data (accounts, orders, etc.) is only in your browser's localStorage. It will NOT automatically transfer to the live site. Export it before deploying!

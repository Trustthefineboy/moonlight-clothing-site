# Moonlight Clothing - E-Commerce Platform

An e-commerce web application for African-inspired fashion, built with React and Node.js. The platform handles everything from browsing products to processing payments through Paystack.

**Live Repository:** [github.com/Trustthefineboy/moonlight-clothing-site](https://github.com/Trustthefineboy/moonlight-clothing-site)

---

## About This Project

I built Moonlight Clothing to create a proper online shopping experience for African-inspired fashion. The site currently features 95 products, each with its own cultural story and proverb. Users can browse, filter products, add items to their cart, and checkout using Paystack for payment processing.

The project started as a way to practice full-stack development, but grew into a complete e-commerce solution with user authentication, order management, and even WhatsApp integration for customer communication.

---

## What I Used

**Frontend:**
- React.js with Vite for the build setup
- React Router for navigation between pages
- Context API to manage cart, wishlist, and user authentication state
- Plain CSS for styling (keeping it simple and responsive)

**Backend:**
- Node.js with Express for the API
- MongoDB for storing orders, user accounts, reviews, and newsletter subscriptions
- Mongoose to work with MongoDB more easily

**Third-Party Stuff:**
- Paystack API for handling payments
- WhatsApp Business API so customers can message directly
- QR code generation for sharing products

---

## Features

**Shopping Experience:**
- Browse 95+ products with filters for category, gender, culture, and color
- Search functionality that works in real-time
- Shopping cart that remembers your items
- Wishlist to save products for later
- Quick view modal to preview products without leaving the page
- Image zoom for checking out product details
- Works smoothly on mobile devices

**Checkout & Orders:**
- Multi-step checkout with form validation
- Payment processing through Paystack
- Order history page where users can track their purchases
- Review system for products
- Newsletter subscription
- Option to place orders directly through WhatsApp

**For Management:**
- Dashboard to see and manage orders
- User authentication (login/signup)
- Customers can leave reviews and ratings

**The Cultural Angle:**
- Every product has its own story and African proverb
- Products organized into themed collections (Sacred Fabrics, Divine Feminine, etc.)
- Special archive section for limited pieces
- NFT gallery page
- Memories section with brand photos and stories

---

## How It's Organized

```
moonlight-clothing-site/
├── backend/
│   ├── models/         # Database schemas for orders, users, reviews
│   ├── index.js        # Express server with all API routes
│   └── package.json
├── src/
│   ├── components/     # React components used across pages
│   ├── contexts/       # Context providers for global state
│   ├── data/           # Product catalog and configurations
│   ├── pages/          # Each page component (Home, Shop, Cart, etc.)
│   ├── utils/          # Helper functions
│   └── App.jsx         # Main component with routing setup
├── public/
│   ├── images/         # All product images
│   └── videos/         # Marketing videos
└── package.json
```

---

## Technical Decisions

**State Management:**
I set up 4 different Context providers instead of using Redux. Seemed like overkill to add Redux for this project size. The contexts handle cart operations, wishlist, user auth, toast notifications, and order processing.

**Performance:**
Added lazy loading for images so the page doesn't hang when loading 95 products. Also threw in skeleton loaders so users see something while content loads. Spent time optimizing how React re-renders components, especially in the product filtering logic.

**User Experience:**
Small touches like scroll-to-top buttons, toast notifications for feedback, and modal popups for quick views. Built everything mobile-first since most people shop on their phones anyway.

**Database:**
Designed MongoDB schemas that make sense for an e-commerce flow - orders link to users, products have reviews, etc. Tried to keep it normalized enough without making queries complicated.

**APIs:**
Built a proper RESTful API structure. Integrated Paystack for payments (their documentation is actually pretty good). Added WhatsApp API so customers can reach out directly. Also implemented QR code generation for sharing products.

---

## By The Numbers

- 95 products in the catalog
- 8 different themed collections
- 4 context providers managing state
- 20+ pages and routes
- Full CRUD operations on the backend
- Paystack payment integration working
- Fully responsive on mobile

---

## What I Learned

This project taught me a lot about building real applications, not just tutorials. 

On the frontend, I got comfortable with React's component patterns and learned when Context API makes more sense than prop drilling everywhere. Also figured out how to properly handle async operations and loading states.

Backend-wise, I learned how to structure an Express API properly, design database schemas that actually scale, and implement authentication that's secure. The Paystack integration was tricky at first but their sandbox environment helped.

The full-stack part was probably the most educational - connecting everything together, handling CORS properly, managing environment variables across different environments, and making sure errors are handled consistently on both ends.

Also got better with Git workflow, managing NPM dependencies, and optimizing Vite builds for production.  

---

## Running It Locally

You'll need Node.js (v16 or higher) and MongoDB installed.

**Setup:**

```bash
# Clone it
git clone https://github.com/Trustthefineboy/moonlight-clothing-site.git
cd moonlight-clothing-site

# Install dependencies for frontend
npm install

# Install dependencies for backend
cd backend
npm install
cd ..

# Set up your environment variables
# Create .env files in root and backend folders
# Add your MongoDB connection string and Paystack keys

# Run frontend (from root directory)
npm run dev

# Run backend (open another terminal)
cd backend
npm start
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`

---

## What's Next

Planning to add:
- Proper admin dashboard for managing products
- Analytics to track sales and user behavior
- Email notifications for orders
- Social media sharing
- Maybe a recommendation engine
- Multi-language support would be nice
- Turn it into a PWA
- Better inventory management

---

## Contact

Built by [@Trustthefineboy](https://github.com/Trustthefineboy)

Feel free to check out the code, fork it, or reach out if you have questions.


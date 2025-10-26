import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import Gallery from './pages/Gallery';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Checkout from './pages/Checkout';
import Reviews from './pages/Reviews';
import NFTGallery from './pages/NFTGallery';
import NFTDetail from './pages/NFTDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Fabric from './pages/Fabric';
import Admin from './pages/Admin';
import Memories from './pages/Memories';
import Layout from './components/Layout';
import { WishlistProvider } from './components/WishlistContext';
import { ToastProvider } from './components/ToastContext';
import { OrderProvider } from './components/OrderContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <OrderProvider>
          <WishlistProvider>
            <Router basename={import.meta.env.BASE_URL}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/memories" element={<Memories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:orderId" element={<OrderDetail />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/nft-gallery" element={<NFTGallery />} />
                  <Route path="/nft/:nftId" element={<NFTDetail />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/fabric" element={<Fabric />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </Layout>
            </Router>
          </WishlistProvider>
        </OrderProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;

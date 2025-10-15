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
import Layout from './components/Layout';
import { WishlistProvider } from './components/WishlistContext';
import { ToastProvider } from './components/ToastContext';
import { OrderProvider } from './components/OrderContext';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <OrderProvider>
        <WishlistProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<OrderDetail />} />
                <Route path="/reviews" element={<Reviews />} />
              </Routes>
            </Layout>
          </Router>
        </WishlistProvider>
      </OrderProvider>
    </ToastProvider>
  );
}

export default App;

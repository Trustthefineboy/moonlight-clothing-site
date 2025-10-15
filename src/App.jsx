import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Gallery from './pages/Gallery';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Layout from './components/Layout';
import { WishlistProvider } from './components/WishlistContext';
import { ToastProvider } from './components/ToastContext';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </Layout>
        </Router>
      </WishlistProvider>
    </ToastProvider>
  );
}

export default App;

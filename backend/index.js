import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Moonlight backend running on port ${PORT}`);
  console.log(`Loaded ${fabrics.length} products`);
});

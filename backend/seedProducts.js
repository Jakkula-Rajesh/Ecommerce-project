// backend/seedProducts.js
require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product'); // <-- correct relative path

const products = [
  { name: 'Classic White T-Shirt', description: 'Comfortable cotton tee', price: 499, image: 'https://picsum.photos/seed/tshirt1/400/400', category: 'Men', sizes: ['S','M','L','XL'], stock: 50 },
  { name: 'Blue Denim Jeans', description: 'Slim fit jeans', price: 1299, image: 'https://picsum.photos/seed/jeans1/400/400', category: 'Men', sizes: ['S','M','L','XL'], stock: 40 },
  { name: 'Red Hoodie', description: 'Cozy hoodie with fleece', price: 999, image: 'https://picsum.photos/seed/hoodie1/400/400', category: 'Women', sizes: ['S','M','L'], stock: 60 },
  { name: 'Black Leather Jacket', description: 'Stylish biker jacket', price: 4999, image: 'https://picsum.photos/seed/jacket1/400/400', category: 'Men', sizes: ['M','L','XL'], stock: 15 },
  { name: 'Floral Summer Dress', description: 'Lightweight summer dress', price: 1499, image: 'https://picsum.photos/seed/dress1/400/400', category: 'Women', sizes: ['S','M','L'], stock: 30 },
];

for (let i = 6; i <= 20; i++) {
  products.push({
    name: `Product ${i}`,
    description: `Description for product ${i}`,
    price: Math.floor(Math.random() * 3000) + 299,
    image: `https://picsum.photos/seed/product${i}/400/400`,
    category: i % 3 === 0 ? 'Kids' : (i % 2 === 0 ? 'Women' : 'Men'),
    sizes: ['S','M','L'],
    stock: Math.floor(Math.random() * 100)
  });
}

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products:', products.length);
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();

const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/voter/productRoutes"); 
const addToCartRoutes = require("./routes/voter/addToCartRoutes");
const authRoutes = require("./routes/voter/auth");
const cors = require('cors');
const { connectDB } = require("./config/database");

dotenv.config();

const app = express();
app.use(express.json()); 

app.use('/uploads', express.static('uploads'));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!!");
});
app.use("/api/voter/auth", authRoutes);

app.use('/api/products', productRoutes);

app.use("/api/cart", addToCartRoutes);

app.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});


const port = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = { app };


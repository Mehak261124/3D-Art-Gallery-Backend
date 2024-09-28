const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/voter/productController');
const { validateProduct } = require('../middleware/validationMiddleware');
const upload = require('../middleware/upload');

router.post('/products', upload.single('image'), validateProduct, addProduct);
router.put('/products/:id', upload.single('image'), validateProduct, updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getProduct);

module.exports = {router};



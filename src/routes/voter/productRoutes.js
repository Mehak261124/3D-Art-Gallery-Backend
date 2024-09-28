const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getProduct } = require('../../controllers/voter/productController');
const { validateProduct } = require('../../middleware/validationMiddleware');
const upload = require('../../middleware/upload');

router.get('/', getProduct);
router.post('/product', upload.single('image'), validateProduct, addProduct);
router.put('/product/:id', upload.single('image'), validateProduct, updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/product/:id', getProduct);

module.exports = router;



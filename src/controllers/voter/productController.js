const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? req.file.path : ''; // Handle the image URL from multer
    const product = await prisma.product.create({
      data: { name, description, price, imageUrl, category, stock }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? req.file.path : ''; // Update image URL if new file provided
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { name, description, price, imageUrl, category, stock }
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

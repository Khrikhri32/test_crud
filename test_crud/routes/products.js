const express = require('express');
const productService = require('../services/productService');
const router = express.Router();

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).send("Error al obtener los productos.");
    }
});

router.get('/:id', validateId, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productService.getProductById(id);
        if (product) {
            return res.json(product);
        }
        res.status(404).json({ error: 'Producto no encontrado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await productService.addProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número.' });
    }

    try {
        const updatedProduct = await productService.updateProduct(parseInt(id), req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
});

module.exports = router;

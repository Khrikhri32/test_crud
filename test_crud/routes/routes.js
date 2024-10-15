const express = require('express');
const router = express.Router();
const productsRoutes = require('./products'); 

router.get('/ping', (req, res) => {
  res.send('ping');
});

router.use('/productos', productsRoutes);

module.exports = router;

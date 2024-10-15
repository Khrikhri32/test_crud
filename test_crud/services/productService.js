const db = require('../db');
const { validateProduct } = require('./validators');

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM productos", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM productos WHERE id = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const addProduct = (product) => {
    const errors = validateProduct(product);
    if (errors.length > 0) {
        const errorMessage = errors.join(' ');
        const error = new Error(errorMessage);
        error.statusCode = 400;
        throw error;
    }
    return new Promise((resolve, reject) => {
        const query = db.prepare(`
          INSERT INTO productos (nombre, descripcion, precio, cantidad, fecha_creacion, fecha_actualizacion)
          VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `);

        query.run(product.nombre, product.descripcion || null, product.precio, product.cantidad, function (err) {
            if (err) {
                return reject(err);
            }
            resolve({ id: this.lastID, ...product });
        });

        query.finalize();
    });
};

async function updateProduct(id, product) {
    const errors = validateProduct(product);
    if (errors.length > 0) {
      const errorMessage = errors.join(' ');
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }
  
    return new Promise((resolve, reject) => {
      const query = db.prepare(`
        UPDATE productos 
        SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, fecha_actualizacion = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
  
      query.run(product.nombre, product.descripcion || null, product.precio, product.cantidad, id, function(err) {
        if (err) {
          return reject(err);
        }
        if (this.changes === 0) {
          return reject(new Error('Producto no encontrado'));
        }
        resolve({ id, ...product });
      });
  
      query.finalize();
    });
  }

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct
};

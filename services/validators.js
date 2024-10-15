function validateProduct(product) {
    const errors = [];
  
    if (!product.nombre || typeof product.nombre !== 'string' || product.nombre.length > 50) {
      errors.push('El nombre es obligatorio y no puede exceder 50 caracteres.');
    }
  
    if (product.descripcion && (typeof product.descripcion !== 'string' || product.descripcion.length > 255)) {
      errors.push('La descripción no puede exceder 255 caracteres.');
    }
  
    if (product.precio === undefined || isNaN(product.precio) || parseFloat(product.precio) <= 0) {
      errors.push('El precio debe ser un número decimal válido y mayor a 0.');
    }
  
    if (product.cantidad === undefined || !Number.isInteger(product.cantidad) || product.cantidad < 0) {
      errors.push('La cantidad debe ser un número entero válido y mayor o igual a 0.');
    }
  
    return errors;
  }
  
  module.exports = {
    validateProduct,
  };
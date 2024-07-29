export const addToCart = (product, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

  
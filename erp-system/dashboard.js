// dashboard - retrives how many products and orders added
document.addEventListener('DOMContentLoaded', () => {
    const totalProducts = document.getElementById('total-products');
    const totalOrders = document.getElementById('total-orders');
  
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    totalProducts.textContent = products.length;
    totalOrders.textContent = orders.length;
  });
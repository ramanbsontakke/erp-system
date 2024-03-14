const productsList = document.getElementById('products-list');
const addProductForm = document.getElementById('add-product-form');
const editProductModal = document.getElementById('edit-product-modal');
const editProductForm = document.getElementById('edit-product-form');

let products = JSON.parse(localStorage.getItem('products')) || [];

// Display products
function displayProducts() {
  productsList.innerHTML = '';
  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
        <button class="edit-product-button" data-id="${product.id}">Edit</button>
        <button class="delete-product-button" data-id="${product.id}">Delete</button>
      </td>
    `;
    productsList.appendChild(row);
  });
}
displayProducts();

// Add product
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = addProductForm.elements['name'].value;
  const price = addProductForm.elements['price'].value;
  const id = products.length + 1;
  const newProduct = { id, name, price };
  products.push(newProduct);
  addProductForm.reset();
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
});

// Edit product
productsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-product-button')) {
    const id = e.target.dataset.id;
    const editProductForm = document.getElementById('edit-product-form');
    const idInput = document.getElementById('edit-product-id');

    const product = products.find((product) => product.id === parseInt(id));
    console.log('Product:', product);
    if (editProductForm && editProductForm.elements) {
      if (idInput) {
        idInput.value = product.id; 
      } else {
        console.log('id element is undefined');
      }
      if (editProductForm.elements['name']) {
        editProductForm.elements['name'].value = product.name; 
      } else {
        console.log('name element is undefined');
      }
      if (editProductForm.elements['price']) {
        editProductForm.elements['price'].value = product.price; 
      } else {
        console.log('price element is undefined');
      }
      editProductModal.style.display = 'block'; 
    } else {
      console.log('editProductForm or its elements are undefined');
    }
  }
});

// Update product
editProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('edit-product-id').value;
  const name = editProductForm.elements['name'].value;
  const price = editProductForm.elements['price'].value;
  
  
  const productIndex = products.findIndex((product) => product.id === parseInt(id));


  if (productIndex !== -1) {
    products[productIndex].name = name;
    products[productIndex].price = price;
    localStorage.setItem('products', JSON.stringify(products)); 
    editProductModal.style.display = 'none'; 
    displayProducts(); 
    console.log('Product updated successfully:', products[productIndex]);
  } else {
    console.log('Product not found');
  }
});



// Delete product
productsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-product-button')) {
    const id = e.target.dataset.id;
    products = products.filter((product) => product.id !== parseInt(id));
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
  }
});
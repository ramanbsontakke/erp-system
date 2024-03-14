const ordersList = document.getElementById('orders-list');
const addOrderForm = document.getElementById('add-order-form');
const editOrderModal = document.getElementById('edit-order-modal');
const editOrderForm = document.getElementById('edit-order-form');

let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Display orders
function displayOrders() {
  ordersList.innerHTML = '';
  orders.forEach((order) => {
    const row =document.createElement('tr');
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.total}</td>
      <td>${order.status}</td>
      <td>
        <button class="edit-order-button" data-id="${order.id}">Edit</button>
      </td>
    `;
    ordersList.appendChild(row);
  });
}
displayOrders();

// Add order
addOrderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const customer = addOrderForm.elements['customer'].value;
  const total = addOrderForm.elements['total'].value;
  const status = addOrderForm.elements['status'].value;
  const id = orders.length + 1;
  const newOrder = { id, customer, total, status };
  orders.push(newOrder);
  addOrderForm.reset();
  localStorage.setItem('orders', JSON.stringify(orders));
  displayOrders();
});

// Edit order
ordersList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-order-button')) {
    const id = e.target.dataset.id;
    const order = orders.find((order) => order.id === parseInt(id));
    if (order) {
      const editOrderIdInput = document.getElementById('edit-order-id');
      if (editOrderIdInput) {
        editOrderIdInput.value = order.id; 
      }
      const editOrderForm = document.getElementById('edit-order-form');
      if (editOrderForm) {
        if (editOrderForm.elements['customer']) {
          editOrderForm.elements['customer'].value = order.customer;
        }
        if (editOrderForm.elements['total']) {
          editOrderForm.elements['total'].value = order.total;
        }
        if (editOrderForm.elements['status']) {
          editOrderForm.elements['status'].value = order.status;
        }
      }
      editOrderModal.style.display = 'block';
    }
  }
});


// Updating order
editOrderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const idInput = document.getElementById('edit-order-id'); 
  const customerInput = editOrderForm.elements['customer'];
  const totalInput = editOrderForm.elements['total'];
  const statusInput = editOrderForm.elements['status'];

  console.log('ID Input:', idInput);
  console.log('Customer Input:', customerInput);
  console.log('Total Input:', totalInput);
  console.log('Status Input:', statusInput);

  const id = idInput ? idInput.value : null;
  const customer = customerInput ? customerInput.value : '';
  const total = totalInput ? parseFloat(totalInput.value) : null;
  const status = statusInput ? statusInput.value : '';

  try {
    if (id !== null && customer && total !== null && status) {
      const orderIndex = orders.findIndex((order) => order.id === parseInt(id));
      if (orderIndex !== -1) {
        orders[orderIndex].customer = customer;
        orders[orderIndex].total = total;
        orders[orderIndex].status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        editOrderModal.style.display = 'none';
        displayOrders();
        editOrderForm.reset(); 
        console.log('Order updated successfully:', orders[orderIndex]);
      } else {
        console.log('Order not found with ID:', id);
      }
    } else {
      console.log('Form data invalid or incomplete.');
    }
  } catch (error) {
    console.error('An error occurred during order update:', error);
  }
});

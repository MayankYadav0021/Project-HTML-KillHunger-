
const HomeButton = document.getElementById('HomeButton');
const ResevedButton = document.getElementById('ResevedButton'); 
const OrdersButton = document.getElementById('OrdersButton');

const loginFields = document.getElementById('loginFields'); 
const loginForm = document.getElementById('loginForm'); 

function showLoginFields() {
    if (loginFields && loginForm) {
        loginFields.style.display = 'block';
        loginForm.style.display = 'block';
    }
}

HomeButton.addEventListener('click', () => {
    showLoginFields();
    window.location.href = "homeEmp.html";
});

ResevedButton.addEventListener('click', () => {
    showLoginFields();
    window.location.href = "Reserved.html"; 
});

OrdersButton.addEventListener('click', () => {
    showLoginFields();
    window.location.href = "ordered.html"; 
});
fetch('ordered.json')
    .then(response => response.json())
    .then(data => {
        const ordersTable = document.querySelector('.orders-table');
        
        data.orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            
            orderItem.innerHTML = `
                <span>${order.tableNo}</span>
                <span>${order.specialRequest}</span>
                <span>${order.orderedItems}</span>
                <span>${order.amount}</span>
                <span class="status ${order.status.toLowerCase()}">${order.status}</span>
            `;
            
            ordersTable.appendChild(orderItem);
        });
    })
    .catch(error => console.error('Error fetching orders:', error));

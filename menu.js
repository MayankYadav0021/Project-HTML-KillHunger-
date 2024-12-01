const HomeButton = document.getElementById('HomeButton');
const MenuButton = document.getElementById('MenuButton');
const ReservationButton = document.getElementById('ResevationButton');
const ContactButton = document.getElementById('ContactButton');
const cartSummary = document.getElementById('cart-summary');
const cartItemsList = document.getElementById('cart-items');
const placeOrderButton = document.getElementById('place-order');
const resetCartButton = document.getElementById('reset-cart');
const menuGrid = document.getElementById('menuGrid');

let cart = [];

// Fetch menu data from JSON
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        const menuItems = data.menu;
        menuItems.forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.classList.add('menu-item');
            
            menuItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price}</span>
                <button class="add-to-cart">Add to Cart</button>
            `;
            
            menuGrid.appendChild(menuItemDiv);

            const addToCartButton = menuItemDiv.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                cart.push({ name: item.name, price: item.price });
                updateCartSummary();
            });
        });
    })
    .catch(error => console.error('Error fetching menu:', error));

// Save Cart to LocalStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Summary
function updateCartSummary() {
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(li);
    });

    cartSummary.style.display = cart.length > 0 ? 'block' : 'none';
    placeOrderButton.style.display = cart.length > 0 ? 'block' : 'none';
    resetCartButton.style.display = cart.length > 0 ? 'block' : 'none';

    // Save to LocalStorage
    saveCartToLocalStorage();
}

// Place Order
placeOrderButton.addEventListener('click', () => {
    window.location.href = "orderplc.html";
});

// Reset Cart
resetCartButton.addEventListener('click', () => {
    cart = [];
    updateCartSummary();
});

// Navigation Buttons
HomeButton.addEventListener('click', () => {
    window.location.href = "homeCus.html";
});

MenuButton.addEventListener('click', () => {
    window.location.href = "menu.html";
});

ReservationButton.addEventListener('click', () => {
    window.location.href = "reservation.html";
});

ContactButton.addEventListener('click', () => {
    window.location.href = "contact.html";
});

fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Logs "Hello from Node.js!"
    })
    .catch(error => console.error('Error fetching data:', error));

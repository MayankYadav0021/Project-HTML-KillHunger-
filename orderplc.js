const cartDetails = document.getElementById('cart-details');
const totalPriceElement = document.getElementById('total-price');
const orderForm = document.getElementById('order-form');

// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Populate cart details
function populateCart() {
    cartDetails.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartDetails.appendChild(li);

        // Calculate total price
        total += parseInt(item.price.replace('₹', ''), 10);
    });

    totalPriceElement.textContent = `${total}₹`;
}

populateCart();

// Handle order form submission
orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const customerDetails = {
        name: orderForm.name.value,
        email: orderForm.email.value,
        phone: orderForm.phone.value,
        address: orderForm.address.value,
        cart: cart,
        total: totalPriceElement.textContent
    };

    console.log('Order Details:', customerDetails);
    alert('Order placed successfully!');

    // Clear cart and redirect to home
    localStorage.removeItem('cart');
    window.location.href = "homeCus.html";
});

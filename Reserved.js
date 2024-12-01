const HomeButton = document.getElementById('HomeButton');
const OrdersButton = document.getElementById('OrdersButton');
const ReservedButton = document.getElementById('ReservedButton');

// Redirect functionality for header buttons
HomeButton.addEventListener('click', () => {
    window.location.href = "homeEmp.html";
});

OrdersButton.addEventListener('click', () => {
    window.location.href = "ordered.html";
});

ReservedButton.addEventListener('click', () => {
    window.location.href = "reserved.html";
});

// Fetch reserved seats data from JSON
fetch('Reserved.json')
    .then(response => response.json())
    .then(data => {
        const reservedTable = document.querySelector('.reserved-table');
        
        // Populate reserved seats
        data.reservations.forEach(reservation => {
            const reservedRow = document.createElement('div');
            reservedRow.classList.add('reserved-item');
            
            reservedRow.innerHTML = `
                <span>${reservation.tableNo}</span>
                <span>${reservation.reservedBy}</span>
                <span>${reservation.date}</span>
                <span>${reservation.time}</span>
                <span>${reservation.guests}</span>
                <span class="status ${reservation.status.toLowerCase()}">${reservation.status}</span>
            `;
            
            reservedTable.appendChild(reservedRow);
        });
    })
    .catch(error => console.error('Error fetching reserved seats:', error));

// Fetch the JSON data
fetch('reservation.json')
    .then(response => response.json())
    .then(data => {
        // Populate navigation buttons based on the JSON data
        const navigation = data.navigation;
        navigation.forEach(item => {
            const button = document.getElementById(item.buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    window.location.href = item.action;
                });
            }
        });

        // Populate the form fields based on the JSON data
        const formFields = data.formFields;
        const formElement = document.getElementById('reservationForm'); // Get the form element

        // Loop through the form fields and create input elements dynamically
        for (let field in formFields) {
            const fieldData = formFields[field];

            // Create label element
            const label = document.createElement('label');
            label.setAttribute('for', field);
            label.innerHTML = `<b>${fieldData.label}</b>`;

            let input;

            if (fieldData.type === 'select') {
                // If it's a select dropdown (for Table Number)
                input = document.createElement('select');
                input.setAttribute('id', field);
                input.setAttribute('name', field);
                if (fieldData.required) {
                    input.setAttribute('required', true);
                }

                // Populate the select dropdown with available table numbers
                fieldData.options.forEach(table => {
                    const option = document.createElement('option');
                    option.value = table;
                    option.textContent = `Table ${table}`;
                    input.appendChild(option);
                });
            } else if (fieldData.type === 'textarea') {
                input = document.createElement('textarea');
                input.setAttribute('rows', fieldData.rows);
            } else {
                // Create input elements (text, email, number, etc.)
                input = document.createElement('input');
                input.setAttribute('type', fieldData.type);
            }

            input.setAttribute('id', field);
            input.setAttribute('name', field);
            if (fieldData.required) {
                input.setAttribute('required', true);
            }
            if (fieldData.min) {
                input.setAttribute('min', fieldData.min);
            }

            // Append label and input to the form
            formElement.appendChild(label);
            formElement.appendChild(input);
            formElement.appendChild(document.createElement('br')); // For spacing
        }

        // Add submit button
        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.innerHTML = 'Reserve Table';
        formElement.appendChild(submitButton);

        // Handle form submission
        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form from submitting normally

            // Hide the form and show the thank you message
            formElement.style.display = 'none';
            const thankYouMessage = document.getElementById('thankYouMessage');
            thankYouMessage.style.display = 'block';

            // Set a timeout to hide the message after 3 seconds and redirect to homeCus.html
            setTimeout(() => {
                // Redirect to the homeCus.html page after 3 seconds
                window.location.href = 'homeCus.html';
            }, 3000); // 3 seconds delay
        });
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

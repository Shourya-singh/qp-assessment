//Using axios Library to test api programatically using JS
const axios = require('axios');

const url = 'http://localhost:3000/api/admin/items';

// Dummy grocery item
const groceryItemTest = {
    name: "Banana",
    price: 0.99,
    quantity: 50
};

// Send a POST request to the API endpoint with our dummy data
axios.post(url, groceryItemTest)
    .then(response => {
        // console log response
        console.log('New item added:', response.data);
    })
    .catch(error => {
        // error handling
        console.error('Error adding new item:', error.response.data);
    });

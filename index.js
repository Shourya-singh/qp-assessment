var express = require('express');
var app = express();
app.use(express.json());
var groceryItems = [];
var orders = [];
// Admin Endpoints
app.post('/api/admin/items', function (req, res) {
    var _a = req.body, name = _a.name, price = _a.price, quantity = _a.quantity;
    var id = groceryItems.length + 1;
    var newItem = { id: id, name: name, price: price, quantity: quantity };
    groceryItems.push(newItem);
    res.status(201).json(newItem);
});
app.get('/api/admin/items', function (req, res) {
    res.json(groceryItems);
});
app.delete('/api/admin/items/:id', function (req, res) {
    var id = parseInt(req.params.id);
    groceryItems = groceryItems.filter(function (item) { return item.id !== id; });
    res.sendStatus(204);
});
app.put('/api/admin/items/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, name = _a.name, price = _a.price, quantity = _a.quantity;
    var index = groceryItems.findIndex(function (item) { return item.id === id; });
    if (index !== -1) {
        if (name)
            groceryItems[index].name = name;
        if (price)
            groceryItems[index].price = price;
        if (quantity)
            groceryItems[index].quantity = quantity;
        res.json(groceryItems[index]);
    }
    else {
        res.sendStatus(404);
    }
});
app.patch('/api/admin/items/:id/inventory', function (req, res) {
    var id = parseInt(req.params.id);
    var quantity = req.body.quantity;
    var index = groceryItems.findIndex(function (item) { return item.id === id; });
    if (index !== -1) {
        groceryItems[index].quantity += quantity;
        res.json(groceryItems[index]);
    }
    else {
        res.sendStatus(404);
    }
});
// User Endpoints
app.get('/api/user/items', function (req, res) {
    res.json(groceryItems);
});
app.post('/api/user/orders', function (req, res) {
    var items = req.body.items;
    var orderId = orders.length + 1;
    var totalAmount = items.reduce(function (total, item) {
        var groceryItem = groceryItems.find(function (gItem) { return gItem.id === item.itemId; });
        if (groceryItem) {
            return total + groceryItem.price * item.quantity;
        }
        return total;
    }, 0);
    var order = { id: orderId, items: items, userId: 1, totalAmount: totalAmount };
    orders.push(order);
    res.status(201).json(order);
});
// Server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});

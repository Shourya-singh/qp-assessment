const express = require('express');
// Import the express module and types
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderItem {
  itemId: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  userId: number;
  totalAmount: number;
}

let groceryItems: GroceryItem[] = [];
let orders: Order[] = [];

// Admin Endpoints
app.post('/api/admin/items', (req:Request, res:Response) => {
  const { name, price, quantity } = req.body;
  const id = groceryItems.length + 1;
  const newItem: GroceryItem = { id, name, price, quantity };
  groceryItems.push(newItem);
  res.status(201).json(newItem);
});

app.get('/api/admin/items', (req:Request, res:Response) => {
  res.json(groceryItems);
});

app.delete('/api/admin/items/:id', (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  groceryItems = groceryItems.filter(item => item.id !== id);
  res.sendStatus(204);
});

app.put('/api/admin/items/:id', (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const { name, price, quantity } = req.body;

  const index = groceryItems.findIndex(item => item.id === id);
  if (index !== -1) {

    if (name) groceryItems[index].name = name;
    if (price) groceryItems[index].price = price;
    if (quantity) groceryItems[index].quantity = quantity;
    res.json(groceryItems[index]);

  } else {

    res.sendStatus(404);
  }
});

app.patch('/api/admin/items/:id/inventory', (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;

  const index = groceryItems.findIndex(item => item.id === id);
  if (index !== -1) {

    groceryItems[index].quantity += quantity;
    res.json(groceryItems[index]);

  } else {

    res.sendStatus(404);

  }
});

// User Endpoints
app.get('/api/user/items', (req:Request, res:Response) => {
  res.json(groceryItems);
});

app.post('/api/user/orders', (req:Request, res:Response) => {
  const { items } = req.body;
  const orderId = orders.length + 1;

  const totalAmount = items.reduce((total:number, item:any) => {
    const groceryItem = groceryItems.find(gItem => gItem.id === item.itemId);
    if (groceryItem) {

      return total + groceryItem.price * item.quantity;
    }
    return total;
  }, 0);

  
  const order: Order = { id: orderId, items, userId: 1, totalAmount };
  orders.push(order);
  res.status(201).json(order);
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

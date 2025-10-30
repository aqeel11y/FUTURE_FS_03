const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const products = require('./data/products.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// simple in-memory orders
let orders = [];

app.get('/api/products', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const category = (req.query.category || '').toLowerCase();
  let list = products;
  if (category) list = list.filter(p => p.category.toLowerCase() === category);
  if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

app.post('/api/orders', (req, res) => {
  const { cart, customer } = req.body;
  if (!cart || !customer) return res.status(400).json({ error: 'Missing fields' });
  const id = 'o_' + (orders.length + 1) + '_' + Date.now();
  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);
  const order = { id, cart, customer, total, createdAt: new Date().toISOString() };
  orders.push(order);
  return res.json({ ok: true, order });
});

app.get('/api/orders', (req, res) => {
  const email = (req.query.email || '').toLowerCase();
  if (email) return res.json(orders.filter(o => (o.customer.email || '').toLowerCase() === email));
  res.json(orders);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on', PORT));

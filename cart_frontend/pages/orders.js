import { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'

export default function Orders(){
  const [orders, setOrders] = useState([])

  useEffect(()=>{ fetchOrders() }, [])
  async function fetchOrders(){
    try {
      const res = await axios.get('http://localhost:4000/api/orders')
      setOrders(res.data)
    } catch(e) {
      console.error('Failed to load orders', e)
    }
  }

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        {orders.length === 0 && <div className="p-4 bg-white rounded">No orders yet.</div>}
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Order {o.id}</div>
                  <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="font-bold">Rs. {o.total}</div>
              </div>
              <div className="mt-2">
                {o.cart.map(it => <div key={it.id} className="text-sm">{it.title} x {it.quantity} — Rs. {it.price * it.quantity}</div>)}
              </div>
              <div className="mt-2 text-sm">Customer: {o.customer.name} — {o.customer.email}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

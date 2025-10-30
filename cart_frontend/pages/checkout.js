import { useState } from 'react'
import Header from '../components/Header'
import useStore from '../store/useStore'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Checkout(){
  const cart = useStore(s => s.cart)
  const clearCart = useStore(s => s.clearCart)
  const [form, setForm] = useState({ name: '', email: '', address: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const total = cart.reduce((s,i)=>s+i.price*i.quantity,0)

  async function submit(e){
    e.preventDefault(); setError('')
    if (!form.name || !form.email || !form.address) return setError('Fill all fields')
    setLoading(true)
    try {
      await axios.post('http://localhost:4000/api/orders', { cart, customer: form })
      clearCart()
      router.push('/orders')
    } catch(err) { setError('Failed to place order'); console.error(err) }
    setLoading(false)
  }

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form onSubmit={submit} className="p-4 bg-white rounded shadow">
            <label className="block mb-2">Name<input value={form.name} onChange={e=>setForm(f=>({ ...f, name: e.target.value }))} className="w-full p-2 border rounded"/></label>
            <label className="block mb-2">Email<input value={form.email} onChange={e=>setForm(f=>({ ...f, email: e.target.value }))} className="w-full p-2 border rounded"/></label>
            <label className="block mb-2">Address<textarea value={form.address} onChange={e=>setForm(f=>({ ...f, address: e.target.value }))} className="w-full p-2 border rounded"/></label>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Placing...' : `Pay Rs. ${total}`}</button>
          </form>

          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">Order summary</h3>
            <ul className="mt-2 space-y-2">
              {cart.map(i => (
                <li key={i.id} className="flex justify-between">
                  <div>{i.title} x {i.quantity}</div>
                  <div>Rs. {i.price * i.quantity}</div>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-bold">Total Rs. {total}</div>
          </div>
        </div>
      </main>
    </div>
  )
}

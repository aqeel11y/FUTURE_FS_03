import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import useStore from '../store/useStore'

export default function Home(){
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const addToCart = useStore(s => s.addToCart)

  useEffect(() => { fetchProducts() }, [])
  async function fetchProducts(){
    try {
      const res = await axios.get('http://localhost:4000/api/products');
      setProducts(res.data)
    } catch(e) {
      console.error('Failed to load products', e)
    }
  }

  const filtered = products.filter(p => {
    if (category && p.category !== category) return false
    if (!q) return true
    return p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase())
  })

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <div className="mb-4 flex gap-3 items-center">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products" className="flex-1 p-2 border rounded" />
          <select value={category} onChange={e=>setCategory(e.target.value)} className="p-2 border rounded">
            <option value="">All</option>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <ProductList items={filtered} onAdd={(p)=>addToCart(p)} />
      </main>
    </div>
  )
}

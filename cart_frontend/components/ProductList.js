import ProductCard from './ProductCard'

export default function ProductList({items, onAdd}){
  if (!items || items.length === 0) return <div>No products found.</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
    </div>
  )
}

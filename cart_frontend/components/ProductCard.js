export default function ProductCard({product, onAdd}){
  return (
    <div className="border rounded bg-white shadow-sm overflow-hidden">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
      <div className="p-3">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">Rs. {product.price}</div>
          <button onClick={() => onAdd(product)} className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
        </div>
      </div>
    </div>
  )
}

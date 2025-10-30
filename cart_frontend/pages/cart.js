import Header from '../components/Header'
import useStore from '../store/useStore'
import Link from 'next/link'

export default function Cart() {
  const cart = useStore(s => s.cart)
  const updateQuantity = useStore(s => s.updateQuantity)
  const removeFromCart = useStore(s => s.removeFromCart)

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 && (
          <div className="p-6 bg-white rounded shadow">
            Your cart is empty.{' '}
            <Link href="/" legacyBehavior>
              <a className="text-indigo-600 cursor-pointer">Shop now</a>
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="p-4 bg-white rounded shadow flex items-center gap-4">
              <img src={item.image} className="w-24 h-24 object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-600">Rs. {item.price}</div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 p-1 border rounded"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600">
                    Remove
                  </button>
                </div>
              </div>
              <div className="font-semibold">Rs. {item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Total</div>
              <div className="font-bold text-lg">Rs. {total}</div>
            </div>
            <Link href="/checkout" legacyBehavior>
              <a className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer">
                Proceed to Checkout
              </a>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}



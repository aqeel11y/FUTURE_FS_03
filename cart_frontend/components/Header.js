import Link from 'next/link'
import useStore from '../store/useStore'

export default function Header() {
  const cart = useStore(state => state.cart);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Home link with legacyBehavior */}
        <Link href="/" legacyBehavior>
          <a className="font-bold text-xl cursor-pointer">MiniEcom</a>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/orders" legacyBehavior>
            <a className="text-sm cursor-pointer">Orders</a>
          </Link>

          <Link href="/cart" legacyBehavior>
            <a className="px-3 py-2 bg-indigo-600 text-white rounded cursor-pointer">
              Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}



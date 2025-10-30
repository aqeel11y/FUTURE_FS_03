import { create } from 'zustand'; // ✅ Modern syntax


const useStore = create((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const cart = get().cart.slice();
    const idx = cart.findIndex(i => i.id === product.id);
    if (idx >= 0) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    set({ cart });
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  setCart: (cart) => { set({ cart }); localStorage.setItem('cart', JSON.stringify(cart)); },
  removeFromCart: (id) => {
    const cart = get().cart.filter(i => i.id !== id);
    set({ cart }); localStorage.setItem('cart', JSON.stringify(cart));
  },
  updateQuantity: (id, qty) => {
    const cart = get().cart.slice().map(i => i.id === id ? { ...i, quantity: qty } : i);
    set({ cart });
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  clearCart: () => { set({ cart: [] }); localStorage.removeItem('cart'); }
}))

// load cart from localStorage on first access
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('cart');
  if (stored) {
    try { useStore.setState({ cart: JSON.parse(stored) }); } catch(e) {}
  }
}

export default useStore

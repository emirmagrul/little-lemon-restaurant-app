import { useMemo, useState } from 'react';
import { dishes, formatMoney } from '../data/menuData';

const CATEGORY_OPTIONS = ['All', 'Starters', 'Mains', 'Desserts'];
const SORT_OPTIONS = [
  { value: 'none', label: 'Sort: None' },
  { value: 'low', label: 'Price: Low → High' },
  { value: 'high', label: 'Price: High → Low' },
];

function OrderOnlinePage() {
  const [cart, setCart] = useState({}); // { [id]: qty }
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('none');
  const [onlyCart, setOnlyCart] = useState(false);

  const add = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const remove = (id) => {
    setCart((prev) => {
      const current = prev[id] ?? 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const clearCart = () => setCart({});

  const cartItems = useMemo(() => {
    return dishes
      .filter((m) => cart[m.id])
      .map((m) => ({
        ...m,
        qty: cart[m.id],
        lineTotal: cart[m.id] * m.price,
      }));
  }, [cart]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.lineTotal, 0),
    [cartItems]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.qty, 0),
    [cartItems]
  );

  const isDefaultFilters =
    category === 'All' && query.trim() === '' && sort === 'none' && onlyCart === false;

  const clearFilters = () => {
    setCategory('All');
    setQuery('');
    setSort('none');
    setOnlyCart(false);
  };

  const filteredMenu = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = dishes;

    if (onlyCart) {
      list = list.filter((d) => (cart[d.id] ?? 0) > 0);
    }

    if (category !== 'All') {
      list = list.filter((d) => d.category === category);
    }

    if (q) {
      list = list.filter((d) => {
        const hay = `${d.name} ${d.description}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [category, query, sort, onlyCart, cart]);

  return (
    <section className="order-page" aria-label="Order Online">
      <header className="order-header">
        <div className="order-header-top">
          <div>
            <h1>Order Online</h1>
            <p>Pick your favorites and build your order in seconds.</p>
          </div>
          <div className="order-badge" aria-label="Cart item count">
            {itemCount} items
          </div>
        </div>
      </header>

      <div className="order-layout">
        <section className="order-menu" aria-label="Menu items">
          <div className="order-menu-top">
            <h2 className="order-section-title">Menu Items</h2>

            <div className="order-controls" aria-label="Order filters">
              <div className="order-search">
                <label className="sr-only" htmlFor="order-search">
                  Search menu
                </label>
                <input
                  id="order-search"
                  className="input"
                  type="text"
                  value={query}
                  placeholder="Search dishes…"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="order-chips" role="tablist" aria-label="Categories">
                {CATEGORY_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`chip ${category === c ? 'chip-active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="order-sort">
                <label className="sr-only" htmlFor="order-sort">
                  Sort
                </label>
                <select
                  id="order-sort"
                  className="select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={onlyCart}
                  onChange={(e) => setOnlyCart(e.target.checked)}
                />
                <span>Only show items in cart</span>
              </label>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={clearFilters}
                disabled={isDefaultFilters}
              >
                Clear filters
              </button>
            </div>

            <div className="results-row">
              <p className="results-count">{filteredMenu.length} results</p>
            </div>
          </div>

          {filteredMenu.length === 0 ? (
            <p className="empty-state">No dishes found. Try a different search 🙂</p>
          ) : (
            <div className="order-grid">
              {filteredMenu.map((item) => {
                const qty = cart[item.id] ?? 0;

                return (
                  <article className="card order-card" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="card-body">
                      <div className="card-title-row">
                        <h3>{item.name}</h3>
                        <span className="highlight-text">{formatMoney(item.price)}</span>
                      </div>

                      <p className="order-desc">{item.description}</p>

                      <div className="order-actions">
                        <button
                          className="btn"
                          type="button"
                          onClick={() => remove(item.id)}
                          disabled={qty === 0}
                        >
                          −
                        </button>

                        <span className="order-qty">{qty}</span>

                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => add(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <aside className="order-cart" aria-label="Cart summary">
          <h2 className="order-section-title">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="order-empty">Your cart is empty. Add something tasty 🙂</p>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((i) => (
                  <li key={i.id} className="cart-row">
                    <div className="cart-left">
                      <span className="cart-name">{i.name}</span>
                      <span className="cart-meta">
                        {i.qty} × {formatMoney(i.price)}
                      </span>
                    </div>
                    <span className="cart-right">{formatMoney(i.lineTotal)}</span>
                  </li>
                ))}
              </ul>

              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="cart-summary-row cart-total">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
              </div>

              <div className="cart-buttons">
                <button className="btn" type="button" onClick={clearCart}>
                  Clear
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => alert('Checkout coming soon!')}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

export default OrderOnlinePage;
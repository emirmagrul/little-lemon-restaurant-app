import { useMemo, useState } from 'react';
import { dishes, formatMoney } from '../data/menuData';

const CATEGORY_OPTIONS = ['All', 'Starters', 'Mains', 'Desserts'];
const SORT_OPTIONS = [
  { value: 'none', label: 'Sort: None' },
  { value: 'low', label: 'Price: Low → High' },
  { value: 'high', label: 'Price: High → Low' },
];

function MenuPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('none');

  const isDefault = category === 'All' && query.trim() === '' && sort === 'none';

  const clearFilters = () => {
    setCategory('All');
    setQuery('');
    setSort('none');
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = dishes;

    if (category !== 'All') list = list.filter((d) => d.category === category);

    if (q) {
      list = list.filter((d) => {
        const hay = `${d.name} ${d.description}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [category, query, sort]);

  return (
    <section className="menu-page" aria-label="Menu">
      <header className="menu-header">
        <h1>Menu</h1>
        <p>Explore our full Mediterranean menu.</p>
      </header>

      <div className="menu-controls" aria-label="Menu filters">
        <div className="menu-search">
          <label className="sr-only" htmlFor="menu-search">
            Search menu
          </label>
          <input
            id="menu-search"
            className="input"
            type="text"
            value={query}
            placeholder="Search dishes…"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="menu-filters">
          <div className="menu-chips" role="tablist" aria-label="Categories">
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

          <div className="menu-sort">
            <label className="sr-only" htmlFor="menu-sort">
              Sort
            </label>
            <select
              id="menu-sort"
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

          <button
            type="button"
            className="btn btn-ghost"
            onClick={clearFilters}
            disabled={isDefault}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="results-row">
        <p className="results-count">{filtered.length} results</p>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No dishes found. Try a different search 🙂</p>
      ) : (
        <div className="menu-grid">
          {filtered.map((dish) => (
            <article className="card" key={dish.id}>
              <img src={dish.image} alt={dish.name} />
              <div className="card-body">
                <div className="card-title-row">
                  <h3>{dish.name}</h3>
                  <span className="highlight-text">{formatMoney(dish.price)}</span>
                </div>
                <p>{dish.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MenuPage;
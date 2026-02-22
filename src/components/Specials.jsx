import { dishes, formatMoney } from '../data/menuData';

function Specials() {
  return (
    <section className="specials" aria-label="Specials">
      <div className="specials-header">
        <h2>This Week's Specials!</h2>
      </div>

      <div className="specials-grid">
        {dishes.map((dish) => (
          <article className="card" key={dish.id}>
            <img src={dish.image} alt={dish.name} />
            <div className="card-body">
              <div className="card-title-row">
                <h3>{dish.name}</h3>
                <span className="highlight-text">
                  {formatMoney(dish.price)}
                </span>
              </div>
              <p>{dish.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;
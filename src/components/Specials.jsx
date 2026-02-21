import specialsImg from '../assets/specials.jpg';
import popularImg from '../assets/popular.jpg';
import signaturesImg from '../assets/signatures.jpg';

const dishes = [
  {
    id: 1,
    name: 'Greek Salad',
    price: '$12.99',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: specialsImg,
  },
  {
    id: 2,
    name: 'Bruschetta',
    price: '$5.99',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    image: popularImg,
  },
  {
    id: 3,
    name: 'Lemon Dessert',
    price: '$5.00',
    description:
      'This comes straight from grandma\'s recipe book. Every last ingredient has been sourced and is as authentic as can be imagined.',
    image: signaturesImg,
  },
];

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
                <span className="highlight-text">{dish.price}</span>
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

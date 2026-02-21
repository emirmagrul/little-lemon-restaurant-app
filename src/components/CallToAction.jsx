import { Link } from 'react-router-dom';
import restaurantImg from '../assets/restaurant.jpg';

function CallToAction() {
  return (
    <section className="hero" aria-label="Hero banner">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2 className="subtitle">Chicago</h2>
        <p>
          We are a family-owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Link to="/booking" className="btn btn-primary" aria-label="On Click">Reserve a Table</Link>
      </div>
      <div className="hero-image">
        <img src={restaurantImg} alt="Restaurant interior" />
      </div>
    </section>
  );
}

export default CallToAction;

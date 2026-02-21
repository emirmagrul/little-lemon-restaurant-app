import restaurantImg from '../assets/restaurant.jpg';

function Chicago() {
  return (
    <section className="about" aria-label="About Little Lemon">
      <div className="about-text">
        <h2>Little Lemon</h2>
        <h3 className="subtitle">Chicago</h3>
        <p>
          Little Lemon is a charming neighborhood bistro that serves simple food
          and classic cocktails in a lively but casual environment. The restaurant
          features a locally-sourced menu with daily specials.
        </p>
        <p>
          Based in Chicago, Illinois, the restaurant was opened by two Italian
          brothers, Mario and Adrian, who moved to the United States to pursue
          their shared dream of owning a restaurant.
        </p>
      </div>
      <div className="about-image">
        <img src={restaurantImg} alt="Little Lemon restaurant" />
      </div>
    </section>
  );
}

export default Chicago;

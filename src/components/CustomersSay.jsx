const reviews = [
  {
    id: 1,
    name: 'Maria',
    rating: 5,
    text: 'Amazing food and fantastic service! The Greek salad is to die for.',
  },
  {
    id: 2,
    name: 'James',
    rating: 4,
    text: 'Great atmosphere, lovely Mediterranean dishes. Will definitely come back.',
  },
  {
    id: 3,
    name: 'Sofia',
    rating: 5,
    text: 'Best lemon dessert I have ever tasted. A hidden gem in Chicago!',
  },
  {
    id: 4,
    name: 'Liam',
    rating: 5,
    text: 'The bruschetta was incredible. Highly recommended for a date night!',
  },
];

function renderStars(count) {
  return '⭐'.repeat(count);
}

function CustomersSay() {
  return (
    <section className="testimonials" aria-label="Testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-grid">
        {reviews.map((review) => (
          <article className="testimonial-card" key={review.id}>
            <div className="testimonial-rating">{renderStars(review.rating)}</div>
            <p className="testimonial-text">"{review.text}"</p>
            <p className="testimonial-author">— {review.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CustomersSay;

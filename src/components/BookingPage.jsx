import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <section className="booking" aria-label="Booking">
      <h1>Reserve a Table</h1>
      <p>Book your table at Little Lemon and enjoy a wonderful dining experience.</p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
    </section>
  );
}

export default BookingPage;

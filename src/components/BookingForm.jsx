import { useState } from 'react';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');

  /* ---------- React validation ---------- */
  const today = new Date().toISOString().split('T')[0];

  const isDateValid = date !== '';
  const isTimeValid = time !== '';
  const isGuestsValid = guests >= 1 && guests <= 10;
  const isOccasionValid = occasion !== '';
  const isFormValid = isDateValid && isTimeValid && isGuestsValid && isOccasionValid;

  /* ---------- handlers ---------- */
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      submitForm({ date, time, guests, occasion });
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-label="Booking form">
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={handleDateChange}
        min={today}
        required
        aria-label="Choose date"
      />
      {!isDateValid && <p className="error-message" role="alert">Please choose a date.</p>}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        aria-label="Choose time"
      >
        <option value="">Select a time</option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {!isTimeValid && <p className="error-message" role="alert">Please select a time.</p>}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        min="1"
        max="10"
        required
        aria-label="Number of guests"
      />
      {!isGuestsValid && <p className="error-message" role="alert">Guests must be between 1 and 10.</p>}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        required
        aria-label="Occasion"
      >
        <option value="">Select an occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      {!isOccasionValid && <p className="error-message" role="alert">Please select an occasion.</p>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isFormValid}
        aria-label="On Click"
      >
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;

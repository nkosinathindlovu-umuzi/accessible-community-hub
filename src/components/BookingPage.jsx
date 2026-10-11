import BookingForm from "./BookingForm.jsx";

// The "Book a visit" page. It holds the form and a side box.

function BookingPage({ headingRef, selectedService, onBooked }) {
  return (
    <div>
      <h1 ref={headingRef} tabIndex={-1}>
        Book a visit
      </h1>

      {selectedService && (
        <p>
          You are booking: <strong>{selectedService.name}</strong> at {selectedService.branch}.
        </p>
      )}

      <div className="two-columns">
        <section aria-label="Booking form">
          <BookingForm selectedService={selectedService} onBooked={onBooked} />
        </section>

        <aside aria-labelledby="bring-heading">
          <h2 id="bring-heading">What to bring</h2>
          <ul>
            <li>Your ID or clinic card</li>
            <li>Any medicine you are taking</li>
            <li>Your child's Road to Health card, if it is a baby clinic visit</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default BookingPage;

// The first page people see.

function HomePage({ headingRef, onNavigate }) {
  return (
    <div>
      <section aria-labelledby="welcome-heading">
        <h1 id="welcome-heading" ref={headingRef} tabIndex={-1}>
          Sawubona! Book your clinic visit online
        </h1>
        <p>
          Skip the long queue. Choose a service, pick a branch near you and book a time
          that works for you. You can also see which nurse is on duty.
        </p>
        <div className="button-row">
          <button type="button" onClick={() => onNavigate("book")}>
            Book a visit
          </button>
          <button type="button" className="button-plain" onClick={() => onNavigate("services")}>
            Find a service
          </button>
        </div>
      </section>

      <aside aria-labelledby="notice-heading">
        <h2 id="notice-heading">Load-shedding notice</h2>
        <p>
          Opening times can change when there is load-shedding. Please check this page
          before you travel.
        </p>
      </aside>

      <section aria-labelledby="branches-heading">
        <h2 id="branches-heading">Our branches</h2>
        <div className="card-grid">
          <article aria-labelledby="scottsville-heading">
            <h3 id="scottsville-heading">Scottsville Branch</h3>
            <dl>
              <dt>Opening hours</dt>
              <dd>Monday to Saturday, 07:30 to 16:00</dd>
              <dt>Phone</dt>
              <dd>033 000 0000</dd>
            </dl>
          </article>
          <article aria-labelledby="edendale-heading">
            <h3 id="edendale-heading">Edendale Branch</h3>
            <dl>
              <dt>Opening hours</dt>
              <dd>Monday to Saturday, 07:30 to 16:00</dd>
              <dt>Phone</dt>
              <dd>033 000 0001</dd>
            </dl>
          </article>
          <article aria-labelledby="imbali-heading">
            <h3 id="imbali-heading">Imbali Branch</h3>
            <dl>
              <dt>Opening hours</dt>
              <dd>Monday to Saturday, 07:30 to 16:00</dd>
              <dt>Phone</dt>
              <dd>033 000 0002</dd>
            </dl>
          </article>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

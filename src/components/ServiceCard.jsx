// One service in the list. The button says which service it is for, so a
// screen reader user who jumps from button to button knows what each one does.

function ServiceCard({ service, onBook }) {
  const headingId = "service-" + service.id + "-heading";

  return (
    <article aria-labelledby={headingId}>
      <h3 id={headingId}>{service.name}</h3>
      <p>{service.description}</p>
      <dl>
        <dt>Branch</dt>
        <dd>{service.branch}</dd>
        <dt>Nurse on duty</dt>
        <dd>{service.nurse}</dd>
        <dt>Next free time</dt>
        <dd>{service.nextFree}</dd>
      </dl>
      <button type="button" onClick={() => onBook(service)}>
        Book {service.name}
      </button>
    </article>
  );
}

export default ServiceCard;

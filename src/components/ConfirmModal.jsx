import { useEffect, useRef } from "react";

// The popup that shows after a booking is done.
// What I had to think about:
//  - when it opens, focus must move INTO it (to the heading)
//  - Tab must stay inside it while it is open
//  - Escape must close it
//  - when it closes, focus must go back to where the person was

function ConfirmModal({ booking, onClose, onFindMore }) {
  const dialogRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // remember what had focus before the popup opened (the "Book my visit" button)
    const oldFocus = document.activeElement;

    // move focus into the popup
    headingRef.current.focus();

    // when the popup is removed, put focus back
    return () => {
      if (oldFocus && oldFocus.focus) {
        oldFocus.focus();
      }
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (e.key !== "Tab") return;

    // keep Tab going round inside the popup
    const buttons = dialogRef.current.querySelectorAll("button");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || active === headingRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        ref={dialogRef}
        onKeyDown={handleKeyDown}
      >
        <h2 id="modal-heading" tabIndex={-1} ref={headingRef}>
          Your visit is booked
        </h2>

        <dl>
          <dt>Service</dt>
          <dd>{booking.serviceName}</dd>
          <dt>Branch</dt>
          <dd>{booking.branch}</dd>
          <dt>Date</dt>
          <dd>{booking.visitDate}</dd>
          <dt>Name</dt>
          <dd>{booking.fullName}</dd>
          <dt>Cell number</dt>
          <dd>{booking.cellNumber}</dd>
        </dl>

        <p>Please arrive 10 minutes early and bring your ID or clinic card.</p>

        <div className="button-row">
          <button type="button" onClick={onClose}>
            Close
          </button>
          <button type="button" className="button-plain" onClick={onFindMore}>
            Find another service
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

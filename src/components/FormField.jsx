// One form field: the label, the input, the help text and the error message.
// I made this one component so I don't have to repeat the same code for every field.

function FormField({
  id,
  label,
  helpText,
  error,
  required = false,
  as = "input",
  options = [],
  inputRef,
  ...otherProps
}) {
  const helpId = id + "-help";
  const errorId = id + "-error";

  // The input is linked to the help text. When there is an error it is also
  // linked to the error, so the screen reader reads both.
  let describedBy = helpId;
  if (error) {
    describedBy = helpId + " " + errorId;
  }

  let control;

  if (as === "select") {
    control = (
      <select
        id={id}
        name={id}
        ref={inputRef}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : "false"}
        className={error ? "invalid" : ""}
        {...otherProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else if (as === "textarea") {
    control = (
      <textarea
        id={id}
        name={id}
        ref={inputRef}
        rows="4"
        required={required}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : "false"}
        className={error ? "invalid" : ""}
        {...otherProps}
      />
    );
  } else {
    control = (
      <input
        id={id}
        name={id}
        ref={inputRef}
        required={required}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : "false"}
        className={error ? "invalid" : ""}
        {...otherProps}
      />
    );
  }

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {/* the star is only for people who can see it, the screen reader gets "required" from the input */}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {control}
      <span id={helpId} className="help-text">
        {helpText}
      </span>
      {/* This paragraph is always on the page, even when it is empty.
          A live region must already be there before the text shows up,
          or some screen readers will not read it. */}
      <p id={errorId} className="error" aria-live="polite">
        {error ? "Error: " + error : ""}
      </p>
    </div>
  );
}

export default FormField;

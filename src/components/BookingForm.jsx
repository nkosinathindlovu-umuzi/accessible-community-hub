import { useState, useRef } from "react";
import FormField from "./FormField.jsx";
import { services, branches } from "../data/services.js";
import { checkField, checkAll, fieldOrder, formatDate } from "../utils/checkForm.js";

// The booking form. It checks each field when you leave it (blur), and it
// checks again as you type once a field has an error, so you see right away
// when you have fixed it.

const serviceOptions = [{ value: "", label: "Choose a service" }].concat(
  services.map((service) => ({ value: String(service.id), label: service.name }))
);

const branchOptions = [{ value: "", label: "Choose a branch" }].concat(
  branches.map((branch) => ({ value: branch, label: branch }))
);

function BookingForm({ selectedService, onBooked }) {
  // if the person came from the services list, fill in the service and branch for them
  const [values, setValues] = useState({
    service: selectedService ? String(selectedService.id) : "",
    branch: selectedService ? selectedService.branch : "",
    visitDate: "",
    fullName: "",
    cellNumber: "",
    reason: "",
    sms: true,
  });
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState("");

  // I keep a reference to each field so I can move focus to the first wrong one
  const fieldRefs = useRef({});

  // today's date, so the date picker does not let you pick the past
  const today = formatDate(new Date());

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setValues({ ...values, [name]: newValue });
    // clear the summary so it can be read out again if the form fails again
    setSummary("");

    // only re-check live if the field already has an error
    if (errors[name]) {
      setErrors({ ...errors, [name]: checkField(name, newValue) });
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    // reason and the SMS box are optional so there is nothing to check
    if (!fieldOrder.includes(name)) return;
    setErrors({ ...errors, [name]: checkField(name, value) });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = checkAll(values);
    setErrors(newErrors);

    const wrongFields = fieldOrder.filter((name) => newErrors[name]);

    if (wrongFields.length > 0) {
      // tell the screen reader how many problems there are
      const howMany = wrongFields.length === 1 ? "is 1 problem" : "are " + wrongFields.length + " problems";
      setSummary("There " + howMany + " with the form. Please fix the errors and try again.");

      // and move focus to the first wrong field so the person does not have to hunt for it
      fieldRefs.current[wrongFields[0]].focus();
      return;
    }

    // everything is fine, tell the page the booking is done
    const chosenService = services.find((service) => String(service.id) === values.service);
    onBooked({
      serviceName: chosenService.name,
      branch: values.branch,
      visitDate: values.visitDate,
      fullName: values.fullName.trim(),
      cellNumber: values.cellNumber.replace(/\s/g, ""),
    });

    // empty the form for the next booking
    setValues({
      service: "",
      branch: "",
      visitDate: "",
      fullName: "",
      cellNumber: "",
      reason: "",
      sms: true,
    });
    setErrors({});
    setSummary("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="form-heading">
      <h2 id="form-heading">Your details</h2>
      <p>Fields marked with a star (*) must be filled in.</p>

      {/* assertive, because the person needs to hear this straight after pressing the button */}
      <p className="form-summary" aria-live="assertive">
        {summary}
      </p>

      <FormField
        id="service"
        label="Service"
        as="select"
        options={serviceOptions}
        required
        helpText="The service you want to book."
        value={values.service}
        error={errors.service}
        onChange={handleChange}
        onBlur={handleBlur}
        inputRef={(el) => (fieldRefs.current.service = el)}
      />

      <FormField
        id="branch"
        label="Branch"
        as="select"
        options={branchOptions}
        required
        helpText="The clinic branch you will visit."
        value={values.branch}
        error={errors.branch}
        onChange={handleChange}
        onBlur={handleBlur}
        inputRef={(el) => (fieldRefs.current.branch = el)}
      />

      <FormField
        id="visitDate"
        label="Date you would like to come"
        type="date"
        min={today}
        required
        helpText="Pick a weekday or a Saturday. The clinic is closed on Sundays."
        value={values.visitDate}
        error={errors.visitDate}
        onChange={handleChange}
        onBlur={handleBlur}
        inputRef={(el) => (fieldRefs.current.visitDate = el)}
      />

      <FormField
        id="fullName"
        label="Full name"
        type="text"
        autoComplete="name"
        required
        helpText="Your name and surname, like on your ID or clinic card."
        value={values.fullName}
        error={errors.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        inputRef={(el) => (fieldRefs.current.fullName = el)}
      />

      <FormField
        id="cellNumber"
        label="Cell number"
        type="tel"
        autoComplete="tel"
        required
        helpText="10 digits, for example 0821234567. We use it to SMS your reminder."
        value={values.cellNumber}
        error={errors.cellNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        inputRef={(el) => (fieldRefs.current.cellNumber = el)}
      />

      <FormField
        id="reason"
        label="Reason for the visit (optional)"
        as="textarea"
        helpText="Keep it short. Do not put your ID number here."
        value={values.reason}
        onChange={handleChange}
      />

      <fieldset>
        <legend>Reminder</legend>
        <label className="checkbox-label">
          <input type="checkbox" name="sms" checked={values.sms} onChange={handleChange} />
          Please SMS me a reminder the day before
        </label>
      </fieldset>

      <button type="submit">Book my visit</button>
    </form>
  );
}

export default BookingForm;

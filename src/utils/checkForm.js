// Functions that check the booking form. I put them in their own file so
// the form component does not get too long and they are easy to test.

// Turns a date into text like 2026-10-19 (the format a date input uses).
// I used the local date on purpose, because toISOString() can give the wrong day.
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

// Checks one field and gives back an error message.
// If the field is fine it gives back an empty string.
export function checkField(name, value) {
  if (name === "service") {
    if (value === "") return "Please choose a service.";
  }

  if (name === "branch") {
    if (value === "") return "Please choose a branch.";
  }

  if (name === "visitDate") {
    if (value === "") return "Please choose a date.";

    // split "2026-10-19" into year, month and day
    const parts = value.split("-");
    const chosen = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosen < today) return "Please choose today or a date in the future.";
    if (chosen.getDay() === 0) return "The clinic is closed on Sundays. Please pick another day.";
  }

  if (name === "fullName") {
    const trimmed = value.trim();
    if (trimmed === "") return "Please type your full name.";
    if (!trimmed.includes(" ")) return "Please type your name and your surname.";
  }

  if (name === "cellNumber") {
    // take out any spaces first, so 082 123 4567 also works
    const digits = value.replace(/\s/g, "");
    if (digits === "") return "Please type your cell number.";
    if (!/^0\d{9}$/.test(digits)) {
      return "Your cell number must be 10 digits and start with 0, for example 0821234567.";
    }
  }

  return "";
}

// The fields that must be checked, in the same order they show on the page.
export const fieldOrder = ["service", "branch", "visitDate", "fullName", "cellNumber"];

// Checks every field and gives back an object of errors, like { fullName: "..." }
export function checkAll(values) {
  const errors = {};
  fieldOrder.forEach((name) => {
    errors[name] = checkField(name, values[name]);
  });
  return errors;
}

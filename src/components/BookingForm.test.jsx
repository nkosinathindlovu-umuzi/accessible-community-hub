import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import BookingForm from "./BookingForm.jsx";
import { formatDate } from "../utils/checkForm.js";

// gives back the date of the next Monday, in the same format as the date input
function nextMonday() {
  const date = new Date();
  const daysToAdd = (1 - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + daysToAdd);
  return formatDate(date);
}

describe("BookingForm", () => {
  test("every field has a label", () => {
    render(<BookingForm selectedService={null} onBooked={() => {}} />);

    expect(screen.getByLabelText(/^service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^branch/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date you would like/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cell number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reason for the visit/i)).toBeInTheDocument();
  });

  test("help text is linked to the field with aria-describedby", () => {
    render(<BookingForm selectedService={null} onBooked={() => {}} />);

    const cellField = screen.getByLabelText(/cell number/i);
    expect(cellField).toHaveAccessibleDescription(/10 digits, for example 0821234567/i);
  });

  test("an empty form shows errors, marks fields invalid and moves focus to the first one", async () => {
    const user = userEvent.setup();
    render(<BookingForm selectedService={null} onBooked={() => {}} />);

    await user.click(screen.getByRole("button", { name: /book my visit/i }));

    const serviceField = screen.getByLabelText(/^service/i);
    expect(serviceField).toHaveAttribute("aria-invalid", "true");
    expect(serviceField).toHaveFocus();
    expect(serviceField).toHaveAccessibleDescription(/please choose a service/i);

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/cell number/i)).toHaveAttribute("aria-invalid", "true");
  });

  test("the summary and the error messages are in live regions", async () => {
    const user = userEvent.setup();
    render(<BookingForm selectedService={null} onBooked={() => {}} />);

    await user.click(screen.getByRole("button", { name: /book my visit/i }));

    const summary = screen.getByText(/there are 5 problems/i);
    expect(summary).toHaveAttribute("aria-live", "assertive");

    const nameError = screen.getByText(/please type your full name/i);
    expect(nameError).toHaveAttribute("aria-live", "polite");
  });

  test("a field is checked when you leave it", async () => {
    const user = userEvent.setup();
    render(<BookingForm selectedService={null} onBooked={() => {}} />);

    const nameField = screen.getByLabelText(/full name/i);
    await user.click(nameField);
    await user.tab();

    expect(nameField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/please type your full name/i)).toBeInTheDocument();
  });

  test("the error goes away when the person fixes the field", async () => {
    const user = userEvent.setup();
    render(<BookingForm selectedService={null} onBooked={() => {}} />);

    const cellField = screen.getByLabelText(/cell number/i);
    await user.type(cellField, "123");
    await user.tab();
    expect(cellField).toHaveAttribute("aria-invalid", "true");

    await user.clear(cellField);
    await user.type(cellField, "0821234567");
    expect(cellField).toHaveAttribute("aria-invalid", "false");
  });

  test("a Sunday is not allowed", async () => {
    const user = userEvent.setup();
    render(<BookingForm selectedService={null} onBooked={() => {}} />);

    // find the next Sunday
    const date = new Date();
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7 || 7));

    const dateField = screen.getByLabelText(/date you would like/i);
    await user.type(dateField, formatDate(date));
    await user.tab();

    // the help text also says this, so I look for the one that starts with "Error"
    expect(screen.getByText(/^error: the clinic is closed on sundays/i)).toBeInTheDocument();
  });

  test("a filled-in form calls onBooked with the details", async () => {
    const user = userEvent.setup();
    const onBooked = vi.fn();
    render(<BookingForm selectedService={null} onBooked={onBooked} />);

    await user.selectOptions(screen.getByLabelText(/^service/i), "Blood pressure check");
    await user.selectOptions(screen.getByLabelText(/^branch/i), "Scottsville");
    await user.type(screen.getByLabelText(/date you would like/i), nextMonday());
    await user.type(screen.getByLabelText(/full name/i), "Thandeka Mkhize");
    await user.type(screen.getByLabelText(/cell number/i), "082 123 4567");
    await user.click(screen.getByRole("button", { name: /book my visit/i }));

    expect(onBooked).toHaveBeenCalledTimes(1);
    expect(onBooked.mock.calls[0][0].cellNumber).toBe("0821234567");
    expect(onBooked.mock.calls[0][0].serviceName).toBe("Blood pressure check");
  });

  test("a service from the list is already filled in", () => {
    const service = { id: 5, name: "Blood pressure check", branch: "Scottsville" };
    render(<BookingForm selectedService={service} onBooked={() => {}} />);

    expect(screen.getByLabelText(/^service/i)).toHaveValue("5");
    expect(screen.getByLabelText(/^branch/i)).toHaveValue("Scottsville");
  });

  test("has no accessibility problems when it first shows", async () => {
    const { container } = render(<BookingForm selectedService={null} onBooked={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  test("has no accessibility problems while it is showing errors", async () => {
    const user = userEvent.setup();
    const { container } = render(<BookingForm selectedService={null} onBooked={() => {}} />);

    await user.click(screen.getByRole("button", { name: /book my visit/i }));
    expect(await axe(container)).toHaveNoViolations();
  });
});

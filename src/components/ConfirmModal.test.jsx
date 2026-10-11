import { describe, test, expect } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import ConfirmModal from "./ConfirmModal.jsx";

const fakeBooking = {
  serviceName: "Blood pressure check",
  branch: "Scottsville",
  visitDate: "2026-10-19",
  fullName: "Thandeka Mkhize",
  cellNumber: "0821234567",
};

// a small page with a button that opens the popup, so I can test where focus goes
function TestPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open popup</button>
      {open && (
        <ConfirmModal booking={fakeBooking} onClose={() => setOpen(false)} onFindMore={() => setOpen(false)} />
      )}
    </div>
  );
}

describe("ConfirmModal", () => {
  test("focus moves into the popup when it opens", async () => {
    const user = userEvent.setup();
    render(<TestPage />);

    await user.click(screen.getByRole("button", { name: /open popup/i }));

    expect(screen.getByRole("heading", { name: /your visit is booked/i })).toHaveFocus();
  });

  test("it is a dialog with a name", async () => {
    const user = userEvent.setup();
    render(<TestPage />);
    await user.click(screen.getByRole("button", { name: /open popup/i }));

    const dialog = screen.getByRole("dialog", { name: /your visit is booked/i });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("Escape closes it and focus goes back to the button that opened it", async () => {
    const user = userEvent.setup();
    render(<TestPage />);
    const openButton = screen.getByRole("button", { name: /open popup/i });

    await user.click(openButton);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  });

  test("Tab goes round inside the popup and does not get out", async () => {
    const user = userEvent.setup();
    render(<TestPage />);
    await user.click(screen.getByRole("button", { name: /open popup/i }));

    const closeButton = screen.getByRole("button", { name: /^close$/i });
    const moreButton = screen.getByRole("button", { name: /find another service/i });

    await user.tab();
    expect(closeButton).toHaveFocus();
    await user.tab();
    expect(moreButton).toHaveFocus();
    // from the last button it goes back to the first one
    await user.tab();
    expect(closeButton).toHaveFocus();
    // and Shift+Tab goes the other way round
    await user.tab({ shift: true });
    expect(moreButton).toHaveFocus();
  });

  test("has no accessibility problems", async () => {
    const user = userEvent.setup();
    const { container } = render(<TestPage />);
    await user.click(screen.getByRole("button", { name: /open popup/i }));

    expect(await axe(container)).toHaveNoViolations();
  });
});

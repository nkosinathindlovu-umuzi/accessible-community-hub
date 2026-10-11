// This file runs before every test.
// It adds the extra checks (toBeInTheDocument, toHaveNoViolations and so on).
import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";

expect.extend(axeMatchers);

// axe tries to use a canvas when it checks colours, and jsdom does not have one.
// That only prints a long warning (it does not break anything), so I switch it off.
// The colours are checked for real with Lighthouse in the browser.
HTMLCanvasElement.prototype.getContext = () => null;

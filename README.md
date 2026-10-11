# Midlands Community Clinic Booking Portal

This is a booking website for a made-up clinic in Pietermaritzburg. I built it as a student project for ticket MD-2026-0143 from Marlowe Digital. The council wants a working prototype that people who use a screen reader, or only a keyboard, can use properly.

The clinic is not real. The branches (Scottsville, Edendale and Imbali), the nurses, the times and the phone numbers are all made up.

## What is in this repo

- wireframes: Part A. Three plain HTML pages, one CSS file, the persona and the WCAG matrix.
- src: Part B. The React app and its tests.
- test-results: my Lighthouse screenshots and my manual testing log.
- netlify.toml: the settings for putting the site online.
- README.md: this file. It also has the Part C write-up.

## How to run it

```bash
npm install
npm run dev
```

To run the tests or make the final version of the site:

```bash
npm test
npm run build
```

## Part A: Wireframes and planning

- Three pages made with plain HTML and CSS, with no JavaScript: a home page, a page to find a service, and a booking page. Each page uses header, nav, main, section, article, aside and footer.
- The persona is Thandeka. She is blind and uses NVDA with Chrome on a Windows laptop. The persona file says what goes wrong for her on normal websites.
- Every text colour is at least 4.5 to 1 against its background. The numbers are in the comments in main.css. The focus ring is 3px thick, blue, with a 2px gap.
- The WCAG matrix has 8 rules. For each one it says where it applies, how I build it and how I check it.

## Part B: The React app

- A booking form. Every field has a label and help text. Mistakes are shown in words under the field, and a screen reader reads them out.
- A list of clinic services that you can search and filter. The Filters button says if it is open or closed, and the type buttons say if they are switched on.
- Keyboard use: a skip link, a clear focus ring, focus that moves to the page heading when the page changes, and a booking popup that you can close with Escape.
- 33 tests, including accessibility checks with axe.

The code is in src. The components are in src/components, the services list is in src/data, and the form checking rules are in src/utils.

## Part C: My accessibility decisions

### 1. Three trade-offs

Keeping Tab inside the popup. After a booking, a popup shows the details. If Tab could leave the popup, a keyboard user would end up in the page behind it, which they can not see. So Tab goes round inside the popup, and the page behind it is switched off with the inert attribute. A trap can lock someone in, so Escape always closes the popup and there is a Close button. When it closes, focus goes back to the button that opened it. I wrote this by hand because the built-in dialog element was harder for me to test.

Speaking too much or too little. Screen readers read live regions out loud. The results count is polite, so it waits until the screen reader has finished talking, and so is each field error. Only the message after pressing Book my visit ("There are 2 problems") is assertive, because the person needs to hear it straight away. The cost is that the count changes on every letter typed in the search box. I did not add a delay, to keep the code simple.

Normal controls or fancy ones. I used the browser's own select boxes, date picker and checkboxes instead of building my own. The browser already makes them work with the keyboard and screen readers. The cost is that they look a bit different in each browser. Working properly matters more to me than looking the same everywhere.

### 2. How React state and the accessibility attributes stay in step

Every accessibility value is worked out from a state variable in the same render, so what a screen reader hears can not get out of step with the screen.

- The filters-open state sets aria-expanded on the Filters button and hides the panel.
- The chosen-types list sets aria-pressed on each type button. The CSS uses aria-pressed to colour the button too.
- The errors state sets aria-invalid, adds the error to aria-describedby, and fills a polite live region that is always on the page.
- A summary state fills the assertive live region after a failed submit.
- The number of services shown goes into a polite status line.
- The current page sets aria-current on the menu and changes the page title.

I move focus with useRef and the focus method: to the new page heading when the page changes, to the first wrong field when the form fails, and into the popup when it opens. It goes back when the popup closes, using a useEffect cleanup. I did not use aria-busy, because nothing loads from a server.

### 3. Testing and checking

Automated:

- 33 tests with Vitest and Testing Library, including axe checks on every page, on the form while it shows errors, and on the open popup. axe found no problems.
- Lighthouse accessibility on the built site, in Chrome Incognito, on 11 October 2026: Home 100, Find a service 100, Book a visit 100. The screenshots are in test-results.
- The test setup can not check colours, so I worked out the colour numbers by hand (they are in main.css). Lighthouse checked them in the real browser.

Manual:

- I tested with NVDA and Chrome on Windows, and did a keyboard-only test with the mouse put away. The full log is in test-results/manual-testing-log.md.
- What I found: [write one or two sentences here after the NVDA test]
- I only tested with NVDA, not VoiceOver or Orca. Lighthouse can only find some problems, which is why I tested by hand too.

## What I would improve

- The page changes with state, not with a router, so the address bar never changes and the browser Back button leaves the app. A router would fix this.
- The search count could wait a moment before it is read out.
- Test with more screen readers and with real users.

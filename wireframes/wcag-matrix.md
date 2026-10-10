# WCAG 2.1 AA Matrix

This table shows the WCAG 2.1 AA rules I am using for the clinic booking portal. For each rule I wrote where it applies, how I build it and how I check it.

| Rule (ID and name) | Part of the page | How I build it | How I check it |
|---|---|---|---|
| 1.3.1 Info and Relationships (Level A) | Forms, headings and the service details | Every input has a label that is linked to it. Checkboxes and radio buttons are grouped under a heading. The page uses proper parts like header, nav, main, section, article, aside and footer. | Run axe and look for errors. Turn on NVDA and listen to check that it reads the labels. |
| 1.4.3 Contrast (Minimum) (Level AA) | All the text | Normal text must be at least 4.5 to 1 and big text at least 3 to 1. Body text is dark grey (#1F2933) on a light background (#F9F7F3), which is 13.79 to 1. The other numbers are in the comments in main.css. | Test the colours in a contrast checker. Run Lighthouse and look for contrast warnings. |
| 2.1.1 Keyboard (Level A) | The whole site: menu, search, filters, form and popup | Use real links, buttons and form fields so Tab, Space and Enter work. Nothing should only work with a mouse. | Put the mouse away and do a whole booking with only the keyboard. |
| 2.4.1 Bypass Blocks (Level A) | Top of every page | A "Skip to main content" link is the first thing you get when you press Tab. The page parts also let a screen reader jump straight to the main part. | Press Tab on a new page and check the link shows and works. In NVDA, jump to the main part. |
| 2.4.3 Focus Order (Level A) | Menu, form, filters and popup | The page is written in the same order that it looks on the screen. When a popup opens, focus moves into it. When it closes, focus goes back to the button that opened it. | Tab through each page and check the order makes sense. Test the popup in the React version. |
| 2.4.7 Focus Visible (Level AA) | Every link, button and field | I made my own focus ring. It is 3px thick with a 2px gap. It is blue on the page and yellow inside the dark header and footer so it is easy to see. | Tab through each page and check I can always see where I am. |
| 3.3.1 Error Identification (Level A) | Booking form | If a field is wrong, a message in words shows under it and says what is wrong. The message is linked to the field (aria-describedby) and the field is marked as wrong (aria-invalid). | Send the form with empty fields. Check the message shows and NVDA reads it. |
| 4.1.3 Status Messages (Level AA) | Form checking, number of search results and the booking done message | Messages go in a live area (aria-live) so a screen reader reads them without moving focus. Normal updates use polite and urgent errors use assertive. | Type in the filter and check NVDA says how many results there are. Send the form and check NVDA reads the result. |

## Notes

- The wireframes have no JavaScript, so some rules (like 3.3.1, 4.1.3 and the popup part of 2.4.3) are only planned here. They get built and tested in the React app.
- I will add the real test results to the README after I have run axe, Lighthouse and NVDA.

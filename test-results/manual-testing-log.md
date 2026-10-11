# Manual Testing Log

I did these tests myself on my own laptop. Where it says "What I heard" I wrote down what the screen reader really said.

## Setup

- Date: ____________________
- Computer: Windows laptop
- Screen reader: NVDA, version ____________________
- Browser: Chrome, version ____________________
- Speech speed: ____________________
- I tested the built site (npm run build and npm run preview): Yes / No

## Part 1: Screen reader test (NVDA)

| # | What I did | What should happen | What I heard | Pass or fail |
|---|---|---|---|---|
| 1 | Opened the home page | NVDA reads the page title and the heading | | |
| 2 | Pressed Tab once | NVDA says "Skip to main content, link". Enter jumps to the main part | | |
| 3 | Tabbed through the menu | NVDA says "Main menu" and reads each button. The current page says "current page" | | |
| 4 | Chose "Find a service" | NVDA reads the new heading "Find a clinic service" | | |
| 5 | Typed "baby" in the search box | NVDA says how many services were found | | |
| 6 | Pressed Enter on the Filters button, twice | NVDA says "expanded" and then "collapsed" | | |
| 7 | Pressed Space on a type button, twice | NVDA says "pressed" and then "not pressed" | | |
| 8 | Went to the booking form and tabbed through every field | NVDA reads each label, says "required", and reads the help text | | |
| 9 | Pressed "Book my visit" with an empty form | NVDA says how many problems there are. Focus moves to the first wrong field and NVDA reads its error | | |
| 10 | Fixed a wrong field | The error goes away and NVDA does not say "invalid" any more | | |
| 11 | Filled in the form properly and booked | NVDA reads "Your visit is booked, dialog" | | |
| 12 | Pressed Tab a few times in the popup | Focus stays inside the popup | | |
| 13 | Pressed Escape | The popup closes and focus goes back to the "Book my visit" button | | |

## Part 2: Keyboard-only test (no mouse)

I put the mouse away and used only Tab, Shift+Tab, Enter, Space and Escape.

| Page | The order I tabbed through | Anything wrong? |
|---|---|---|
| Home | | |
| Find a service | | |
| Book a visit | | |
| Popup | | |

- Could I reach every button, link and field? Yes / No
- Did I ever get stuck (a keyboard trap)? Yes / No
- Could I always see where the focus was? Yes / No

## Part 3: Problems I found and what I changed

1. ____________________
2. ____________________
3. ____________________

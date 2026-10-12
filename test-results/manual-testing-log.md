# Manual Testing Log

I did these tests myself on my own laptop, with the NVDA screen reader and the Chrome browser on Windows. I wrote down what NVDA really said.

- Date: 12 October 2026
- Screen reader: NVDA
- Browser: Chrome
- Site: Midlands Community Clinic Booking Portal

## What I noticed when I first switched NVDA on

- NVDA read out the words on the page as I moved the mouse over them.
- NVDA told me when something could be clicked, like a link or a button.
- When I moved into a form field, NVDA made a different sound to tell me I was in a form I could fill in.
- When I moved onto a dropdown list, NVDA made another different sound.

## Part 1: Screen reader checks

| What I did | What NVDA said | What this shows |
|---|---|---|
| Clicked on the browser window with the site open | NVDA made a sound and said "Chrome, Midlands Community Clinic, document" | The page title is read out, so I know which site I am on |
| Moved into the main menu | NVDA said it was the main menu, a navigation landmark, and a list with 3 items. It also said "current page" for the page I was on | The menu is marked as navigation, and the current page is announced |
| Pressed Tab to move around the menu | NVDA only said the name of the button I landed on, and the same for each item I tabbed to | Tab moves from one item to the next and each one has a clear name |
| Moved onto the Filters button | NVDA said "Filters", "collapsed" and "heading level 3". After I pressed it, it said "expanded" | The Filters button tells the screen reader if it is open or closed, and it is a proper heading |

## Part 2: Keyboard tab order

When I used the Tab key, the focus moved from one button to the next, and NVDA said the name of each one as I got to it.

## Part 3: What I have not listened to with NVDA yet

I did not test these four things with NVDA yet: the skip link, the error messages on the empty booking form, the type buttons on the services page, and the booking popup. The automated tests check all four (they check that focus moves to the first wrong field, that the buttons change between pressed and not pressed, and that Escape closes the popup and gives focus back). axe and Lighthouse also found no problems.

## Part 4: Problems I found

I did not find any problems in the checks above.

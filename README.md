# Task Tracker Application

A single page task manager that runs entirely in the browser. Tasks are stored in
localStorage, so they survive a refresh without any server or database.

Built for CS 212 (Web Programming I) at Northern Arizona University, Summer 2026.

Hosted on GIT so me and Joseph can share the code easier: https://github.com/RivetaLabs/Task-Tracker-Application

## Features

- Create tasks with a title, description, due date, and priority
- Tasks render as Bootstrap cards in a responsive grid
- Edit and delete any task
- Mark tasks complete, which restyles the card so the two states read apart
- Live stats: total, completed, and pending counts with a progress bar
- Everything persists to localStorage and reloads on the next visit

## Stack

HTML5, CSS3, Bootstrap 5.3.3, vanilla JavaScript, and jQuery for the delete
animation. No build step and no dependencies to install.

## Running it

Clone the repo and open `index.html` in a browser. That is the whole setup. In VS
Code you can preview it without leaving the editor: right click `index.html` and
choose Open with Live Preview, or run "Simple Browser: Show" from the command
palette and point it at the file.

```
git clone https://github.com/RivetaLabs/Task-Tracker-Application.git
cd Task-Tracker-Application
open index.html
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure: header, stats row, add form, and the card grid |
| `style.css` | Typography, completed card styling, layout adjustments |
| `script.js` | The task array, localStorage save and load, rendering, and the add, edit, delete, and complete functions |

## How it works

All tasks live in one array. A single `renderTasks()` function builds the card
markup in a loop, writes it to the grid in one assignment, and recounts the stats
in the same pass so the dashboard cannot drift out of sync with the cards. Every
function that changes a task ends by saving to localStorage and re-rendering.

Task IDs come from `Date.now()` rather than the position in the array, so removing
one task never breaks the buttons on the others.

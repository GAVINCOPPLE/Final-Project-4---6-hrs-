# Downtown Donuts Website

## Overview

This project is a full stack website for Downtown Donuts, which is a small family owned donut and coffee shop. The goal was to build a clean and simple website that still feels modern and matches the cozy vibe the client described.

The site includes a homepage, menu page, about page, and a comments page where users can post and view comments. It also includes links to online delivery services that they could order from as well.

---

## Setup Instructions

1. Clone the repository or download the repository

2. Open the project folder on your computer

3. Open a terminal inside the folder

4. Install dependencies using npm install

5. Start the server using npm start

6. Open your browser and go to http://localhost:3000


---

## Design Decisions

1. **Centered layout**
   I centered most of the content and limited the width so the text wouldn’t stretch across the whole screen to also maintain device variable and friendliness. This made everything easier to read and look cleaner.

2. **Keeping the design simple**
   I didn’t want to overdesign anything. I focused on making it look clean and organized while still matching the cozy and modern style from the assignment.

3. **Using the brand colors**
   I followed the brand guidelines by using the colors provided by the brand document across the site so everything feels consistent.

---

## Edge Cases

1. **Server not responding**
   If the comments fail to load, the page shows a simple error message instead of breaking.

2. **Empty or whitespace input**
   The server checks for empty input and prevents users from submitting blank comments.

3. **Very long input**
   Comments are limited to 500 characters. If the user goes over that, an error message is shown.

4. **Double clicking submit**
   The submit button is disabled while posting to prevent duplicate comments.

---

## Challenges & Learnings

1. **Pagination not working at first**
   At first I was only returning the last 10 comments, so the next button didn’t actually do anything. I fixed this by adding a page parameter and slicing the comments correctly on the backend.

2. **CSS not applying correctly**
   I ran into an issue where my styles weren’t showing up, and it turned out I had placed them inside a media query by mistake. It took some time but realizing the error and moving them into the correct spot fixed everything.

---

## Comments System (Data Flow)

When a user submits a comment:

1. The form is handled in the browser using JavaScript
2. A POST request is sent to `/api/comments`
3. The server validates the input completing the checks of empty inputs and enforcing character limit
4. A timestamp is created on the server
5. The comment is stored in memory
6. The client reloads comments using a GET request
7. Comments are displayed with pagination (10 per page) with the option to hit next or prev to go between pages

---

## Accessibility

* All images include alt text
* Form inputs use labels
* Semantic HTML elements like `<nav>`, `<main>`, and `<footer>` are used
* The site can be navigated with a keyboard

---

## Citations

## Citations

- Google Fonts – Used for Montserrat and Italianno fonts  
  https://fonts.google.com/

- MDN Web Docs – Used for JavaScript, Fetch API, and async/await  
  https://developer.mozilla.org/

- StackOverflow – Used for debugging pagination and fetch requests  
  https://stackoverflow.com/

- Class lectures and starter code

- Tutor help for debugging and understanding pagination
---


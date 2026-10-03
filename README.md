# Omar Ashraf — Portfolio

Static personal portfolio for **Omar Ashraf**, IT Specialist.

Live site is served from GitHub Pages (branch: `main`).

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step, no framework, no
dependencies to install — open `index.html` in a browser and it works.

```
index.html          markup for every section
css/style.css       all styling, CSS custom properties for both themes
js/script.js        preloader, theme toggle, typing effect, scroll reveal,
                    stat counters, project filtering, contact form
img/                profile photo and project screenshots
```

## Sections

Hero · About · Highlights · Experience · Skills · Services · Projects ·
Career Objective + Certifications · Contact

## Features

- Dark and light themes, persisted in `localStorage`, follows the OS preference
  on first visit
- Responsive down to mobile, with a hamburger menu
- Scroll-reveal animations and animated stat counters via `IntersectionObserver`
- Filterable project cards driven by a `data-filter` attribute (the filter
  buttons are generic — add a button, add the matching category, no JS changes)
- Preloader, scroll-progress bar, back-to-top button
- Contact form posts to [FormSubmit](https://formsubmit.co) via `fetch`, so the
  page never navigates away

## Making the contact form work

The form only starts delivering mail **after** FormSubmit is activated for the
address in `js/script.js`. Open the site, submit the form once, then click the
confirmation link that arrives at that address (check spam). Until then every
submission fails by design.

## Adding a project

Add an `<article class="project-card" data-category="...">` inside
`.projects-grid` and, if you want a new filter, a
`<button class="filter-btn" data-filter="...">` inside `.projects-filter`.
`data-category` must match `data-filter`.

## Credits

- [Font Awesome](https://fontawesome.com) 6.4.0 — icons
- [Google Fonts](https://fonts.google.com) — Inter and Poppins

## Contact

- Email: omar.ashraf.gabl@gmail.com
- Phone: 0115 832 9604
- [GitHub](https://github.com/omargablx02) ·
  [LinkedIn](https://www.linkedin.com/in/omar-gablx02/) ·
  [HackerRank](https://www.hackerrank.com/profile/0agx01)
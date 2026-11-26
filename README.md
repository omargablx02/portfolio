# Omar Ashraf — Portfolio

Static personal portfolio for **Omar Ashraf**, IT Support Engineer.

Live site is served from GitHub Pages (branch: `main`).
CV used on the site: `Omar_Ashraf_CV.pdf` (same byte-for-byte file as the approved CV).

The content follows the approved CV in `D:\Freebuff\cv\ats\Omar_Ashraf_CV.pdf`.
There is no visa or relocation line anywhere. Lab work is labelled as lab/self-study.

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step, no framework, no
dependencies to install — open `index.html` in a browser and it works.

```text
index.html          markup for every section
css/style.css       all styling, CSS custom properties for both themes
js/script.js        preloader, theme toggle, typing effect, scroll reveal,
                    stat counters, project/skill filtering, contact form
img/                profile photo and project artwork
```

## Sections

Hero · About · How I Work · Experience · Skills · Services · Projects ·
Career Objective + Certifications · Contact

## Accuracy notes

- Experience numbers match the CV: 55+ PCs, 85+ Odoo tablets, 30+ network
  printers, 80+ Hikvision cameras, 25-day retention, 8 Windows Server
  2012–2016 servers, 10+ TP-Link switches, 14 UniFi access points, ~44 GB
  daily backup, 30+ requests/month and 5+ branches.
- Active Directory, GPO, DNS, DHCP, OSPF, HSRP, VLAN, ACL, Cisco Packet Tracer
  and Microsoft 365 Admin Center are shown only as **lab / self-study**.
- No perimeter firewall, site-to-site VPN, 99% downtime claim, yearly restore
  test, vendor/high-value procurement, end-user training or Odoo↔Salesforce
  integration claim.
- The degree certificate link is deliberately absent. Education says
  "Certificate available upon request".
- `Download CV` opens the approved PDF that is committed in this repo.

## Projects

Rocky Linux Remote Access Lab · Microsoft 365 Admin Center Lab · Active
Directory Automation · PC Testing Toolkit · ICONS · Infrastructure Automation
and Shell Scripting · Enterprise Network Design · Python Projects and Problem
Solving.

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
address in `index.html`. Open the site, submit the form once, then click the
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

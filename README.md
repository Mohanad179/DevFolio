# DevFolio-style portfolio recreation

A responsive one-page portfolio built with **HTML, CSS, Bootstrap 5, Bootstrap Icons, and vanilla JavaScript**. It recreates the general section layout and visual style of the referenced DevFolio demo while using fresh placeholder copy and images.

## Run it

1. Extract the folder.
2. Open `index.html` in your browser, or use the VS Code **Live Server** extension.
3. An internet connection is needed for Bootstrap, Bootstrap Icons, Google Fonts, and the sample Unsplash images.

## What to customize

- **Your name / title:** search `index.html` for `Your Name`, `Frontend Developer`, and `hello@example.com`.
- **Hero typing animation:** edit `roleWords` near the top of `js/main.js`.
- **Profile photo:** replace the image URL in the About section.
- **Skills:** edit the labels, percentages, and each progress bar's inline `width` in `index.html`.
- **Projects:** replace the six project cards in the `#work` section, including image URLs, titles, years, and links.
- **Services, blog, testimonial, and contact:** update their text and links directly in `index.html`.
- **Colors / spacing:** adjust the CSS variables at the top of `css/style.css`.
- **Statistics:** change each `data-count` value in `index.html`.

## Important notes

- The contact form is front-end only and does **not** send emails. Connect it to a backend or form service if you want to receive submissions.
- The images are remote sample images; replace them with your own project screenshots and portrait before publishing.
- This is a close, editable recreation of the layout, not a pixel-perfect copy of every original asset.

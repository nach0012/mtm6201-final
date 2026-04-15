# REC CENTER — MTM6201 Final Project

## Live Site
[https://nach0012.github.io/mtm6201-final](https://nach0012.github.io/mtm6201-final)

## Figma Designs
[View Hi-Fi Wireframes] https://www.figma.com/design/mwjezmHa5PO6q8fdjgNQAQ/Course-Resurces--W26_MTM6260-?node-id=1-11&t=0x3anJaN9ZbJBe2p-1
*(Instructor invited: kaura5@algonquincollege.com)*

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, explore programs, featured programs, why choose us, testimonials |
| Youth Programs | `youth-programs.html` | Age filter, program cards, safety section, pricing table |
| Register | `register.html` | 3-step indicator, payment form, order summary, confirmation |

---

## Process

I started by studying my Figma wireframes carefully, noting the three breakpoints: mobile, tablet, and desktop. I translated the colour palette into CSS custom properties so every component references the same source-of-truth values, making it easy to update the theme in one place.

For layout I used Bootstrap's grid system — primarily `col-12 col-sm-6 col-lg-4` patterns for the program card grids, and a `col-12 col-lg-7 / col-12 col-lg-5` split for the registration form and order summary. The mobile-first approach meant writing base styles for small screens first, then expanding for larger viewports.

I chose **DM Serif Display** for headings — distinctive and editorial, pairing well with the institution's trustworthy tone — and **DM Sans** for body text, which is clean and readable at small sizes. Both are available on Google Fonts under the Open Font License.

---

## Challenges and How I Overcame Them

**1. Step indicator on the Registration page**
The wireframe showed circles connected by horizontal lines, which Bootstrap doesn't provide natively. I built it with flexbox: `step-item` containers hold the circles, and `.step-line` divs sit between them with a fixed width and 2px height. On mobile I reduced the line width to avoid overflow.

**2. Age filter without page reload**
I needed the filter pills to show and hide cards without navigating away. I implemented a lightweight vanilla JavaScript solution: each card has a `data-age` attribute with space-separated range keys, and the click handler toggles Bootstrap's `.d-none` class. I also added `aria-pressed` updates so keyboard and screen-reader users know which filter is active.

**3. Responsive hero image**
The wireframe uses a photographic hero on desktop that stacks below the heading on mobile. I used the HTML `<picture>` element with a `<source media="(min-width: 992px)">` pointing to the large crop, and the default `<img>` for the mobile version — following the `srcset` and `media` best-practice pattern.

**4. Accessible form**
The payment form needed to work for keyboard-only users and screen readers. I added `aria-required`, `aria-describedby`, `aria-live` on the error alert, and `aria-current="step"` on the active step. The confirmation panel uses `role="status"` and `aria-live="polite"` so assistive technology announces it when it appears.

**5. CSS custom properties**
Using variables like `--rc-navy`, `--rc-amber`, and `--rc-teal` meant I could adjust the entire colour scheme in one place and never had hard-coded hex values scattered through components.

---

## What I Learned

- CSS custom properties are powerful for maintaining a consistent design system
- Accessible HTML is mostly just good semantic HTML — logical heading order, descriptive `aria-label` attributes, and proper landmark elements go a long way
- Bootstrap utility classes work best when combined with custom CSS for specific components
- Mobile-first thinking reduces overrides and makes responsive behaviour feel natural
- Validating HTML regularly catches structural errors early before they compound

---

## Assets & Resources

### Frameworks & Libraries

| Asset | Source | License |
|-------|--------|---------|
| Bootstrap 5.3.3 | [getbootstrap.com](https://getbootstrap.com) | MIT |
| Animate.css 4.1.1 | [animate.style](https://animate.style) | MIT |
| DM Serif Display font | [Google Fonts](https://fonts.google.com/specimen/DM+Serif+Display) | OFL |
| DM Sans font | [Google Fonts](https://fonts.google.com/specimen/DM+Sans) | OFL |

### Images

All images were resized and exported in two sizes and referenced via the HTML `<picture>` element with `srcset` and `media` attributes.

| File | Description | Source |
|------|-------------|--------|
| `hero-large.jpg` | Group fitness class exercising outdoors | Stock photo — [Unsplash](https://unsplash.com) (Unsplash License) |
| `senior-card-large.jpg` | Two senior women in pool during aqua fitness | Stock photo — [Unsplash](https://unsplash.com) (Unsplash License) |
| `youth-card-large.jpg` | Children in swim caps at pool | Stock photo — [Unsplash](https://unsplash.com) (Unsplash License) |
| `adults-card-large.jpg` | Outdoor ice rink with skaters | Stock photo — [Unsplash](https://unsplash.com) (Unsplash License) |

### Icons

All icons are inline SVG paths — no icon library dependency. SVG path data adapted from [Material Design Icons](https://material.io/icons) (Apache 2.0 License).

---

*REC CENTER © 2026 · Saida Nachit · Algonquin College MTM6201*

# Saroj. Always building.

Saroj Prasad Mainali's portfolio: a story of software, research, and work from Kathmandu, Nepal.

[Visit the portfolio](https://voidcu.com) | [Ready-to-copy GitHub profile](./github-profile/README.md) | [Profile setup](./github-profile/SETUP.md)

![Portfolio hero artwork](./public/assets/art/saroj-opening.webp)

## The website

Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion. The site includes an editorial homepage, day/night artwork, a browsable skills interface, project galleries, experience, writing, and a contact form. Motion can be paused and respects reduced-motion preferences.

Featured work includes **Auctionmandu**, **Genzlink**, **Amarnepal**, **Project Lakhey**, **Devanagari OCR**, and **Perceparator**. The homepage and Projects page also cover student management, ticketing management, contract signing, library management, and billing systems.

## Run locally

Use a Node.js version compatible with Next.js 15 and npm.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. On Windows PowerShell, use `npm.cmd` if local script execution policy blocks `npm.ps1`.

```sh
npm run lint
npm run build
npm run start
```

For browser checks, start a development server on port 3100, then run Playwright in another terminal:

```sh
npm run dev -- --port 3100
```

```sh
npm run test:e2e
```

Playwright uses Chromium for desktop and mobile views. Install its browser with `npx playwright install chromium` if needed. `PLAYWRIGHT_BASE_URL` can point the suite at a different local server. Contact tests intercept requests and do not send email.

## Edit the content

| Location                  | Purpose                                                                        |
| :------------------------ | :----------------------------------------------------------------------------- |
| `data/profile.ts`         | Biography, systems experience, skills, timeline, projects, clients, and totals |
| `data/leetcode.ts`        | Dated LeetCode snapshot                                                        |
| `data/blog.ts`            | Journal content                                                                |
| `components/cinema/`      | Homepage, project gallery, story, and skills components                        |
| `public/assets/art/`      | Original portfolio artwork and day variants                                    |
| `public/assets/projects/` | Product screenshots, including the actual Amarnepal website                    |
| `app/`                    | Routes, layouts, styles, metadata, and API handlers                            |
| `tests/`                  | Desktop and mobile browser checks                                              |
| `github-profile/`         | Portable profile README, images, and publishing instructions                   |

`NEXT_DIST_DIR` can separate build output from a running development server. Keep environment credentials outside version control.

## GitHub profile

The [profile package](./github-profile/README.md) reuses this site's content and images with GitHub-compatible Markdown and HTML. It belongs in **VoidCU/VoidCU**. The separate **VoidCU/VoidCU.github.io** repository hosts a static website; this repository is **VoidCU/portfolio**. See the [setup instructions](./github-profile/SETUP.md) before copying files.

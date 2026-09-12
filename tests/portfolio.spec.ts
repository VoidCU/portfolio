import { test, expect } from "@playwright/test";

test("homepage art, navigation and project destinations are available", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Saroj.Always building.",
  );
  await expect(page.locator(".hero-landscape img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".hero-landscape img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page.getByRole("link", { name: /Explore my work/ }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.getByRole("heading", { name: "Amarnepal", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".project-01 .project-art")).toHaveAttribute(
    "href",
    "https://amarnepal.com",
  );
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  expect(errors).toEqual([]);
});

test("story chapters and toolkit can be explored with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: /Follow the story/ }).click();
  await expect(page).toHaveURL(/#story$/);
  await page.getByRole("link", { name: "Next: The work" }).click();
  await expect(page).toHaveURL(/#story-1$/);
  await expect(
    page.getByRole("heading", { name: "Get the pieces talking to each other." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Next: The next version" }).click();
  await expect(page).toHaveURL(/#story-2$/);
  await page.getByRole("link", { name: /Discover the projects/ }).click();
  await expect(
    page.locator(".cinema-project").first().getByRole("heading"),
  ).toHaveText("Auctionmandu");
  await expect(page.locator(".project-06 .project-links a")).toHaveCount(1);
  await expect(page.locator(".project-02 .project-art")).toHaveAttribute(
    "href",
    "https://www.genzlinkapp.com/",
  );
  await page.locator('.signal-desk').scrollIntoViewIfNeeded();
  await page.getByRole('tab',{name:/Intelligence/}).click();
  await expect(page.locator('.desk-description h3')).toHaveText('Find the useful pattern.');
  await page.getByRole('button',{name:/PyTorch/}).click();
  await expect(page.locator('.desk-active-tool')).toContainText('PyTorch');
  await page.getByRole('tab',{name:/Infrastructure/}).click();
  await expect(page.locator('.desk-description h3')).toHaveText('Keep the whole thing running.');
});

test("menu traps focus and restores it when closed", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "All pages" }),
  ).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "All pages" })).toHaveCount(
    0,
  );
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "All pages" })
    .getByRole("link", { name: "02 Work" })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ideas made real.",
  );
});

test("project filters show the right work", async ({ page }) => {
  await page.goto("/projects");
  await page
    .getByRole("button", { name: "AI & Research", exact: true })
    .click();
  await expect(page.locator(".cinema-project")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: "Devanagari OCR", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Platforms", exact: true }).click();
  await expect(page.locator(".cinema-project")).toHaveCount(4);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".cinema-project")).toHaveCount(6);
});

test("contact validates inputs and handles responses without sending email", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "SEND MESSAGE", exact: true }).click();
  await expect(
    page.getByText("Valid email required", { exact: true }),
  ).toBeVisible();
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );
  await page.getByLabel("Name", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Email", { exact: true }).fill("visitor@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Portfolio test");
  await page
    .getByLabel("Message", { exact: true })
    .fill("A simulated message for interface verification.");
  await page.getByRole("button", { name: "SEND MESSAGE", exact: true }).click();
  await expect(
    page.getByText(
      "Message sent. Check your inbox for a confirmation email from me.",
    ),
  ).toBeVisible();
});

test("reduced motion keeps content readable and pause remains functional", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("main")).toHaveClass(/motion-paused/);
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
  await expect(page.locator(".cinema-hero h1 > span").first()).toHaveCSS("opacity", "1");
  await expect(page.locator(".cinema-hero h1 > span").last()).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-intro")).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: /PAUSE MOTION/ }).click();
  await expect(
    page.getByRole("button", { name: /RESUME MOTION/ }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("all existing pages retain content without horizontal overflow", async ({
  page,
}) => {
  const covers: string[] = [];
  for (const route of [
    "/about",
    "/skills",
    "/experience",
    "/clients",
    "/achievements",
    "/open-source",
    "/blog",
    "/now",
    "/uses",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toBeVisible();
    await expect(page.locator("#main-content"), route).toBeVisible();
    const cover = page.locator(".volume-landscape img");
    await expect
      .poll(
        () =>
          cover.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        { message: `${route} cover loads` },
      )
      .toBe(true);
    covers.push((await cover.getAttribute("src")) || "");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
  }
  expect(new Set(covers).size).toBe(covers.length);
});

test('the signal desk supports keyboard navigation without a 3D canvas', async ({page})=>{
  await page.goto('/skills');
  await page.getByRole('tab',{name:/Interface/}).click();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('tab',{name:/Systems/})).toBeFocused();
  await expect(page.getByRole('tab',{name:/Systems/})).toHaveAttribute('aria-selected','true');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab',{name:/Craft/})).toBeFocused();
  await expect(page.locator('.desk-description h3')).toHaveText('Notice the details.');
  await expect(page.locator('canvas,.ambient-switch')).toHaveCount(0);
});

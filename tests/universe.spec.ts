import { test, expect } from "@playwright/test";

test("day artwork, night illumination and their preferences survive reload", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Turn ambient lights off" }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-illumination",
    "off",
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Turn ambient lights on" }),
  ).toBeVisible();
  await page.evaluate(() => {
    (
      window as Window & { __voidcuToggleTheme: () => void }
    ).__voidcuToggleTheme();
  });
  await expect(page.locator(".hero-landscape img")).toHaveAttribute(
    "src",
    /saroj-opening-day/,
  );
  await expect
    .poll(() =>
      page
        .locator(".hero-landscape img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await expect(page.locator(".ambient-switch")).toBeHidden();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator(".hero-landscape img")).toHaveAttribute(
    "src",
    /saroj-opening-day/,
  );
  await expect(
    page.locator(
      'img[src*="saroj-roots"],img[src*="saroj-maker"],img[src*="saroj-afterhours"]',
    ),
  ).toHaveCount(0);
  await page.goto("/about");
  await expect(page.locator(".editorial-portrait img")).toHaveAttribute(
    "src",
    /saroj-editorial-day/,
  );
  await expect(page.locator(".volume-landscape img")).toHaveAttribute(
    "src",
    /cover-origin-day/,
  );
});

test("the concealed transmission is connected, solvable and remembers progress", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Inspect marker 03" }).click();
  await expect(
    page.getByRole("heading", { name: "An echo, out of order." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Inspect marker 03" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Inspect marker 01" }).click();
  await page.getByRole("slider").fill("28");
  await page.getByRole("button", { name: "Hold frequency" }).click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Inspect marker 02" }).click();
  for (const i of [1, 3, 7, 9])
    await page.getByRole("button", { name: `Cell ${i}`, exact: true }).click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(2);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Inspect marker 03" }).click();
  for (const label of ["DISCOVER", "PROTOTYPE", "BUILD", "SHIP"])
    await page.getByRole("button", { name: new RegExp(label) }).click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(3);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Inspect marker 04" }).click();
  for (const [orbit, count] of [
    [1, 11],
    [2, 8],
    [3, 5],
  ])
    for (let i = 0; i < count; i++)
      await page
        .getByRole("button", { name: new RegExp(`Advance orbit ${orbit},`) })
        .click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(4);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Inspect marker 05" }).click();
  await page.getByLabel("Signature").fill("VoidCU");
  await page.getByRole("button", { name: "Return the signal" }).click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(5);
  await page.keyboard.press("Escape");
  await page.reload();
  await page.getByRole("button", { name: "Inspect marker 05" }).click();
  await expect(
    page.getByText(/Thanks for looking a little closer/),
  ).toBeVisible();
  await expect(page.locator(".signal-progress .held")).toHaveCount(5);
});

test("scrolling changes the active skill layer without manual selection", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".lazy-studio").scrollIntoViewIfNeeded();
  await page.locator(".universe-step").nth(3).scrollIntoViewIfNeeded();
  await expect(page.locator(".universe-tabs button").nth(3)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".universe-readout strong")).toHaveText(
    "DevOps & Cloud",
  );
});

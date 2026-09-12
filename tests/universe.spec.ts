import { test, expect } from "@playwright/test";

test("day artwork persists and removed lighting stays absent", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('.ambient-switch')).toHaveCount(0);
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
  for (const i of [1, 3, 7, 13, 18, 24])
    await page.getByRole("button", { name: `Cell ${i}`, exact: true }).click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(2);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Inspect marker 03" }).click();
  for (const label of ["Relay C", "Relay B", "Relay D", "Relay F"])
    await page.getByRole("button", { name: new RegExp(label) }).click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(3);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Inspect marker 04" }).click();
  for (const [orbit, count] of [
    [1, 2],
    [2, 3],
    [3, 1],
  ])
    for (let i = 0; i < count; i++)
      await page
        .getByRole("button", { name: new RegExp(`Advance dial ${orbit},`) })
        .click();
  await expect(page.locator(".signal-progress .held")).toHaveCount(4);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Inspect marker 05" }).click();
  await page.getByLabel("Decoded instruction").fill("RETURN");
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

test('scroll changes the desk until a visitor takes control',async({page})=>{
 await page.goto('/');
 await page.locator('.signal-desk').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.8,behavior:'instant'}));
 await expect(page.getByRole('tab',{name:/Interface/})).toHaveAttribute('aria-selected','true');
 await page.locator('.desk-footer').scrollIntoViewIfNeeded();
 await expect(page.getByRole('tab',{name:/Interface/})).toHaveAttribute('aria-selected','false');
 await page.getByRole('tab',{name:/Intelligence/}).click();
 await page.locator('.desk-footer').scrollIntoViewIfNeeded();
 await expect(page.getByRole('tab',{name:/Intelligence/})).toHaveAttribute('aria-selected','true');
});

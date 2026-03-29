const { test, expect } = require("@playwright/test");

test("home page keeps decision block visible and syncs live calculator output", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.locator('[data-decision-page="home"]')).toBeVisible();
    await page.fill("#length", "10");
    await page.fill("#width", "10");
    await page.fill("#height", "0.3333");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="home"] [data-decision-slot="method"]')).toContainText("Ready-mix");
    await expect(page.locator('[data-decision-page="home"] [data-decision-slot="budget"]')).toContainText("1.36 yd³");
});

test("general concrete page keeps static decision content and updates numbers", async ({ page }) => {
    await page.goto("/en/how-much-concrete-do-i-need.html");
    await expect(page.locator('[data-decision-page="how-much-concrete"]')).toBeVisible();
    await page.fill("#hmdin-length", "10");
    await page.fill("#hmdin-width", "10");
    await page.fill("#hmdin-thickness", "4");
    await expect(page.locator('[data-decision-slot="method"]')).toContainText("Ready-mix");
    await expect(page.locator('[data-decision-slot="budget"]')).toContainText("1.36 yd³");
});

test("10x10 slab page syncs decision block with thickness changes", async ({ page }) => {
    await page.goto("/en/how-much-concrete-for-10x10-slab.html");
    await page.fill("#s10x-thick", "6");
    await expect(page.locator("#s10x-yd3")).toContainText("1.85");
    await expect(page.locator('[data-decision-page="slab-10x10"] [data-decision-slot="budget"]')).toContainText("2.04 yd³");
});

test("bag calculator keeps procurement guidance visible", async ({ page }) => {
    await page.goto("/en/bag-calculator.html");
    await page.fill("#length", "10");
    await page.fill("#width", "10");
    await page.fill("#height", "0.5");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="bag-calculator"]')).toBeVisible();
    await expect(page.locator('[data-decision-slot="summary"]')).not.toContainText("placeholder");
});

test("cost calculator updates estimate decision block", async ({ page }) => {
    await page.goto("/en/concrete-calculator-cost.html");
    await page.fill("#length", "10");
    await page.fill("#width", "10");
    await page.fill("#thickness", "4");
    await expect(page.locator("#results")).toBeVisible();
    await expect(page.locator('[data-decision-page="cost-calculator"] [data-decision-slot="method"]')).toContainText("Budget range");
});

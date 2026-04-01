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

test("slab calculator shows decision guidance after calculation", async ({ page }) => {
    await page.goto("/en/slab-calculator.html");
    await expect(page.locator('[data-decision-page="slab-calculator"]')).toBeVisible();
    await page.fill("#length", "10");
    await page.fill("#width", "12");
    await page.fill("#height", "0.5");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="slab-calculator"] [data-decision-slot="budget"]')).toContainText("2.44 yd³");
});

test("footing calculator keeps footing procurement advice in sync", async ({ page }) => {
    await page.goto("/en/footing-calculator.html");
    await expect(page.locator('[data-decision-page="footing-calculator"]')).toBeVisible();
    await page.fill("#length", "40");
    await page.fill("#width", "1.5");
    await page.fill("#height", "1");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="footing-calculator"] [data-decision-slot="method"]')).toContainText("Ready-mix");
});

test("sono tube calculator shows decision guidance for multiple piers", async ({ page }) => {
    await page.goto("/en/sono-tube-calculator.html");
    await expect(page.locator('[data-decision-page="sono-tube-calculator"]')).toBeVisible();
    await page.selectOption("#sono-diameter", "12");
    await page.fill("#sono-depth", "4");
    await page.fill("#sono-quantity", "4");
    await expect(page.locator("#results")).toBeVisible();
    await expect(page.locator('[data-decision-page="sono-tube-calculator"] [data-decision-slot="summary"]')).not.toContainText("placeholder");
});

test("12x12 slab page syncs decision block with slab thickness", async ({ page }) => {
    await page.goto("/en/how-much-concrete-for-12x12-slab.html");
    await expect(page.locator('[data-decision-page="slab-12x12"]')).toBeVisible();
    await page.fill("#s10x-thick", "4");
    await expect(page.locator('[data-decision-page="slab-12x12"] [data-decision-slot="budget"]')).toContainText("1.96 yd³");
});

test("20x20 slab page keeps ready-mix guidance visible", async ({ page }) => {
    await page.goto("/en/how-much-concrete-for-20x20-slab.html");
    await expect(page.locator('[data-decision-page="slab-20x20"]')).toBeVisible();
    await page.fill("#s10x-thick", "4");
    await expect(page.locator('[data-decision-page="slab-20x20"] [data-decision-slot="method"]')).toContainText("Ready-mix");
});

test("yards calculator updates ordering guidance after calculation", async ({ page }) => {
    await page.goto("/en/concrete-calculator-yards.html");
    await expect(page.locator('[data-decision-page="yards-calculator"]')).toBeVisible();
    await page.selectOption("#shape", "slab");
    await page.fill("#length", "20");
    await page.fill("#width", "20");
    await page.fill("#thickness", "4");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="yards-calculator"] [data-decision-slot="budget"]')).toContainText("5.43 yd³");
});

test("column calculator updates decision guidance for round columns", async ({ page }) => {
    await page.goto("/en/column-calculator.html");
    await expect(page.locator('[data-decision-page="column-calculator"]')).toBeVisible();
    await page.fill("#column-diameter", "12");
    await page.fill("#column-height", "8");
    await page.fill("#column-quantity", "2");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="column-calculator"] [data-decision-slot="summary"]')).not.toContainText("placeholder");
});

test("pier calculator keeps procurement guidance visible for belled piers", async ({ page }) => {
    await page.goto("/en/concrete-pier-calculator.html");
    await expect(page.locator('[data-decision-page="pier-calculator"]')).toBeVisible();
    await page.fill("#pier-diameter", "12");
    await page.fill("#pier-depth", "5");
    await page.fill("#pier-qty", "2");
    await expect(page.locator('[data-decision-page="pier-calculator"] [data-decision-slot="budget"]')).not.toContainText("placeholder");
});

test("cylinder calculator updates decision block after diameter and height change", async ({ page }) => {
    await page.goto("/en/concrete-calculator-cylinder.html");
    await expect(page.locator('[data-decision-page="cylinder-calculator"]')).toBeVisible();
    await page.fill("#diameter", "12");
    await page.fill("#height", "8");
    await page.fill("#quantity", "2");
    await expect(page.locator('[data-decision-page="cylinder-calculator"] [data-decision-slot="summary"]')).not.toContainText("placeholder");
});

test("quikrete calculator keeps bag-buying guidance visible", async ({ page }) => {
    await page.goto("/en/quikrete-bag-calculator.html");
    await expect(page.locator('[data-decision-page="quikrete-bag-calculator"]')).toBeVisible();
    await page.fill("#length", "8");
    await page.fill("#width", "8");
    await page.fill("#height", "0.3333");
    await page.selectOption("#bag-size", "60");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="quikrete-bag-calculator"] [data-decision-slot="summary"]')).not.toContainText("placeholder");
});

test("rebar calculator updates reinforcement guidance after estimate", async ({ page }) => {
    await page.goto("/en/rebar-calculator.html");
    await expect(page.locator('[data-decision-page="rebar-calculator"]')).toBeVisible();
    await page.fill("#slab-length", "20");
    await page.fill("#slab-width", "20");
    await page.fill("#rebar-spacing", "18");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="rebar-calculator"] [data-decision-slot="method"]')).not.toContainText("placeholder");
});

test("curb calculator updates curb ordering guidance after input changes", async ({ page }) => {
    await page.goto("/en/concrete-curb-calculator.html");
    await expect(page.locator('[data-decision-page="curb-calculator"]')).toBeVisible();
    await page.fill("#curb-height", "6");
    await page.fill("#curb-width", "6");
    await page.fill("#curb-length", "100");
    await page.fill("#curb-qty", "1");
    await expect(page.locator('[data-decision-page="curb-calculator"] [data-decision-slot="summary"]')).not.toContainText("placeholder");
});

test("stairs calculator updates stair pour guidance after estimate", async ({ page }) => {
    await page.goto("/en/stairs-calculator.html");
    await expect(page.locator('[data-decision-page="stairs-calculator"]')).toBeVisible();
    await page.fill("#stairs-width", "4");
    await page.fill("#number-of-steps", "5");
    await page.fill("#riser-height", "7");
    await page.fill("#tread-depth", "11");
    await page.fill("#landing-depth", "4");
    await page.click("#calculate-btn");
    await expect(page.locator('[data-decision-page="stairs-calculator"] [data-decision-slot="summary"]')).not.toContainText("placeholder");
});

test("core decision pages expose primary and secondary CTA links", async ({ page }) => {
    const pages = [
        "/en/",
        "/en/how-much-concrete-do-i-need.html",
        "/en/slab-calculator.html",
        "/en/bag-calculator.html",
        "/en/concrete-calculator-cost.html"
    ];

    for (const path of pages) {
        await page.goto(path);
        await expect(page.locator('[data-cta-role="primary"]')).toHaveCount(1);
        await expect(page.locator('[data-cta-role="secondary"]')).toHaveCount(1);
    }
});

test("second-batch decision pages expose primary and secondary CTA links", async ({ page }) => {
    const pages = [
        "/en/column-calculator.html",
        "/en/footing-calculator.html",
        "/en/rebar-calculator.html",
        "/en/concrete-calculator-yards.html",
        "/en/concrete-calculator-cylinder.html",
        "/en/concrete-curb-calculator.html",
        "/en/concrete-pier-calculator.html",
        "/en/how-much-concrete-for-10x10-slab.html",
        "/en/how-much-concrete-for-12x12-slab.html",
        "/en/how-much-concrete-for-20x20-slab.html",
        "/en/quikrete-bag-calculator.html",
        "/en/sono-tube-calculator.html",
        "/en/stairs-calculator.html"
    ];

    for (const path of pages) {
        await page.goto(path);
        await expect(page.locator('[data-cta-role="primary"]')).toHaveCount(1);
        await expect(page.locator('[data-cta-role="secondary"]')).toHaveCount(1);
    }
});

test("decision block and calculator coexist on page", async ({ page }) => {
    const pages = [
        "/en/slab-calculator.html",
        "/en/bag-calculator.html",
        "/en/concrete-calculator-cost.html",
        "/en/stairs-calculator.html",
        "/en/footing-calculator.html",
        "/en/rebar-calculator.html"
    ];

    for (const path of pages) {
        await page.goto(path);
        await expect(page.locator('#calculator')).toHaveCount(1);
        await expect(page.locator('[data-decision-page]')).toHaveCount(1);
    }
});

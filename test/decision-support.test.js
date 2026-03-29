const test = require("node:test");
const assert = require("node:assert/strict");
const support = require("../decision-support.js");

test("home payload recommends ready-mix for 1+ yard pours", function () {
    const payload = support.getDecisionPayload("home", {
        yd3: 1.23,
        yd3Waste: 1.36,
        bags80: 56,
        bags80Waste: 62,
        readyMixCost: 280,
        bagCost: 336,
        projectLabel: "A 10x10 slab"
    });

    assert.equal(payload.method, "Ready-mix is the safer default");
    assert.match(payload.summary, /10x10 slab/i);
    assert.match(payload.budget, /1\.36 yd³/);
});

test("volume payload uses two-decimal waste rounding in budget copy", function () {
    const payload = support.getDecisionPayload("how-much-concrete", {
        yd3: 1.234567,
        bags80: 56,
        bags80Waste: 62
    });

    assert.match(payload.budget, /1\.36 yd³/);
});

test("bag payload warns when bag counts become impractical", function () {
    const payload = support.getDecisionPayload("bag-calculator", {
        bagsNeeded: 72,
        bagWeight: 80,
        volumeFt3: 43.2,
        volumeYd3: 1.6,
        totalCost: 468
    });

    assert.match(payload.summary, /lot of bagged concrete/i);
    assert.equal(payload.method, "Ready-mix is the safer default");
    assert.match(payload.budget, /\$468/);
});

test("cost payload stays in estimate language", function () {
    const payload = support.getDecisionPayload("cost-calculator", {
        projectType: "patio",
        totalCost: 1850,
        materialsCost: 920,
        laborCost: 930,
        volumeYd3: 2.5,
        costPerSqFt: 8.45,
        deliveryCost: 150
    });

    assert.match(payload.summary, /planning number/i);
    assert.match(payload.budget, /\$8\.45/);
    assert.match(payload.disclaimer, /Regional presets are averages/);
});

test("slab calculator payload turns yardage into a buying plan", function () {
    const payload = support.getDecisionPayload("slab-calculator", {
        yd3: 2.0,
        yd3Waste: 2.2,
        bags80: 90,
        bags80Waste: 99,
        readyMixCost: 420,
        bagCost: 540,
        projectLabel: "This slab pour"
    });

    assert.match(payload.title, /slab/i);
    assert.match(payload.budget, /2\.20 yd³/);
});

test("footing calculator payload keeps footing-specific procurement advice", function () {
    const payload = support.getDecisionPayload("footing-calculator", {
        yd3: 2.22,
        yd3Waste: 2.44,
        bags80: 100,
        bags80Waste: 110,
        readyMixCost: 420,
        bagCost: 600,
        projectLabel: "This footing pour"
    });

    assert.match(payload.title, /footing/i);
    assert.match(payload.summary, /footing/i);
});

test("sono tube payload stays bag-aware for post and pier pours", function () {
    const payload = support.getDecisionPayload("sono-tube-calculator", {
        yd3: 0.52,
        yd3Waste: 0.57,
        bags80: 24,
        bags80Waste: 27,
        readyMixCost: 140,
        bagCost: 144,
        projectLabel: "These sonotube piers"
    });

    assert.match(payload.title, /sono|pier|tube/i);
    assert.match(payload.budget, /0\.57 yd³/);
});

test("12x12 slab payload reflects truck-sized slab guidance", function () {
    const payload = support.getDecisionPayload("slab-12x12", {
        yd3: 1.78,
        yd3Waste: 1.96,
        bags80: 80,
        bags80Waste: 88,
        readyMixCost: 280,
        bagCost: 480,
        projectLabel: "This 12x12 slab"
    });

    assert.match(payload.title, /12x12/i);
    assert.match(payload.budget, /1\.96 yd³/);
});

test("20x20 slab payload stays explicitly ready-mix oriented", function () {
    const payload = support.getDecisionPayload("slab-20x20", {
        yd3: 4.94,
        yd3Waste: 5.43,
        bags80: 223,
        bags80Waste: 246,
        readyMixCost: 700,
        bagCost: 1338,
        projectLabel: "This 20x20 slab"
    });

    assert.match(payload.title, /20x20/i);
    assert.match(payload.method, /Ready-mix/i);
});

test("yards calculator payload focuses on ordering in yards", function () {
    const payload = support.getDecisionPayload("yards-calculator", {
        yd3: 4.94,
        yd3Waste: 5.43,
        bags80: 223,
        bags80Waste: 246,
        readyMixCost: 700,
        bagCost: 1338,
        projectLabel: "This ready-mix order"
    });

    assert.match(payload.title, /yards/i);
    assert.match(payload.highlights[0], /5\.43 yd³/);
});

test("unknown page key returns null", function () {
    assert.equal(support.getDecisionPayload("missing-page", {}), null);
});

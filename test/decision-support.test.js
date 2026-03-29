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

test("unknown page key returns null", function () {
    assert.equal(support.getDecisionPayload("missing-page", {}), null);
});

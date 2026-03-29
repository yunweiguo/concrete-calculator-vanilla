(function (root, factory) {
    const api = factory();
    if (typeof module === "object" && module.exports) {
        module.exports = api;
    }
    root.ConcreteDecisionSupport = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    const thresholds = {
        wasteMultiplier: 1.1,
        readyMixVolumeYards: 1,
        heavyBagCount: 60,
        defaultReadyMixCostPerYard: 140,
        defaultBagCost80: 6,
        smallPourDeliveryThreshold: 3,
        freeDeliveryThreshold: 10
    };

    const pages = {
        home: {
            title: "Turn the result into a buying plan",
            mistakes: [
                "Ordering the exact math result instead of adding waste.",
                "Choosing bagged mix for a pour that is already truck-sized.",
                "Using patio thickness for a load-bearing slab."
            ],
            nextSteps: [
                "Confirm the slab or column dimensions one more time before ordering.",
                "Decide now whether you are hauling bags yourself or calling a supplier.",
                "Keep one note with yards, bag count, and budget range for the store run."
            ]
        },
        "how-much-concrete": {
            title: "What to buy after you know the volume",
            mistakes: [
                "Stopping at cubic yards and forgetting bag count or transport effort.",
                "Using the same waste factor for a clean pad and a messy slope.",
                "Treating national price averages like a supplier quote."
            ],
            nextSteps: [
                "Pick the project thickness that matches the real job, not the cheapest one.",
                "Use the waste-adjusted number when you compare ready-mix and bags.",
                "If the bag count sounds miserable, switch to ready-mix before you shop."
            ]
        },
        "slab-10x10": {
            title: "10x10 slab buying decision",
            mistakes: [
                "Assuming 4 inches works for every 10x10 project.",
                "Forgetting that a hot tub or shed slab changes the thickness decision.",
                "Comparing bag cost without counting your time and extra trips."
            ],
            nextSteps: [
                "Lock the final thickness before you buy anything.",
                "Use the waste-adjusted yardage if you are calling a truck.",
                "If you are mixing bags, plan labor and transport before checkout."
            ]
        },
        "bag-calculator": {
            title: "Decide if bags are still the right move",
            mistakes: [
                "Using a custom bag yield of zero or guessing instead of reading the label.",
                "Treating a 70-plus bag pour like a quick weekend mix.",
                "Forgetting that custom bag math can change store-trip planning."
            ],
            nextSteps: [
                "Read the exact yield printed on the bag if you choose the custom path.",
                "Compare bag count against transport, mixing time, and cleanup effort.",
                "Switch to ready-mix when the bag count stops being practical."
            ]
        },
        "cost-calculator": {
            title: "Turn the estimate into a real quote plan",
            mistakes: [
                "Treating this estimate like a contract price.",
                "Ignoring small-load, pump, or access surcharges in hard jobs.",
                "Leaving stale dimensions in hidden fields after changing project type."
            ],
            nextSteps: [
                "Use the estimate as a budget range, then get supplier or contractor quotes.",
                "Double-check the region, finish, and access multipliers before sharing the number.",
                "Break phased pours into separate estimates if the crew will not place everything at once."
            ]
        }
    };

    function asMoney(value) {
        if (!Number.isFinite(value)) {
            return "Get a local quote";
        }
        return "$" + Math.round(value).toLocaleString();
    }

    function pourMethodForVolume(yd3, bags80) {
        if (yd3 >= thresholds.readyMixVolumeYards || bags80 >= thresholds.heavyBagCount) {
            return "Ready-mix is the safer default";
        }
        return "Bagged mix is still realistic";
    }

    function procurementSummary(yd3, bags80, projectLabel) {
        const label = projectLabel || "This pour";
        if (yd3 >= thresholds.readyMixVolumeYards || bags80 >= thresholds.heavyBagCount) {
            return label + " is already large enough that a short ready-mix order is usually easier than hauling " + bags80 + " bags by hand.";
        }
        return label + " is still small enough that bags can work, but check haul weight and mixing time before you commit.";
    }

    function buildVolumePayload(pageKey, metrics) {
        const page = pages[pageKey];
        const yd3 = Number(metrics.yd3 || 0);
        const yd3Waste = Number(metrics.yd3Waste || yd3 * thresholds.wasteMultiplier);
        const bags80 = Number(metrics.bags80 || 0);
        const bags80Waste = Number(metrics.bags80Waste || Math.ceil(bags80 * thresholds.wasteMultiplier));
        const readyMixCost = Number(metrics.readyMixCost || Math.ceil(yd3) * (metrics.costPerYd3 || thresholds.defaultReadyMixCostPerYard));
        const bagCost = Number(metrics.bagCost || bags80 * thresholds.defaultBagCost80);
        const method = pourMethodForVolume(yd3, bags80);
        const logistics = yd3 < thresholds.smallPourDeliveryThreshold
            ? "Expect a delivery fee or short-load fee on smaller truck orders."
            : "Volume is high enough that truck delivery usually beats repeated bag trips.";

        return {
            title: page.title,
            summary: procurementSummary(yd3, bags80, metrics.projectLabel),
            method: method,
            budget: "Plan around " + yd3Waste.toFixed(2) + " yd³ with waste, about " + bags80Waste + " bags if you mix by hand.",
            logistics: logistics,
            highlights: [
                "Waste-adjusted order: " + yd3Waste.toFixed(2) + " yd³",
                "80 lb bag path: about " + bags80Waste + " bags",
                "Budget snapshot: " + asMoney(readyMixCost) + " ready-mix vs " + asMoney(bagCost) + " in bags"
            ],
            mistakes: page.mistakes,
            nextSteps: page.nextSteps,
            disclaimer: "Use these numbers for planning. Supplier pricing, delivery fees, and site conditions can move the real cost."
        };
    }

    function buildBagPayload(metrics) {
        const page = pages["bag-calculator"];
        const bagsNeeded = Number(metrics.bagsNeeded || 0);
        const bagWeight = Number(metrics.bagWeight || 80);
        const volumeFt3 = Number(metrics.volumeFt3 || 0);
        const volumeYd3 = Number(metrics.volumeYd3 || volumeFt3 / 27);
        const method = pourMethodForVolume(volumeYd3, bagWeight === 80 ? bagsNeeded : Math.ceil(volumeFt3 / 0.6));
        const cost = Number(metrics.totalCost || bagsNeeded * Number(metrics.costPerBag || 0));

        return {
            title: page.title,
            summary: bagsNeeded > thresholds.heavyBagCount
                ? "This is a lot of bagged concrete. You can do it, but you are now in truck-order territory on labor alone."
                : "Bagged concrete is still a practical choice for this volume if transport and mixing time look manageable.",
            method: method,
            budget: cost > 0
                ? "At the current bag price, this run is about " + asMoney(cost) + "."
                : "Count your bags, then sanity-check haul weight and mixing time before checkout.",
            logistics: "Current plan: " + bagsNeeded + " bags at " + bagWeight + " lb each, covering about " + volumeYd3.toFixed(2) + " yd³.",
            highlights: [
                "Bag count: " + bagsNeeded + " bags",
                "Total pour volume: " + volumeYd3.toFixed(2) + " yd³",
                "Custom yield path needs the label number, not a guess"
            ],
            mistakes: page.mistakes,
            nextSteps: page.nextSteps,
            disclaimer: "For large bag counts, compare this plan against a ready-mix quote before you buy."
        };
    }

    function buildCostPayload(metrics) {
        const page = pages["cost-calculator"];
        const projectType = metrics.projectType || "project";
        const totalCost = Number(metrics.totalCost || 0);
        const materialsCost = Number(metrics.materialsCost || 0);
        const laborCost = Number(metrics.laborCost || 0);
        const volumeYd3 = Number(metrics.volumeYd3 || 0);
        const costPerSqFt = Number(metrics.costPerSqFt || 0);
        const deliveryCost = Number(metrics.deliveryCost || 0);

        return {
            title: page.title,
            summary: "This " + projectType + " estimate is a planning number, not a bid. Use it to decide whether to self-perform, shop suppliers, or call a contractor.",
            method: totalCost > 0 ? "Budget range is " + asMoney(totalCost) : "Fill in the dimensions before you trust the estimate",
            budget: costPerSqFt > 0
                ? "Current estimate is about $" + costPerSqFt.toFixed(2) + " per sq ft."
                : "Cost per square foot will appear once the project dimensions are complete.",
            logistics: volumeYd3 < thresholds.smallPourDeliveryThreshold
                ? "Small pours often hide the ugliest delivery fees. Double-check them."
                : "This volume is large enough that supplier and crew scheduling matter as much as unit cost.",
            highlights: [
                "Materials: " + asMoney(materialsCost),
                "Labor: " + asMoney(laborCost),
                "Delivery line: " + asMoney(deliveryCost)
            ],
            mistakes: page.mistakes,
            nextSteps: page.nextSteps,
            disclaimer: "Regional presets are averages. Replace them with local quotes before promising a customer or locking a budget."
        };
    }

    function getDecisionPayload(pageKey, metrics) {
        if (!pages[pageKey]) {
            return null;
        }

        if (pageKey === "bag-calculator") {
            return buildBagPayload(metrics || {});
        }
        if (pageKey === "cost-calculator") {
            return buildCostPayload(metrics || {});
        }
        return buildVolumePayload(pageKey, metrics || {});
    }

    return {
        thresholds: thresholds,
        pages: pages,
        getDecisionPayload: getDecisionPayload,
        pourMethodForVolume: pourMethodForVolume
    };
}));

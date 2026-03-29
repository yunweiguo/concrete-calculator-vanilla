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
        "slab-12x12": {
            title: "12x12 slab buying decision",
            mistakes: [
                "Treating a 12x12 slab like a small hand-mix job once waste is included.",
                "Choosing 4 inches for every use case, including heavier pads.",
                "Comparing bag cost without pricing the wasted time and hauling effort."
            ],
            nextSteps: [
                "Confirm whether the slab is patio-grade or load-bearing before ordering.",
                "Use the waste-adjusted volume when you compare ready-mix and bags.",
                "If the bag count is already above a comfortable weekend mix, switch methods now."
            ]
        },
        "slab-20x20": {
            title: "20x20 slab truck-order decision",
            mistakes: [
                "Pretending a 20x20 slab is still a bag job because bags look cheaper per unit.",
                "Ignoring how quickly extra thickness pushes the order into multiple truck considerations.",
                "Using a copied small-slab budget range for a much larger pour."
            ],
            nextSteps: [
                "Lock thickness and reinforcement assumptions before pricing anything.",
                "Use the total with waste to discuss delivery and sequencing with suppliers.",
                "Treat bag calculations as a sanity check, not the default plan."
            ]
        },
        "slab-calculator": {
            title: "Turn slab volume into a buying plan",
            mistakes: [
                "Using patio thickness for a driveway or garage slab.",
                "Comparing bag cost without counting trips, haul weight, and mixing time.",
                "Ordering the clean math result instead of the waste-adjusted slab number."
            ],
            nextSteps: [
                "Lock thickness before you compare ready-mix and bags.",
                "Use the waste-adjusted slab volume when you price the order.",
                "If labor matters more than ticket price, bias toward ready-mix sooner."
            ]
        },
        "footing-calculator": {
            title: "Footing pour buying decision",
            mistakes: [
                "Forgetting that footing depth and width are structural choices, not price levers.",
                "Using bag math without thinking about repeated footing pours and staging.",
                "Treating one footing estimate like the total job when multiple footings are planned."
            ],
            nextSteps: [
                "Confirm the footing dimensions against local code or engineering notes.",
                "Multiply the footing plan across the real footing count before ordering.",
                "If access is tight, compare truck delivery against mixing in stages."
            ]
        },
        "sono-tube-calculator": {
            title: "Plan the sonotube pour before you buy",
            mistakes: [
                "Guessing tube diameter instead of using the actual form size.",
                "Ignoring tube count and only pricing one pier.",
                "Buying the exact bag count with no extra for depth variation or spill."
            ],
            nextSteps: [
                "Confirm diameter, depth, and quantity before you price anything.",
                "Use the total yards if multiple piers make the pour feel truck-sized.",
                "Add extra bags if hole depth or tube cut length may vary in the field."
            ]
        },
        "yards-calculator": {
            title: "Turn cubic yards into an order plan",
            mistakes: [
                "Stopping at net yards and forgetting the waste-adjusted order size.",
                "Treating truck count as the whole logistics plan when access and short-load fees also matter.",
                "Using a yardage number without checking whether the shape and dimensions were entered correctly."
            ],
            nextSteps: [
                "Use the total yards with waste when you call a supplier.",
                "Ask about delivery minimums, short-load fees, and access before you lock the order.",
                "If the total is close to a truck threshold, sanity-check the dimensions one more time."
            ]
        },
        "column-calculator": {
            title: "Round column buying decision",
            mistakes: [
                "Ordering for one column and forgetting the full column count.",
                "Treating a round-column pour like a generic slab order without checking bag practicality.",
                "Using diameter and height from the form label instead of the real inside dimensions."
            ],
            nextSteps: [
                "Confirm inside diameter, height, and quantity before pricing the pour.",
                "Use the total with waste when you compare ready-mix against bag count.",
                "If several columns land in the same pour window, price them as one order."
            ]
        },
        "pier-calculator": {
            title: "Pier and drilled-shaft buying decision",
            mistakes: [
                "Ignoring bell volume when the pier has an enlarged base.",
                "Pricing one pier and forgetting the total pier count.",
                "Buying the exact shaft math with no field margin for irregular holes."
            ],
            nextSteps: [
                "Confirm whether the job includes a belled base before ordering.",
                "Price the total waste-adjusted volume across all piers together.",
                "If the pier count grows, compare bag hauling against one coordinated truck order."
            ]
        },
        "cylinder-calculator": {
            title: "Cylinder pour buying decision",
            mistakes: [
                "Using outside diameter instead of the real inside diameter of the form.",
                "Forgetting that quantity multiplies the bag count faster than expected.",
                "Stopping at volume without checking how many bags that volume actually means."
            ],
            nextSteps: [
                "Confirm diameter, height, and quantity from the actual forms or holes.",
                "Use the waste-adjusted yards when you compare delivery with bags.",
                "If several cylinders are being poured together, treat them as one procurement decision."
            ]
        },
        "quikrete-bag-calculator": {
            title: "Quikrete buying decision",
            mistakes: [
                "Using the label weight without checking the actual bag yield.",
                "Treating a 40-plus bag weekend pour like a quick store run.",
                "Comparing bag count without pricing the full cart total first."
            ],
            nextSteps: [
                "Confirm the exact Quikrete bag size you can actually buy locally.",
                "Use the bag count to plan haul weight, mixing time, and cleanup before checkout.",
                "If the count feels ugly, compare it with a small ready-mix quote before buying."
            ]
        },
        "rebar-calculator": {
            title: "Turn the rebar grid into a buy list",
            mistakes: [
                "Stopping at total length and forgetting piece count and lap waste.",
                "Using spacing from a random online example instead of the project notes or code.",
                "Pricing reinforcement by length when the yard only sells full sticks."
            ],
            nextSteps: [
                "Confirm the rebar size and spacing against the actual slab requirement.",
                "Price the layout as pieces if the supplier sells full lengths only.",
                "Add chairs, tie wire, and lap waste before turning this into a purchase run."
            ]
        },
        "curb-calculator": {
            title: "Curb pour ordering decision",
            mistakes: [
                "Forgetting that the gutter pan changes the order more than expected.",
                "Using the clean yardage instead of the waste-adjusted curb run total.",
                "Planning bags for a long curb run without checking labor and staging."
            ],
            nextSteps: [
                "Confirm curb, gutter, and total run length before ordering.",
                "Use the waste-adjusted yards when you compare delivery against bag hauling.",
                "If multiple curb runs will pour together, price them as one material order."
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
        const pageKey = metrics.pageKey || "bag-calculator";
        const page = pages[pageKey] || pages["bag-calculator"];
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

    function buildRebarPayload(metrics) {
        const page = pages["rebar-calculator"];
        const totalLength = Number(metrics.totalLength || 0);
        const totalWeight = Number(metrics.totalWeight || 0);
        const totalPieces = Number(metrics.totalPieces || 0);
        const spacing = Number(metrics.spacing || 0);
        const costTotal = Number(metrics.costTotal || 0);
        const lengthUnit = metrics.lengthUnit || "ft";
        const weightUnit = metrics.weightUnit || "lbs";
        const spacingUnit = metrics.spacingUnit || (lengthUnit === "m" ? "mm" : "in");
        const method = totalPieces >= 25
            ? "Buy around " + totalPieces + " full pieces first, then sanity-check linear footage."
            : "A small slab grid can still be bought as " + totalPieces + " pieces without turning into a yard trip.";

        return {
            title: page.title,
            summary: "This slab grid needs " + totalPieces + " pieces across both directions. Turn that layout into a buy list before you price anything.",
            method: method,
            budget: costTotal > 0
                ? "Current reinforcement budget is about " + asMoney(costTotal) + "."
                : "Price both per-piece and per-length if your supplier quotes them differently.",
            logistics: "Current layout: " + totalLength.toFixed(1) + " " + lengthUnit + " of rebar, about " + totalWeight.toFixed(1) + " " + weightUnit + ", spaced at " + spacing + " " + spacingUnit + ".",
            highlights: [
                "Procurement summary: " + totalPieces + " pieces across the grid",
                "Total steel: " + totalLength.toFixed(1) + " " + lengthUnit + " and " + totalWeight.toFixed(1) + " " + weightUnit,
                "Spacing check: " + spacing + " " + spacingUnit + " on center"
            ],
            mistakes: page.mistakes,
            nextSteps: page.nextSteps,
            disclaimer: "This is a planning layout only. Structural rebar size, spacing, lap splice, and cover still need code or engineering review."
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

        if (pageKey === "bag-calculator" || pageKey === "quikrete-bag-calculator") {
            return buildBagPayload(Object.assign({}, metrics || {}, { pageKey: pageKey }));
        }
        if (pageKey === "cost-calculator") {
            return buildCostPayload(metrics || {});
        }
        if (pageKey === "rebar-calculator") {
            return buildRebarPayload(metrics || {});
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

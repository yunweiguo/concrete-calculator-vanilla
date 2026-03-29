(function (root, factory) {
    const api = factory(root);
    root.ConcretePageCore = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function (root) {
    const onceKeys = {};

    function runWhenReady(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    }

    function bindMenuToggle(buttonId, menuId) {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        if (!button || !menu) {
            return;
        }

        button.addEventListener("click", function (event) {
            event.stopPropagation();
            menu.classList.toggle("hidden");
        });

        document.addEventListener("click", function () {
            menu.classList.add("hidden");
        });
    }

    function highlightCurrentPath() {
        const currentPath = window.location.pathname;
        document.querySelectorAll("#calculators-menu a, #mobile-menu a").forEach(function (link) {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("text-brand-primary", "font-bold", "bg-slate-100");
            } else {
                link.classList.remove("text-brand-primary", "font-bold", "bg-slate-100");
            }
        });
    }

    function bindNavigationMenus() {
        bindMenuToggle("calculators-menu-button", "calculators-menu");
        bindMenuToggle("guides-menu-button", "guides-menu");
        bindMenuToggle("language-menu-button", "language-menu");

        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener("click", function () {
                mobileMenu.classList.toggle("hidden");
            });
        }

        highlightCurrentPath();
    }

    function replaceFragment(id, url) {
        const node = document.getElementById(id);
        if (!node) {
            return Promise.resolve();
        }

        return fetch(url)
            .then(function (response) { return response.text(); })
            .then(function (html) {
                node.outerHTML = html;
            })
            .catch(function (error) {
                console.error("Failed to load fragment", url, error);
            });
    }

    function initStandardChrome(locale) {
        const lang = locale || "en";
        runWhenReady(function () {
            replaceFragment("header-include", "/" + lang + "/header.html").then(bindNavigationMenus);
            replaceFragment("footer-include", "/" + lang + "/footer.html");
        });
    }

    function compactParams(params) {
        const next = {};
        Object.keys(params || {}).forEach(function (key) {
            if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
                next[key] = params[key];
            }
        });
        return next;
    }

    function trackEvent(name, params) {
        if (typeof root.gtag !== "function") {
            return;
        }
        root.gtag("event", name, compactParams(params));
    }

    function trackOnce(key, name, params) {
        if (onceKeys[key]) {
            return;
        }
        onceKeys[key] = true;
        trackEvent(name, params);
    }

    function inferCalculatorType(pageKey) {
        if (pageKey.indexOf("bag") !== -1) return "bag";
        if (pageKey.indexOf("cost") !== -1) return "cost";
        if (pageKey.indexOf("rebar") !== -1) return "rebar";
        if (pageKey.indexOf("yard") !== -1) return "yards";
        return "volume";
    }

    function trackCalculatorRun(pageKey, metrics) {
        trackOnce("calculator_run:" + pageKey, "calculator_run", {
            page_key: pageKey,
            calculator_type: inferCalculatorType(pageKey),
            shape: metrics && (metrics.shape || metrics.projectType),
            unit_system: metrics && (metrics.unitSystem || metrics.unit_system)
        });
    }

    function setupDecisionVisibilityTracking() {
        const sections = Array.from(document.querySelectorAll("[data-decision-page]"));
        if (!sections.length || typeof IntersectionObserver !== "function") {
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                const pageKey = entry.target.dataset.decisionPage;
                trackOnce("decision_block_seen:" + pageKey, "decision_block_seen", {
                    page_key: pageKey
                });
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.4 });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    function setupDecisionCtaTracking() {
        document.addEventListener("click", function (event) {
            const link = event.target.closest("[data-cta-role]");
            if (!link) {
                return;
            }

            const section = link.closest("[data-decision-page]");
            const pageKey = section ? section.dataset.decisionPage : "";
            const href = link.getAttribute("href") || "";

            trackEvent(link.dataset.ctaRole === "primary" ? "decision_cta_click" : "secondary_cta_click", {
                page_key: pageKey,
                cta_id: link.dataset.ctaId || link.dataset.ctaRole,
                cta_label: (link.textContent || "").trim(),
                target_path: href
            });

            if (/calculator|how-much-concrete/i.test(href)) {
                trackEvent("related_calc_click", {
                    page_key: pageKey,
                    target_page: href
                });
            }
        });
    }

    runWhenReady(function () {
        setupDecisionVisibilityTracking();
        setupDecisionCtaTracking();
    });

    function updateTextNode(section, slot, value) {
        const node = section.querySelector('[data-decision-slot="' + slot + '"]');
        if (node && typeof value === "string") {
            node.textContent = value;
        }
    }

    function updateList(section, listName, values) {
        const list = section.querySelector('[data-decision-list="' + listName + '"]');
        if (!list || !Array.isArray(values)) {
            return;
        }

        const items = Array.from(list.querySelectorAll("[data-decision-item]"));
        items.forEach(function (item, index) {
            const nextValue = values[index];
            if (nextValue) {
                item.textContent = nextValue;
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    }

    function updateDecisionBlock(pageKey, metrics) {
        if (!root.ConcreteDecisionSupport) {
            return null;
        }

        const section = document.querySelector('[data-decision-page="' + pageKey + '"]');
        if (!section) {
            return null;
        }

        const payload = root.ConcreteDecisionSupport.getDecisionPayload(pageKey, metrics);
        if (!payload) {
            return null;
        }

        updateTextNode(section, "title", payload.title);
        updateTextNode(section, "summary", payload.summary);
        updateTextNode(section, "method", payload.method);
        updateTextNode(section, "budget", payload.budget);
        updateTextNode(section, "logistics", payload.logistics);
        updateTextNode(section, "disclaimer", payload.disclaimer);
        updateList(section, "highlights", payload.highlights);
        updateList(section, "mistakes", payload.mistakes);
        updateList(section, "next-steps", payload.nextSteps);

        return payload;
    }

    return {
        initStandardChrome: initStandardChrome,
        bindNavigationMenus: bindNavigationMenus,
        updateDecisionBlock: updateDecisionBlock,
        trackEvent: trackEvent,
        trackCalculatorRun: trackCalculatorRun
    };
}));

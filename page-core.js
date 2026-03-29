(function (root, factory) {
    const api = factory(root);
    root.ConcretePageCore = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function (root) {
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
        updateDecisionBlock: updateDecisionBlock
    };
}));

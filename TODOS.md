# TODOs

## Expand Decision-Page Pattern To Remaining High-Intent English Pages

- What: Apply the validated decision-page pattern to the remaining high-intent English pages after the first five-page batch lands.
- Why: The first batch establishes the content contract, shared decision source, and enhancement pattern. Without a tracked follow-up, the site will drift back into page-by-page ad hoc edits.
- Pros: Reuses the new shared content source and enhancer, improves consistency across high-intent entry pages, and compounds the product-value upgrade beyond the first batch.
- Cons: Creates a second wave of content and page-structure work, and should not start until the first batch proves stable.
- Context: Candidate pages include `en/slab-calculator.html`, `en/footing-calculator.html`, `en/sono-tube-calculator.html`, `en/how-much-concrete-for-12x12-slab.html`, and `en/how-much-concrete-for-20x20-slab.html`. Prioritize pages with strong bags/cost/ready-mix decision intent.
- Depends on / blocked by: The first five-page rollout must land first, and the shared decision-content contract should be stable before expanding.

## Add CI Execution Path For Playwright Regression Suite

- What: Add a minimal CI path that runs the new Playwright regression suite after the local test layer is stable.
- Why: Browser regression tests are only useful if they run somewhere other than one laptop. Without CI, they will decay into a one-time setup artifact.
- Pros: Makes regression protection durable, catches drift on future edits, and gives the review/ship pipeline a real signal instead of a manual promise.
- Cons: Adds repo-level Node and runner setup, plus a small amount of workflow maintenance.
- Context: The first implementation should keep Playwright local and narrow. Once the suite is stable, wire it into GitHub Actions or an equivalent CI path that at least runs the five critical-page checks.
- Depends on / blocked by: The local Playwright suite and contract/schema checks must pass consistently before CI integration.

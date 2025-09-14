#!/bin/bash

# Script to add minimal static header and footer to HTML pages
# This ensures SEO and basic functionality for users without JavaScript

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting to add minimal static headers and footers...${NC}"

# Minimal header template
MINIMAL_HEADER='        <!-- Minimal header for SEO and users without JavaScript -->
        <header class="bg-white/80 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200">
            <nav class="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
                <a href="/" class="flex items-center gap-2">
                    <svg class="h-8 w-8 text-white bg-brand-primary p-1 rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    <span class="font-bold text-xl text-slate-900">Concrete Calculator</span>
                </a>
                <a href="/zh/" class="text-slate-600 hover:text-brand-primary font-semibold">中文</a>
            </nav>
        </header>
        <noscript>
            <div class="bg-yellow-50 border-b border-yellow-200 p-2 text-center text-sm text-yellow-800">
                For the best experience, please enable JavaScript. Some features may be limited.
            </div>
        </noscript>'

# Minimal footer template
MINIMAL_FOOTER='        <!-- Minimal footer for SEO and users without JavaScript -->
        <footer class="bg-slate-800 text-slate-300 mt-20 md:mt-32">
            <div class="container mx-auto px-4 lg:px-6 py-8">
                <div class="text-center">
                    <p class="font-bold text-lg text-white">Concrete Calculator</p>
                    <p class="text-sm text-slate-400 mt-1">Free online concrete calculator for construction projects</p>
                    <div class="mt-4">
                        <a href="/privacy-policy.html" class="text-slate-400 hover:text-white transition-colors px-3">Privacy Policy</a>
                        <span class="text-slate-500">|</span>
                        <a href="/terms-of-service.html" class="text-slate-400 hover:text-white transition-colors px-3">Terms of Service</a>
                    </div>
                    <div class="border-t border-slate-700 mt-6 pt-6">
                        <p class="text-sm text-slate-500">&copy; 2024 Concrete Calculator. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>'

# Function to add minimal content to a file
add_minimal_content() {
    local file="$1"
    local is_zh="$2"
    
    if [ ! -f "$file" ]; then
        echo -e "${RED}File not found: $file${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}Processing: $file${NC}"
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Update header
    if [ "$is_zh" = true ]; then
        # For Chinese pages, update language link
        sed -i '' 's|<a href="/zh/"|<a href="/"|g' "$file"
        sed -i '' 's|中文</a>|English</a>|g' "$file"
        sed -i '' 's|For the best experience|请启用 JavaScript 以获得最佳体验|g' "$file"
        sed -i '' 's|Some features may be limited|某些功能可能受限|g' "$file"
    fi
    
    # Replace existing header content with minimal version
    sed -i '' '/<div id="header-include">/,/<\/div>/c\
    <div id="header-include">\
        '"$MINIMAL_HEADER"'\
    </div>' "$file"
    
    # Replace existing footer content with minimal version  
    sed -i '' '/<div id="footer-include">/,/<\/div>/c\
    <div id="footer-include">\
        '"$MINIMAL_FOOTER"'\
    </div>' "$file"
    
    echo -e "${GREEN}Updated: $file${NC}"
}

# English pages
EN_PAGES=(
    "en/404.html"
    "en/bag-calculator.html"
    "en/case-studies.html"
    "en/column-calculator.html"
    "en/concrete-calculator-cost.html"
    "en/concrete-calculator-cylinder.html"
    "en/concrete-calculator-yards.html"
    "en/faq.html"
    "en/footing-calculator.html"
    "en/glossary.html"
    "en/guides/concrete-bag-guide.html"
    "en/guides/how-to-calculate-concrete.html"
    "en/privacy-policy.html"
    "en/quikrete-bag-calculator.html"
    "en/rebar-calculator.html"
    "en/slab-calculator.html"
    "en/stairs-calculator.html"
    "en/terms-of-service.html"
)

# Chinese pages
ZH_PAGES=(
    "zh/404.html"
    "zh/bag-calculator.html"
    "zh/case-studies.html"
    "zh/column-calculator.html"
    "zh/concrete-calculator-cost.html"
    "zh/concrete-calculator-cylinder.html"
    "zh/concrete-calculator-formula.html"
    "zh/concrete-calculator-yards.html"
    "zh/faq.html"
    "zh/footing-calculator.html"
    "zh/glossary.html"
    "zh/guides/how-to-calculate-concrete.html"
    "zh/privacy-policy.html"
    "zh/rebar-calculator.html"
    "zh/slab-calculator.html"
    "zh/stairs-calculator.html"
    "zh/terms-of-service.html"
)

# Process English pages
for page in "${EN_PAGES[@]}"; do
    if [ -f "$page" ]; then
        add_minimal_content "$page" false
    else
        echo -e "${RED}English page not found: $page${NC}"
    fi
done

# Process Chinese pages
for page in "${ZH_PAGES[@]}"; do
    if [ -f "$page" ]; then
        add_minimal_content "$page" true
    else
        echo -e "${RED}Chinese page not found: $page${NC}"
    fi
done

echo -e "${GREEN}Minimal static headers and footers have been added to all pages!${NC}"
echo -e "${YELLOW}Backup files created with .backup extension${NC}"
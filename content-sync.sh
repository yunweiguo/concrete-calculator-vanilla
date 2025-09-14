#!/bin/bash

# Content Sync Script for Concrete Calculator
# This script ensures consistency between static and dynamic header/footer content

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Concrete Calculator Content Sync Tool ===${NC}"
echo

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -f "script.js" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Function to extract navigation links from dynamic header
extract_dynamic_links() {
    local header_file="$1"
    local is_zh="$2"
    
    if [ ! -f "$header_file" ]; then
        echo -e "${RED}Header file not found: $header_file${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}Extracting navigation links from $header_file${NC}"
    
    # Extract calculator links
    if [ "$is_zh" = true ]; then
        grep -o 'href="[^"]*calculator[^"]*\.html"[^>]*>[^<]*</a>' "$header_file" | head -6
    else
        grep -o 'href="[^"]*calculator[^"]*\.html"[^>]*>[^<]*</a>' "$header_file" | head -6
    fi
}

# Function to check consistency between files
check_consistency() {
    echo -e "${YELLOW}Checking content consistency...${NC}"
    
    local issues_found=0
    
    # Check if all HTML files have minimal static content
    echo "Checking for minimal static headers and footers..."
    
    # Find all HTML files (excluding components)
    find . -name "*.html" -not -path "./components/*" -not -name "header.html" -not -name "footer.html" | while read -r file; do
        if ! grep -q "Minimal header for SEO" "$file"; then
            echo -e "${RED}Missing minimal header in: $file${NC}"
            issues_found=$((issues_found + 1))
        fi
        
        if ! grep -q "Minimal footer for SEO" "$file"; then
            echo -e "${RED}Missing minimal footer in: $file${NC}"
            issues_found=$((issues_found + 1))
        fi
    done
    
    # Check for language consistency
    echo "Checking language link consistency..."
    if grep -r "中文</a>" en/ | grep -v "backup" > /dev/null; then
        echo -e "${RED}Found Chinese language links in English pages${NC}"
        issues_found=$((issues_found + 1))
    fi
    
    if grep -r "English</a>" zh/ | grep -v "backup" > /dev/null; then
        echo -e "${RED}Found English language links in Chinese pages${NC}"
        issues_found=$((issues_found + 1))
    fi
    
    if [ $issues_found -eq 0 ]; then
        echo -e "${GREEN}✓ All consistency checks passed!${NC}"
        return 0
    else
        echo -e "${RED}✗ Found $issues_found consistency issues${NC}"
        return 1
    fi
}

# Function to update sitemap
update_sitemap() {
    echo -e "${YELLOW}Updating sitemap...${NC}"
    
    if [ -f "generate_sitemap.sh" ]; then
        ./generate_sitemap.sh
        echo -e "${GREEN}✓ Sitemap updated successfully${NC}"
    else
        echo -e "${RED}generate_sitemap.sh not found${NC}"
        return 1
    fi
}

# Function to validate HTML structure
validate_html() {
    echo -e "${YELLOW}Validating HTML structure...${NC}"
    
    local html_errors=0
    
    # Find all HTML files
    find . -name "*.html" -not -path "./components/*" -not -name "*.backup" | while read -r file; do
        # Check for basic HTML structure
        if ! grep -q "<!DOCTYPE html>" "$file"; then
            echo -e "${RED}Missing DOCTYPE in: $file${NC}"
            html_errors=$((html_errors + 1))
        fi
        
        # Check for proper head section
        if ! grep -q "<head>" "$file" || ! grep -q "</head>" "$file"; then
            echo -e "${RED}Incomplete head section in: $file${NC}"
            html_errors=$((html_errors + 1))
        fi
        
        # Check for proper body section
        if ! grep -q "<body>" "$file" || ! grep -q "</body>" "$file"; then
            echo -e "${RED}Incomplete body section in: $file${NC}"
            html_errors=$((html_errors + 1))
        fi
    done
    
    if [ $html_errors -eq 0 ]; then
        echo -e "${GREEN}✓ HTML validation passed!${NC}"
        return 0
    else
        echo -e "${RED}✗ Found $html_errors HTML validation errors${NC}"
        return 1
    fi
}

# Function to show status
show_status() {
    echo -e "${BLUE}=== Current Status ===${NC}"
    
    # Count HTML files
    local total_files=$(find . -name "*.html" -not -path "./components/*" -not -name "*.backup" | wc -l)
    local en_files=$(find en/ -name "*.html" -not -name "*.backup" 2>/dev/null | wc -l)
    local zh_files=$(find zh/ -name "*.html" -not -name "*.backup" 2>/dev/null | wc -l)
    
    echo "Total HTML files: $total_files"
    echo "English files: $en_files"
    echo "Chinese files: $zh_files"
    
    # Check backup files
    local backup_files=$(find . -name "*.backup" | wc -l)
    if [ $backup_files -gt 0 ]; then
        echo "Backup files: $backup_files"
    fi
    
    # Check sitemap
    if [ -f "sitemap.xml" ]; then
        local sitemap_urls=$(grep -c "<loc>" sitemap.xml)
        echo "Sitemap URLs: $sitemap_urls"
    fi
    
    echo
}

# Main menu
show_menu() {
    echo -e "${BLUE}=== Content Sync Menu ===${NC}"
    echo "1. Check consistency"
    echo "2. Update sitemap"
    echo "3. Validate HTML"
    echo "4. Show status"
    echo "5. Extract dynamic links (English)"
    echo "6. Extract dynamic links (Chinese)"
    echo "7. Run all checks"
    echo "8. Exit"
    echo
    read -p "Select an option (1-8): " choice
}

# Main loop
while true; do
    show_menu
    
    case $choice in
        1)
            check_consistency
            ;;
        2)
            update_sitemap
            ;;
        3)
            validate_html
            ;;
        4)
            show_status
            ;;
        5)
            extract_dynamic_links "en/header.html" false
            ;;
        6)
            extract_dynamic_links "zh/header.html" true
            ;;
        7)
            echo -e "${YELLOW}Running all checks...${NC}"
            check_consistency
            update_sitemap
            validate_html
            show_status
            ;;
        8)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            ;;
    esac
    
    echo
    read -p "Press Enter to continue..."
    echo
done
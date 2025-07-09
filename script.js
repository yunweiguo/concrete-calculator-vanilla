document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GLOBAL STATE & CONFIG ---
    let currentUnit = 'imperial';
    let currentShape = 'rectangle'; // Default shape
    let history = JSON.parse(localStorage.getItem('concreteHistory')) || [];
    window.latestResults = null; // Use a window-scoped object for recent results
    
    const languageData = {
        en: { name: 'English' },
        zh: { name: '中文' },
        es: { name: 'Español' },
    };

    // --- 2. UNIVERSAL LANGUAGE MANAGEMENT ---
    const getLanguage = () => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        return translations[browserLang] ? browserLang : 'en';
    };

    const setLanguage = (lang) => {
        if (typeof translations === 'undefined' || !translations[lang]) {
            console.error(`Translations for language '${lang}' not found.`);
            return;
        }
        
        // Set preference and document language attribute
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        // Update all elements with a data-i18n-key
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            const translation = translations[lang][key] || translations['en'][key];
            if (translation) {
                element.innerHTML = translation;
            }
        });
        
        // Update the language switcher display text
        const langSwitcherSpan = document.getElementById('current-language-name');
        if (langSwitcherSpan && languageData[lang]) {
            langSwitcherSpan.textContent = languageData[lang].name;
        }

        // Re-render any dynamic content that depends on language
        if (typeof renderHistory === 'function') renderHistory();
        if (window.latestResults && typeof displayResults === 'function') {
            displayResults(window.latestResults);
        }
        if (typeof clearResults === 'function' && !window.latestResults) {
            clearResults();
        }
    };

    // --- 3. UNIVERSAL NAVIGATION & UI LOGIC ---
    const setupNavigation = () => {
        const dropdown = document.getElementById('calculators-dropdown');
        const dropdownMenu = document.getElementById('calculators-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        // Desktop dropdown menu
        if (dropdown && dropdownMenu) {
            let leaveTimeout;
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(leaveTimeout);
                dropdownMenu.classList.remove('hidden');
            });
            dropdown.addEventListener('mouseleave', () => {
                leaveTimeout = setTimeout(() => {
                    dropdownMenu.classList.add('hidden');
                }, 200);
            });
        }
        
        // Mobile hamburger menu
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
        
        // Language switcher
        const languageMenuButton = document.getElementById('language-menu-button');
        const languageMenu = document.getElementById('language-menu');
        if (languageMenuButton && languageMenu) {
            languageMenuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('hidden');
            });
            languageMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' && e.target.dataset.lang) {
                    e.preventDefault();
                    setLanguage(e.target.dataset.lang);
                    languageMenu.classList.add('hidden');
                }
            });
            document.addEventListener('click', (e) => {
                if (!languageMenu.contains(e.target) && !languageMenuButton.contains(e.target)) {
                    languageMenu.classList.add('hidden');
                }
            });
        }
    };

    // --- 4. PAGE-SPECIFIC CALCULATOR LOGIC ---
    
    // Helper to safely parse input values
    const parseOrDefault = (elementId, defaultValue) => {
        const el = document.getElementById(elementId);
        if (!el) return defaultValue;
        const value = parseFloat(el.value);
        return isNaN(value) || value <= 0 ? defaultValue : value;
    };
    
    const clearResults = () => {
        const resultsOutput = document.getElementById('results-output');
        if (!resultsOutput) return;

        const lang = getLanguage();
        const t = (key) => translations[lang]?.[key] || translations['en'][key];
        
        let placeholderHtml = `
            <svg class="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3.333A3.333 3.333 0 0012.667 11H11.333A3.333 3.333 0 008 13.667V17m0-10a3 3 0 013-3h2a3 3 0 013 3v1.333A3.333 3.333 0 0117.333 11H6.667A3.333 3.333 0 014.333 8.333V7a3 3 0 013-3z"></path></svg>
            <p class="font-semibold text-slate-500">${t('results_placeholder_title')}</p>
            <p class="text-sm text-slate-400">${t('results_placeholder_subtitle')}</p>
        `;

        if(document.body.classList.contains('bag-calculator-page')) {
             placeholderHtml = `
                <svg class="w-16 h-16 text-slate-300 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>
                <p class="text-sm text-slate-400">${t('results_placeholder_subtitle')}</p>
            `;
        }

        resultsOutput.innerHTML = placeholderHtml;

        const copyBtn = document.getElementById('copy-btn');
        const saveBtn = document.getElementById('save-btn');
        if(copyBtn) copyBtn.disabled = true;
        if(saveBtn) saveBtn.disabled = true;
        
        window.latestResults = null;
    };

    const updateLabels = () => {
        const distUnit = currentUnit === 'imperial' ? 'ft' : 'm';
        const weightUnit = currentUnit === 'imperial' ? 'lb' : 'kg';
        document.querySelectorAll('.unit-label-dist').forEach(label => label.textContent = distUnit);
        document.querySelectorAll('.unit-label-weight').forEach(label => label.textContent = weightUnit);
    };

    const toggleInputs = () => {
        const rectangleInputs = document.getElementById('rectangle-inputs');
        const widthInputs = document.getElementById('width-inputs');
        const circleInputs = document.getElementById('circle-inputs');

        if (!rectangleInputs || !circleInputs) return;

        if (currentShape === 'rectangle') {
            rectangleInputs.style.display = 'block';
            if(widthInputs) widthInputs.style.display = 'block'; // Footing calc doesn't have this
            circleInputs.style.display = 'none';
        } else {
            rectangleInputs.style.display = 'none';
            if(widthInputs) widthInputs.style.display = 'none';
            circleInputs.style.display = 'block';
        }
    };
    
    // This is the core calculation logic
    const calculateResults = (inputs) => {
        let volume = 0;
        if (inputs.shape === 'rectangle') {
            volume = (inputs.length || 0) * (inputs.width || 0) * (inputs.height || 0);
        } else { // Circle
            const radius = (inputs.diameter / 2) || inputs.radius || 0;
            volume = Math.PI * Math.pow(radius, 2) * (inputs.height || 0);
        }

        let volumeFt3, volumeM3, volumeYd3;
        if (inputs.unit === 'imperial') {
            volumeFt3 = volume;
            volumeYd3 = volume / 27;
            volumeM3 = volume * 0.0283168;
        } else {
            volumeM3 = volume;
            volumeFt3 = volume * 35.3147;
            volumeYd3 = volume * 1.30795;
        }
        
        const gradeRatio = {
            C15: { cement: 1, sand: 2, gravel: 4, total: 7 },
            C20: { cement: 1, sand: 1.5, gravel: 3, total: 5.5 },
            C25: { cement: 1, sand: 1, gravel: 2, total: 4 },
            C30: { cement: 1, sand: 1, gravel: 2, total: 4 }
        };
        const ratio = gradeRatio[inputs.grade] || gradeRatio.C25;

        const cementVolumeM3 = volumeM3 * (ratio.cement / ratio.total);
        const sandVolumeM3 = volumeM3 * (ratio.sand / ratio.total);
        const gravelVolumeM3 = volumeM3 * (ratio.gravel / ratio.total);

        const materials = {
            cementKg: cementVolumeM3 * 1440,
            sandKg: sandVolumeM3 * 1600,
            gravelKg: gravelVolumeM3 * 1550,
        };
        materials.cementLbs = materials.cementKg * 2.20462;
        materials.sandLbs = materials.sandKg * 2.20462;
        materials.gravelLbs = materials.gravelKg * 2.20462;
        
        // Cost estimation (prices are placeholders)
        const prices = {
            cementPerKg: 0.25, // USD
            sandPerKg: 0.05,
            gravelPerKg: 0.05,
            laborPerHour: 40,
            hoursPerM3: 4
        };
        const cost = {
            materials: (materials.cementKg * prices.cementPerKg) + (materials.sandKg * prices.sandPerKg) + (materials.gravelKg * prices.gravelPerKg),
            labor: volumeM3 * prices.hoursPerM3 * prices.laborPerHour
        };
        cost.total = cost.materials + cost.labor;

        // Bag calculation
        const bagYieldsFt3 = { '40': 0.3, '60': 0.45, '80': 0.6 };
        const bags = {
            '40': Math.ceil(volumeFt3 / bagYieldsFt3['40']),
            '60': Math.ceil(volumeFt3 / bagYieldsFt3['60']),
            '80': Math.ceil(volumeFt3 / bagYieldsFt3['80']),
        };

        return { ...inputs, volumeFt3, volumeYd3, volumeM3, materials, cost, bags };
    };
    
    // Universal display function
    const displayResults = (results) => {
        const resultsOutput = document.getElementById('results-output');
        if(!resultsOutput) return;

        window.latestResults = results;
        const lang = getLanguage();
        const t = (key) => translations[lang]?.[key] || translations['en'][key];
        const isImperial = results.unit === 'imperial';
        
        let html;
        if(document.body.classList.contains('bag-calculator-page')) {
            // Bag calculator specific results
             html = `
                <div class="w-full text-left">
                    <p class="text-base text-slate-600 mb-2">${t('result_total_volume')}: 
                        <strong class="text-slate-800">${isImperial ? results.volumeYd3.toFixed(2) + ' yd³' : results.volumeM3.toFixed(2) + ' m³'}</strong>
                    </p>
                    <div class="grid grid-cols-3 gap-2 text-center mt-4">
                        <div class="bg-slate-200 p-2 rounded-lg">
                            <p class="font-bold text-2xl text-brand-primary">${results.bags['40']}</p>
                            <p class="text-xs text-slate-600">40 ${isImperial ? 'lb' : 'kg'} ${t('result_cement_bags')}</p>
                        </div>
                        <div class="bg-slate-200 p-2 rounded-lg">
                            <p class="font-bold text-2xl text-brand-primary">${results.bags['60']}</p>
                            <p class="text-xs text-slate-600">60 ${isImperial ? 'lb' : 'kg'} ${t('result_cement_bags')}</p>
                        </div>
                        <div class="bg-slate-200 p-2 rounded-lg">
                            <p class="font-bold text-2xl text-brand-primary">${results.bags['80']}</p>
                            <p class="text-xs text-slate-600">80 ${isImperial ? 'lb' : 'kg'} ${t('result_cement_bags')}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Default calculator results (index, slab, footing)
             html = `
                <div class="text-center">
                    <p class="text-sm text-slate-500 uppercase font-semibold" data-i18n-key="result_total_volume">${t('result_total_volume')}</p>
                    <p class="text-4xl font-extrabold text-brand-primary my-1">${isImperial ? results.volumeYd3.toFixed(2) : results.volumeM3.toFixed(2)}</p>
                    <p class="text-sm text-slate-500">${isImperial ? 'Cubic Yards' : 'Cubic Meters'}</p>
                </div>
                <div class="w-full space-y-2 text-sm mt-4">
                    <p class="font-semibold text-slate-800" data-i18n-key="result_materials_needed">${t('result_materials_needed')}</p>
                    <div class="flex justify-between border-b border-slate-200 py-1">
                        <span data-i18n-key="result_cement">${t('result_cement')}</span>
                        <span class="font-medium text-slate-700">${isImperial ? results.materials.cementLbs.toFixed(1) + ' lb' : results.materials.cementKg.toFixed(1) + ' kg'}</span>
                    </div>
                    <div class="flex justify-between border-b border-slate-200 py-1">
                        <span data-i18n-key="result_sand">${t('result_sand')}</span>
                        <span class="font-medium text-slate-700">${isImperial ? results.materials.sandLbs.toFixed(1) + ' lb' : results.materials.sandKg.toFixed(1) + ' kg'}</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span data-i18n-key="result_gravel">${t('result_gravel')}</span>
                        <span class="font-medium text-slate-700">${isImperial ? results.materials.gravelLbs.toFixed(1) + ' lb' : results.materials.gravelKg.toFixed(1) + ' kg'}</span>
                    </div>
                </div>
            `;
        }

        resultsOutput.innerHTML = html;

        const copyBtn = document.getElementById('copy-btn');
        const saveBtn = document.getElementById('save-btn');
        if(copyBtn) copyBtn.disabled = false;
        if(saveBtn) saveBtn.disabled = false;
    };
    
    const addToHistory = (results) => {
        const historyItem = { ...results, date: new Date().toISOString() };
        history.unshift(historyItem);
        if (history.length > 6) history.pop();
        localStorage.setItem('concreteHistory', JSON.stringify(history));
        if (typeof renderHistory === 'function') renderHistory();
    };

    const renderHistory = () => {
        const historyOutput = document.getElementById('history-output');
        const historySection = document.getElementById('history-section');
        if (!historyOutput || !historySection) return;

        if (history.length === 0) {
            historySection.style.display = 'none';
            return;
        }

        historySection.style.display = 'block';
        const lang = getLanguage();
        const t = (key) => translations[lang]?.[key] || translations['en'][key];

        historyOutput.innerHTML = history.map(item => {
            const isImperial = item.unit === 'imperial';
            const shapeText = item.shape === 'rectangle' ? t('history_slab') : t('history_column');
            const date = new Date(item.date).toLocaleDateString(lang, { month: 'short', day: 'numeric' });
            return `
                <div class="bg-white p-4 rounded-lg border border-slate-200">
                    <div class="flex justify-between items-center">
                        <p class="font-bold text-slate-800">${shapeText}</p>
                        <p class="text-xs text-slate-500">${date}</p>
                    </div>
                    <p class="text-2xl font-bold text-brand-secondary mt-2">${isImperial ? item.volumeYd3.toFixed(2) : item.volumeM3.toFixed(2)} <span class="text-base font-normal text-slate-600">${isImperial ? 'yd³' : 'm³'}</span></p>
                </div>
            `;
        }).join('');
    };

    const setupCalculatorListeners = () => {
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                let inputs;
                if(document.body.classList.contains('slab-calculator-page')){
                    inputs = {
                        unit: currentUnit, shape: 'rectangle', grade: document.getElementById('grade').value,
                        height: parseOrDefault('height', 0.5), length: parseOrDefault('length', 10), width: parseOrDefault('width', 10)
                    };
                } else if(document.body.classList.contains('footing-calculator-page')) {
                     inputs = {
                        unit: currentUnit, shape: currentShape, grade: document.getElementById('grade').value,
                        height: parseOrDefault('height', 1), length: parseOrDefault('length', 40), width: parseOrDefault('width', 1.5), radius: parseOrDefault('radius', 1)
                    };
                } else if (document.body.classList.contains('bag-calculator-page')) {
                     inputs = {
                        unit: currentUnit, shape: currentShape,
                        height: parseOrDefault('height', 0.5), length: parseOrDefault('length', 10), width: parseOrDefault('width', 12), diameter: parseOrDefault('diameter', 1)
                    };
                } else { // Index page
                    inputs = {
                        unit: currentUnit, shape: currentShape, grade: document.getElementById('grade').value,
                        height: parseOrDefault('height', 0.5), length: parseOrDefault('length', 10), width: parseOrDefault('width', 12), radius: parseOrDefault('radius', 2)
                    };
                }
                const results = calculateResults(inputs);
                displayResults(results);
            });
        }

        const unitButtons = document.querySelectorAll('#unit-system button');
        if (unitButtons.length > 0) {
            unitButtons.forEach(button => {
                button.addEventListener('click', () => {
                    currentUnit = button.dataset.value;
                    unitButtons.forEach(btn => btn.classList.remove('bg-white', 'text-brand-primary', 'shadow'));
                    button.classList.add('bg-white', 'text-brand-primary', 'shadow');
                    updateLabels();
                    clearResults();
                });
            });
        }

        const shapeButtons = document.querySelectorAll('#shape-selector button');
        if (shapeButtons.length > 0) {
            shapeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    currentShape = button.dataset.value;
                    shapeButtons.forEach(btn => btn.classList.remove('bg-white', 'text-brand-primary', 'shadow'));
                    button.classList.add('bg-white', 'text-brand-primary', 'shadow');
                    toggleInputs();
                    clearResults();
                });
            });
        }
        
        // Reset, Copy, Save buttons
        const resetBtn = document.getElementById('reset-btn');
        if(resetBtn) resetBtn.addEventListener('click', clearResults);

        const copyBtn = document.getElementById('copy-btn');
        if(copyBtn) copyBtn.addEventListener('click', () => {
            if (window.latestResults) {
                const textToCopy = document.getElementById('results-output').innerText;
                navigator.clipboard.writeText(textToCopy).then(() => alert('Results copied!'));
            }
        });

        const saveBtn = document.getElementById('save-btn');
        if(saveBtn) saveBtn.addEventListener('click', () => {
            if (window.latestResults) {
                addToHistory(window.latestResults);
                alert('Calculation saved!');
            }
        });
        
        const clearHistoryBtn = document.getElementById('clear-history-btn');
        if(clearHistoryBtn) clearHistoryBtn.addEventListener('click', () => {
            history = [];
            localStorage.removeItem('concreteHistory');
            renderHistory();
        });
    };

    // --- 5. INITIALIZATION ---
    const init = () => {
        setupNavigation();
        const initialLang = getLanguage();
        setLanguage(initialLang);
        
        // Only run calculator-specific initializations if on a calculator page
        if (document.getElementById('calculator')) {
            setupCalculatorListeners();
            updateLabels();
            toggleInputs();
            clearResults();
        }
        
        if (document.getElementById('history-section')) {
            renderHistory();
        }
    };

    init(); // Run initialization
}); 
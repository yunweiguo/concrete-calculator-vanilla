document.addEventListener('DOMContentLoaded', () => {

    // --- STATE MANAGEMENT ---
    let currentUnit = 'imperial';
    let currentShape = 'rectangle';
    let history = JSON.parse(localStorage.getItem('concreteHistory')) || [];

    const languageData = {
        en: { name: 'English' },
        zh: { name: '中文' },
        es: { name: 'Español' },
    };

    // --- DOM ELEMENT SELECTORS (used in multiple functions) ---
    const languageMenu = document.getElementById('language-menu');
    const languageMenuButton = document.getElementById('language-menu-button');
    const shapeSelectorButtons = document.querySelectorAll('#shape-selector button');
    
    // --- I18N (Internationalization) ---

    const getLanguage = () => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        return translations[browserLang] ? browserLang : 'en';
    };

    const setLanguage = (lang) => {
        if (typeof translations === 'undefined') {
            console.error('Shared script: Translations object not loaded.');
            return;
        }
        if (!translations[lang]) return;

        // 1. Save preference FIRST - this is the key fix.
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        const t = (key) => translations[lang]?.[key] || translations['en'][key];

        // 2. Translate all elements with data-i18n-key using the safe getter
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            element.innerHTML = t(key);
        });
        
        // 3. FORCE UPDATE the language switcher text
        const langSwitcherSpan = document.getElementById('current-language-name');
        if (langSwitcherSpan && languageData[lang]) {
            langSwitcherSpan.textContent = languageData[lang].name;
        }

        // 4. Re-render history and results to apply language changes
        renderHistory();
        if (window.latestResults) {
            displayResults(window.latestResults);
        }
    };
    
    // --- UI LOGIC & EVENT LISTENERS ---

    // Language switcher
    languageMenuButton.addEventListener('click', () => {
        languageMenu.classList.toggle('hidden');
    });

    languageMenu.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.target.getAttribute('data-lang');
        if (lang) {
            setLanguage(lang);
            languageMenu.classList.add('hidden');
        }
    });

    document.addEventListener('click', (e) => {
        if (!languageMenuButton.contains(e.target) && !languageMenu.contains(e.target)) {
            languageMenu.classList.add('hidden');
        }
    });

    // Unit system switcher
    document.querySelectorAll('#unit-system button').forEach(button => {
        button.addEventListener('click', () => {
            if (currentUnit === button.dataset.value) return; // Do nothing if already active
            currentUnit = button.dataset.value;
            
            document.querySelectorAll('#unit-system button').forEach(btn => {
                btn.classList.remove('bg-white', 'text-brand-primary', 'shadow');
                btn.classList.add('text-slate-600', 'hover:text-brand-primary');
            });
            button.classList.add('bg-white', 'text-brand-primary', 'shadow');
            button.classList.remove('text-slate-600', 'hover:text-brand-primary');
            
            updateLabels();
            clearResults();
        });
    });

    // Shape selector switcher
    shapeSelectorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentShape === button.dataset.value) return; // Do nothing if already active
            currentShape = button.dataset.value;

             shapeSelectorButtons.forEach(btn => {
                btn.classList.remove('bg-white', 'text-brand-primary', 'shadow');
                btn.classList.add('text-slate-600', 'hover:text-brand-primary');
            });
            button.classList.add('bg-white', 'text-brand-primary', 'shadow');
            button.classList.remove('text-slate-600', 'hover:text-brand-primary');

            toggleInputs();
            clearResults();
        });
    });

    // Main calculation button
    document.getElementById('calculate-btn').addEventListener('click', () => {
        console.log('Calculate button clicked on a page using script.js');
        const inputs = getInputs();
        console.log('Inputs received:', inputs);
        if (!inputs) return;

        const results = calculateResults(inputs);
        console.log('Calculation results:', results);
        if (!results) return;

        displayResults(results);
    });

    // Save button
    document.getElementById('save-btn').addEventListener('click', () => {
        if (window.latestResults) {
            addToHistory(window.latestResults);
            alert('Calculation saved to history!');
        }
    });

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
        // Reset form inputs to their default values
        document.getElementById('length').value = '10';
        document.getElementById('width').value = '12';
        document.getElementById('radius').value = '2';
        document.getElementById('height').value = '0.5';
        document.getElementById('grade').value = 'C25';

        // Reset unit and shape selectors to default (imperial, rectangle)
        document.querySelector('#unit-system button[data-value="imperial"]').click();
        document.querySelector('#shape-selector button[data-value="rectangle"]').click();
        
        // Clear the results area
        clearResults();
    });

    // Clear history button
    document.getElementById('clear-history-btn').addEventListener('click', () => {
        history = [];
        localStorage.removeItem('concreteHistory');
        renderHistory();
    });

    // Copy to clipboard button
    document.getElementById('copy-btn').addEventListener('click', () => {
        const textToCopy = document.getElementById('results-output').innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Results copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    // --- FUNCTIONS ---
    
    function parseOrDefault(elementId, defaultValue) {
        const value = parseFloat(document.getElementById(elementId).value);
        return isNaN(value) || value <= 0 ? defaultValue : value;
    };

    function clearResults() {
        const resultsOutput = document.getElementById('results-output');
        const lang = getLanguage();
        const t = (key) => translations[lang]?.[key] || translations['en'][key];

        resultsOutput.innerHTML = `
            <svg class="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3.333A3.333 3.333 0 0012.667 11H11.333A3.333 3.333 0 008 13.667V17m0-10a3 3 0 013-3h2a3 3 0 013 3v1.333A3.333 3.333 0 0117.333 11H6.667A3.333 3.333 0 014.333 8.333V7a3 3 0 013-3z"></path></svg>
            <p class="font-semibold text-slate-500">${t('results_placeholder_title')}</p>
            <p class="text-sm text-slate-400">${t('results_placeholder_subtitle')}</p>
        `;

        // Disable buttons that are only active when there are results
        document.getElementById('copy-btn').disabled = true;
        document.getElementById('save-btn').disabled = true;
        
        // Clear the global results object
        window.latestResults = null;
    }

    function updateLabels() {
        const distUnit = currentUnit === 'imperial' ? 'ft' : 'm';
        const weightUnit = currentUnit === 'imperial' ? 'lb' : 'kg';
        document.querySelectorAll('.unit-label-dist').forEach(label => label.textContent = distUnit);
        document.querySelectorAll('.unit-label-weight').forEach(label => label.textContent = weightUnit);
    }

    function toggleInputs() {
        if (currentShape === 'rectangle') {
            document.getElementById('rectangle-inputs').style.display = 'block';
            document.getElementById('width-inputs').style.display = 'block';
            document.getElementById('circle-inputs').style.display = 'none';
        } else {
            document.getElementById('rectangle-inputs').style.display = 'none';
            document.getElementById('width-inputs').style.display = 'none';
            document.getElementById('circle-inputs').style.display = 'block';
        }
    }

    function getInputs() {
        return {
            unit: currentUnit,
            shape: currentShape,
            grade: document.getElementById('grade').value,
            height: parseOrDefault('height', 0.5),
            length: currentShape === 'rectangle' ? parseOrDefault('length', 10) : undefined,
            width: currentShape === 'rectangle' ? parseOrDefault('width', 12) : undefined,
            radius: currentShape === 'circle' ? parseOrDefault('radius', 2) : undefined,
        };
    }

    function calculateResults(inputs) {
        let volume = 0;
        if (inputs.shape === 'rectangle') {
            volume = inputs.length * inputs.width * inputs.height;
        } else { // Circle
            volume = Math.PI * Math.pow(inputs.radius, 2) * inputs.height;
        }

        let volumeFt3, volumeM3;

        if (inputs.unit === 'imperial') {
            volumeFt3 = volume;
            volumeM3 = volume * 0.0283168;
        } else { // Metric
            volumeM3 = volume;
            volumeFt3 = volume / 0.0283168;
        }

        const gradeRatios = {
            C15: { cement: 240, sand: 620, gravel: 1280 },
            C20: { cement: 320, sand: 580, gravel: 1260 },
            C25: { cement: 360, sand: 550, gravel: 1250 },
            C30: { cement: 400, sand: 520, gravel: 1240 }
        };

        const ratios = gradeRatios[inputs.grade];
        const cementKg = volumeM3 * ratios.cement;
        const sandKg = volumeM3 * ratios.sand;
        const gravelKg = volumeM3 * ratios.gravel;
        const cementBags = Math.ceil(cementKg / 50);

        const costPerBagCement = 8, costPerKgSand = 0.05, costPerKgGravel = 0.04, laborCostPerM3 = 100;
        const materialsCost = (cementBags * costPerBagCement) + (sandKg * costPerKgSand) + (gravelKg * costPerKgGravel);
        const laborCost = volumeM3 * laborCostPerM3;

        const results = { ...inputs, volumeFt3, volumeM3, cementKg, sandKg, gravelKg, cementBags, materialsCost, laborCost, totalCost: materialsCost + laborCost };
        window.latestResults = results; // Save the latest results globally
        return results;
    }
    
    function displayResults(results) {
        const lang = getLanguage();
        const t = (key) => translations[lang]?.[key] || translations['en'][key];
        const resultsOutput = document.getElementById('results-output');

        const volumeDisplay = results.unit === 'imperial' ? `${results.volumeFt3.toFixed(2)} ft³` : `${results.volumeM3.toFixed(2)} m³`;
        const sandWeight = results.unit === 'imperial' ? (results.sandKg * 2.20462).toFixed(0) : results.sandKg.toFixed(0);
        const gravelWeight = results.unit === 'imperial' ? (results.gravelKg * 2.20462).toFixed(0) : results.gravelKg.toFixed(0);
        const weightUnit = results.unit === 'imperial' ? 'lb' : 'kg';
        
        resultsOutput.innerHTML = `
            <div class="w-full text-left space-y-4">
                <div><p class="text-sm text-slate-500 font-medium">${t('result_total_volume')}</p><p class="text-3xl font-bold text-brand-primary">${volumeDisplay}</p></div>
                <hr class="border-slate-200"/>
                <div><p class="text-sm text-slate-500 font-medium">${t('result_materials_needed')}</p><ul class="mt-2 space-y-1 text-slate-700"><li><strong>${t('result_cement')}:</strong> ${results.cementBags} ${t('result_cement_bags')} (~${(results.cementKg * 2.20462).toFixed(0)} lb / ${results.cementKg.toFixed(0)} kg)</li><li><strong>${t('result_sand')}:</strong> ${sandWeight} ${weightUnit}</li><li><strong>${t('result_gravel')}:</strong> ${gravelWeight} ${weightUnit}</li></ul></div>
                <hr class="border-slate-200"/>
                <div><p class="text-sm text-slate-500 font-medium">${t('result_cost_estimation')}</p><ul class="mt-2 space-y-1 text-slate-700"><li>${t('result_materials_subtotal')}: $${results.materialsCost.toFixed(2)}</li><li>${t('result_labor')}: $${results.laborCost.toFixed(2)}</li><li class="font-bold text-lg text-slate-900">${t('result_total_cost')}: $${results.totalCost.toFixed(2)}</li></ul></div>
            </div>`;
        document.getElementById('copy-btn').disabled = false;
        document.getElementById('save-btn').disabled = false;
    }
    
    function addToHistory(results) {
        history.unshift({ ...results, id: Date.now() });
        if (history.length > 10) history.pop();
        localStorage.setItem('concreteHistory', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const historySection = document.getElementById('history-section');
        const historyOutput = document.getElementById('history-output');

        if (history.length === 0) {
            historySection.classList.add('hidden');
            return;
        }

        historySection.classList.remove('hidden');
        historyOutput.innerHTML = '';

        const lang = getLanguage();
        const t = (key) => translations[lang]?.[key] || translations['en'][key];

        history.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow';
            
            const shapeText = t(item.shape === 'rectangle' ? 'history_slab' : 'history_column');
            const volumeDisplay = item.unit === 'imperial' ? `${item.volumeFt3.toFixed(2)} ft³` : `${item.volumeM3.toFixed(2)} m³`;
            
            // Format date based on locale for better readability
            const date = new Date(item.id).toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' });

            itemCard.innerHTML = `
                <p class="font-bold text-slate-800">${shapeText}</p>
                <p class="text-slate-600">${volumeDisplay}</p>
                <p class="text-xs text-slate-400 mt-2">${date}</p>
            `;

            itemCard.addEventListener('click', () => {
                // Populate inputs when history item is clicked
                document.getElementById('height').value = item.height;
                if(item.shape === 'rectangle') {
                    document.getElementById('length').value = item.length;
                    document.getElementById('width').value = item.width;
                } else {
                    document.getElementById('radius').value = item.radius;
                }
                document.getElementById('grade').value = item.grade;
                // Note: Does not restore unit system or shape selector to keep it simple

                displayResults(item);
                window.latestResults = item;
                
                // Scroll to results
                document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
            });
            
            historyOutput.appendChild(itemCard);
        });
    }

    // --- INITIALIZATION ---
    function init() {
        // Set initial language
        const initialLang = getLanguage();
        setLanguage(initialLang);

        // Set up UI based on state
        document.querySelector(`#unit-system button[data-value='${currentUnit}']`).click();
        document.querySelector(`#shape-selector button[data-value='${currentShape}']`).click();
        
        // Render initial state
        updateLabels();
        toggleInputs();
        renderHistory();
        clearResults();
    }

    // Initialize the app
    if (document.readyState === 'loading') {
        window.onload = init;
    } else {
        init();
    }

}); 
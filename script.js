document.addEventListener('DOMContentLoaded', () => {

    // --- TRANSLATIONS ---
    const translations = {
        en: {
            totalVolume: 'Total Volume',
            materialBreakdown: 'Material Breakdown:',
            cement: 'Cement:',
            sand: 'Sand:',
            gravel: 'Gravel:',
            copied: 'Copied!',
            saved: 'Saved!',
            enterDimensions: 'Your results will appear here.',
            pressCalculate: 'Enter dimensions and press Calculate.',
            calculation: 'Calculation'
        },
        zh: {
            totalVolume: '总体积',
            materialBreakdown: '材料明细：',
            cement: '水泥：',
            sand: '沙子：',
            gravel: '砾石：',
            copied: '已复制！',
            saved: '已保存！',
            enterDimensions: '您的结果将显示在这里。',
            pressCalculate: '输入尺寸并按计算。',
            calculation: '计算结果'
        }
    };

    // --- UTILS ---
    const getLang = () => document.documentElement.lang || 'en';
    const t = (key) => (translations[getLang()] && translations[getLang()][key]) || translations['en'][key];


    // --- DOM ELEMENTS ---
    const unitSystemDiv = document.getElementById('unit-system');
    const shapeSelectorDiv = document.getElementById('shape-selector');
    const lengthInput = document.getElementById('length');
    const widthInput = document.getElementById('width');
    const radiusInput = document.getElementById('radius');
    const heightInput = document.getElementById('height');
    const gradeSelect = document.getElementById('grade');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsOutput = document.getElementById('results-output');
    const copyBtn = document.getElementById('copy-btn');
    const saveBtn = document.getElementById('save-btn');
    const resetBtn = document.getElementById('reset-btn');
    const historyOutput = document.getElementById('history-output');
    const historySection = document.getElementById('history-section');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const languageMenuButton = document.getElementById('language-menu-button');
    const languageMenu = document.getElementById('language-menu');
    const calculatorsMenuButton = document.getElementById('calculators-menu-button');
    const calculatorsMenu = document.getElementById('calculators-menu');

    // New elements for Bag Calculator
    const bagSizeSelect = document.getElementById('bag-size');
    const customBagInputs = document.getElementById('custom-bag-inputs');
    const customBagWeightInput = document.getElementById('custom-bag-weight');
    const customBagYieldInput = document.getElementById('custom-bag-yield');

    // --- STATE ---
    let lastCalculation = null;

    // --- CONSTANTS ---
    const constants = {
        // ... (assuming these are defined elsewhere or will be added)
        cementDensity: 1440, // kg/m^3
        sandDensity: 1600,  // kg/m^3
        gravelDensity: 1520, // kg/m^3
        m3ToYd3: 1.30795,
        m3ToFt3: 35.3147,
        kgToLbs: 2.20462,
    };

    const gradeRatios = {
        "C15": { cement: 1, sand: 2, gravel: 4, water: 0.6 },
        "C20": { cement: 1, sand: 1.5, gravel: 3, water: 0.55 },
        "C25": { cement: 1, sand: 1, gravel: 2, water: 0.5 },
        "C30": { cement: 1, sand: 1, gravel: 2, water: 0.45 },
    };
    
    const bagYields = { // in ft^3
        "80": 0.60,
        "60": 0.45,
        "50": 0.38,
        "40": 0.30,
    };


    // --- EVENT LISTENERS & SETUP ---
    function setupEventListeners() {
        if (unitSystemDiv) {
            unitSystemDiv.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    setActiveButton(unitSystemDiv, e.target);
                }
            });
        }

        if (shapeSelectorDiv) {
            shapeSelectorDiv.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    setActiveButton(shapeSelectorDiv, e.target);
                    updateInputsForShape(e.target.dataset.value);
                }
            });
        }
        
        if(calculateBtn) calculateBtn.addEventListener('click', displayResults);
        if(resetBtn) resetBtn.addEventListener('click', resetCalculator);
        if(clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearHistory);
        if(mobileMenuButton) mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        if(languageMenuButton) languageMenuButton.addEventListener('click', (e) => { e.stopPropagation(); languageMenu.classList.toggle('hidden'); });
        if(calculatorsMenuButton) calculatorsMenuButton.addEventListener('click', (e) => { e.stopPropagation(); calculatorsMenu.classList.toggle('hidden'); });
        
        document.addEventListener('click', () => {
            if(languageMenu) languageMenu.classList.add('hidden');
            if(calculatorsMenu) calculatorsMenu.classList.add('hidden');
        });

        // Event listener for bag size dropdown
        if (bagSizeSelect) {
            bagSizeSelect.addEventListener('change', (e) => {
                if (e.target.value === 'custom') {
                    customBagInputs.classList.remove('hidden');
                } else {
                    customBagInputs.classList.add('hidden');
                }
            });
        }
    }


    // --- UI LOGIC ---
    function setActiveButton(container, button) {
        // ... (implementation remains the same)
        container.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('bg-white', 'text-brand-primary', 'shadow');
            btn.classList.add('text-slate-600', 'hover:text-brand-primary');
        });
        button.classList.add('bg-white', 'text-brand-primary', 'shadow');
        button.classList.remove('text-slate-600', 'hover:text-brand-primary');
    }
    
    function updateInputsForShape(shape) {
        // ... (implementation remains the same)
        const rectangleInputs = document.getElementById('rectangle-inputs');
        const widthInputs = document.getElementById('width-inputs');
        const circleInputs = document.getElementById('circle-inputs');

        if (!rectangleInputs || !widthInputs || !circleInputs) return;

        if (shape === 'rectangle') {
            rectangleInputs.classList.remove('hidden');
            widthInputs.classList.remove('hidden');
            circleInputs.classList.add('hidden');
        } else { // circle
            rectangleInputs.classList.add('hidden');
            widthInputs.classList.add('hidden');
            circleInputs.classList.remove('hidden');
        }
    }

    function updateActionButtons(disabled) {
        if (copyBtn) copyBtn.disabled = disabled;
        if (saveBtn) saveBtn.disabled = disabled;
    }


    // --- CALCULATION LOGIC ---
    function calculate(inputs) {
        const { shape, grade, unit, length, width, radius, height } = inputs;

        let volume_m3 = 0;
        if (shape === 'rectangle') {
            volume_m3 = (unit === 'metric' ? length : length * 0.3048) *
                        (unit === 'metric' ? width : width * 0.3048) *
                        (unit === 'metric' ? height : height * 0.3048);
        } else { // circle
            const r = unit === 'metric' ? radius : radius * 0.3048;
            const h = unit === 'metric' ? height : height * 0.3048;
            volume_m3 = Math.PI * r * r * h;
        }

        const ratio = gradeRatios[grade];
        const totalRatio = ratio.cement + ratio.sand + ratio.gravel;

        const cement_m3 = (volume_m3 / totalRatio) * ratio.cement;
        const sand_m3 = (volume_m3 / totalRatio) * ratio.sand;
        const gravel_m3 = (volume_m3 / totalRatio) * ratio.gravel;

        return {
            volume_m3: volume_m3,
            volume_yd3: volume_m3 * constants.m3ToYd3,
            cement: unit === 'metric' ? cement_m3 * constants.cementDensity : cement_m3 * constants.cementDensity * constants.kgToLbs,
            sand: unit === 'metric' ? sand_m3 : sand_m3 * constants.m3ToFt3,
            gravel: unit === 'metric' ? gravel_m3 : gravel_m3 * constants.m3ToFt3,
        };
    }


    // --- DISPLAY & HISTORY ---
    function displayResults() {
        if (!resultsOutput) return;

        // Page-specific logic: Check if it's the bag calculator page
        if (document.getElementById('bag-size')) {
            displayBagResults();
        } else {
            displayMaterialResults();
        }
    }

    function displayMaterialResults() {
        const currentUnitSystem = unitSystemDiv ? unitSystemDiv.querySelector('.bg-white').dataset.value : 'imperial';
        const currentShape = shapeSelectorDiv ? shapeSelectorDiv.querySelector('.bg-white').dataset.value : 'rectangle';

        const results = calculate({
            shape: currentShape,
            grade: gradeSelect.value,
            unit: currentUnitSystem,
            length: parseFloat(lengthInput.value),
            width: parseFloat(widthInput.value),
            radius: parseFloat(radiusInput.value),
            height: parseFloat(heightInput.value)
        });
        
        lastCalculation = { id: Date.now().toString(), unit: currentUnitSystem, shape: currentShape, ...results };

        const isMetric = currentUnitSystem === 'metric';
        const volumeUnit = isMetric ? 'm³' : 'yd³';
        const weightUnit = isMetric ? 'kg' : 'lbs';
        const smallVolUnit = isMetric ? 'm³' : 'ft³';
        const volume = isMetric ? results.volume_m3 : results.volume_yd3;

        resultsOutput.innerHTML = `
            <div class="text-center">
                <p class="text-sm text-slate-500">${t('totalVolume')}</p>
                <p class="text-4xl font-bold text-brand-primary my-2">${volume.toFixed(2)} <span class="text-3xl">${volumeUnit}</span></p>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-200 w-full text-sm">
                <p class="font-semibold text-slate-700 mb-2">${t('materialBreakdown')}</p>
                <dl class="space-y-1">
                    <div class="flex justify-between">
                        <dt class="text-slate-600">${t('cement')}</dt>
                        <dd class="font-medium text-slate-800">${results.cement.toFixed(1)} ${weightUnit}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-600">${t('sand')}</dt>
                        <dd class="font-medium text-slate-800">${results.sand.toFixed(2)} ${smallVolUnit}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-600">${t('gravel')}</dt>
                        <dd class="font-medium text-slate-800">${results.gravel.toFixed(2)} ${smallVolUnit}</dd>
                    </div>
                </dl>
            </div>
        `;
        updateActionButtons(false);
    }

    function displayBagResults() {
        const currentUnitSystem = unitSystemDiv.querySelector('.bg-white').dataset.value;
        const currentShape = shapeSelectorDiv.querySelector('.bg-white').dataset.value;
        const bagSize = bagSizeSelect.value;

        let length_ft = currentUnitSystem === 'imperial' ? parseFloat(lengthInput.value) : parseFloat(lengthInput.value) * 3.28084;
        let width_ft = currentUnitSystem === 'imperial' ? parseFloat(widthInput.value) : parseFloat(widthInput.value) * 3.28084;
        let radius_ft = currentUnitSystem === 'imperial' ? parseFloat(radiusInput.value) : parseFloat(radiusInput.value) * 3.28084;
        let height_ft = currentUnitSystem === 'imperial' ? parseFloat(heightInput.value) : parseFloat(heightInput.value) * 3.28084;
        
        let volume_ft3 = 0;
        if (currentShape === 'rectangle') {
            volume_ft3 = length_ft * width_ft * height_ft;
        } else { // circle
            volume_ft3 = Math.PI * radius_ft * radius_ft * height_ft;
        }

        let yield_ft3 = 0;
        let bagWeight = 0;
        
        if (bagSize === 'custom') {
            yield_ft3 = parseFloat(customBagYieldInput.value);
            bagWeight = parseFloat(customBagWeightInput.value);
        } else {
            yield_ft3 = bagYields[bagSize];
            bagWeight = parseInt(bagSize, 10);
        }

        if (isNaN(volume_ft3) || volume_ft3 <= 0 || isNaN(yield_ft3) || yield_ft3 <= 0) {
             resultsOutput.innerHTML = `<p class="text-red-500">Please enter valid dimensions and bag information.</p>`;
             return;
        }

        const bagsNeeded = Math.ceil(volume_ft3 / yield_ft3);
        const totalWeight = bagsNeeded * bagWeight;
        
        lastCalculation = {
            id: Date.now().toString(),
            unit: currentUnitSystem,
            shape: currentShape,
            bags: bagsNeeded,
            bagWeight: bagWeight,
            totalWeight: totalWeight
        };
        
        const weightUnit = currentUnitSystem === 'metric' ? 'kg' : 'lbs';
        const displayTotalWeight = currentUnitSystem === 'metric' ? (totalWeight * 0.453592).toFixed(1) : totalWeight.toFixed(1);

        resultsOutput.innerHTML = `
            <div class="text-center">
                <p class="text-lg text-slate-600">You will need:</p>
                <p class="text-5xl font-extrabold text-brand-primary my-2">${bagsNeeded}</p>
                <p class="text-lg text-slate-600">bags (${bagWeight} ${weightUnit} each)</p>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-200 w-full text-sm">
                 <div class="flex justify-between">
                    <dt class="text-slate-600">Total Volume:</dt>
                    <dd class="font-medium text-slate-800">${volume_ft3.toFixed(2)} ft³</dd>
                </div>
                 <div class="flex justify-between mt-1">
                    <dt class="text-slate-600">Total Weight:</dt>
                    <dd class="font-medium text-slate-800">~${displayTotalWeight} ${weightUnit}</dd>
                </div>
            </div>
        `;
        updateActionButtons(false);
    }

    function resetCalculator() {
        if (!resultsOutput) return;
        resultsOutput.innerHTML = `
            <svg class="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3.333A3.333 3.333 0 0012.667 11H11.333A3.333 3.333 0 008 13.667V17m0-10a3 3 0 013-3h2a3 3 0 013 3v1.333A3.333 3.333 0 0117.333 11H6.667A3.333 3.333 0 014.333 8.333V7a3 3 0 013-3z"></path></svg>
            <p class="font-semibold text-slate-500">${t('enterDimensions')}</p>
            <p class="text-sm text-slate-400">${t('pressCalculate')}</p>
        `;
        updateActionButtons(true);
    }
    
    function showTooltip(button, messageKey) {
        const originalHtml = button.innerHTML;
        const message = t(messageKey);
        button.disabled = true;
        button.innerHTML = `
            <span class="flex items-center gap-1">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                ${message}
            </span>
        `;
        setTimeout(() => {
            button.innerHTML = originalHtml;
            button.disabled = false;
        }, 1500);
    }

    function getHistory() { return JSON.parse(localStorage.getItem('calcHistory') || '[]'); }
    function saveHistory(history) { localStorage.setItem('calcHistory', JSON.stringify(history)); }

    function saveCalculation(calc) {
        let history = getHistory();
        history.unshift(calc);
        if (history.length > 6) history = history.slice(0, 6);
        saveHistory(history);
    }

    function loadHistory() {
        if (!historySection || !historyOutput) return;
        const history = getHistory();
        historySection.classList.toggle('hidden', history.length === 0);
        historyOutput.innerHTML = history.map(item => createHistoryCard(item)).join('');
    }

    function clearHistory() {
        localStorage.removeItem('calcHistory');
        loadHistory();
    }

    function createHistoryCard(item) {
        const isMetric = item.unit === 'metric';
        const volumeUnit = isMetric ? 'm³' : 'yd³';
        const volume = isMetric ? item.volume_m3 : item.volume_yd3;
        const title = `${t('calculation')} #${item.id.slice(-4)}`;

        return `
            <div class="bg-white p-4 rounded-lg shadow-md border border-slate-200">
                <div class="flex justify-between items-center mb-2">
                    <p class="font-bold text-slate-800">${title}</p>
                    <div class="flex gap-2">
                         <button title="Copy" class="copy-history-btn text-slate-400 hover:text-brand-primary" data-id="${item.id}">
                             <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                         </button>
                         <button title="Delete" class="delete-history-btn text-slate-400 hover:text-red-500" data-id="${item.id}">
                             <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                         </button>
                    </div>
                </div>
                <div class="text-center bg-slate-50 p-3 rounded-md">
                     <p class="text-sm text-slate-500">${t('totalVolume')}</p>
                    <p class="text-2xl font-bold text-brand-primary">${volume.toFixed(2)} <span class="text-xl">${volumeUnit}</span></p>
                </div>
            </div>`;
    }

    function getResultsAsText(item) {
        const isMetric = item.unit === 'metric';
        const volumeUnit = isMetric ? 'm³' : 'yd³';
        const weightUnit = isMetric ? 'kg' : 'lbs';
        const smallVolUnit = isMetric ? 'm³' : 'ft³';
        const volume = isMetric ? item.volume_m3 : item.volume_yd3;

        return `
${t('totalVolume')}: ${volume.toFixed(2)} ${volumeUnit}
---
${t('materialBreakdown')}
${t('cement')}: ${item.cement.toFixed(1)} ${weightUnit}
${t('sand')}: ${item.sand.toFixed(2)} ${smallVolUnit}
${t('gravel')}: ${item.gravel.toFixed(2)} ${smallVolUnit}
        `.trim();
    }


    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            if (lastCalculation) {
                navigator.clipboard.writeText(getResultsAsText(lastCalculation));
                showTooltip(copyBtn, 'copied');
            }
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (lastCalculation) {
                saveCalculation(lastCalculation);
                showTooltip(saveBtn, 'saved');
                loadHistory();
            }
        });
    }

    if (historyOutput) {
        historyOutput.addEventListener('click', e => {
            const copyButton = e.target.closest('.copy-history-btn');
            if (copyButton) {
                const id = copyButton.dataset.id;
                const item = getHistory().find(h => h.id === id);
                if (item) {
                    navigator.clipboard.writeText(getResultsAsText(item));
                    showTooltip(copyButton, 'copied');
                }
            }
            
            const deleteButton = e.target.closest('.delete-history-btn');
            if (deleteButton) {
                const id = deleteButton.dataset.id;
                let history = getHistory().filter(h => h.id !== id);
                saveHistory(history);
                loadHistory();
            }
        });
    }

    // --- INITIALIZATION ---
    resetCalculator();
    loadHistory();
    setupEventListeners();
    updateInputsForShape('rectangle');
}); 
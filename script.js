document.addEventListener('DOMContentLoaded', () => {
    // --- Dropdown & Menu Logic (Universal) ---
    const setupDropdown = (buttonId, menuId) => {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        if (button && menu) {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                // Close other open menus
                document.getElementById('calculators-menu')?.classList.add('hidden');
                document.getElementById('language-menu')?.classList.add('hidden');
                // Toggle current menu
                menu.classList.toggle('hidden');
            });
        }
    };

    const setupMenu = (buttonId, menuId) => {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        if (button && menu) {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                menu.classList.toggle('hidden');
            });
        }
    };

    // Close dropdowns when clicking outside
    window.addEventListener('click', (e) => {
        if (!e.target.closest('#calculators-dropdown')) {
            document.getElementById('calculators-menu')?.classList.add('hidden');
        }
        if (!e.target.closest('#language-switcher')) {
            document.getElementById('language-menu')?.classList.add('hidden');
        }
    });

    setupDropdown('calculators-menu-button', 'calculators-menu');
    setupDropdown('language-menu-button', 'language-menu');
    setupMenu('mobile-menu-button', 'mobile-menu');

    // --- Calculator Logic ---
    const calculator = document.getElementById('calculator');
    // ** THE CRUCIAL FIX IS HERE **
    // Only run calculator logic if the calculator element exists on the page.
    if (calculator) {
        const unitSystemButtons = document.querySelectorAll('#unit-system button');
        const shapeSelectorButtons = document.querySelectorAll('#shape-selector button');
        // --- Shared Calculator Elements ---
        const calculateBtn = document.getElementById('calculate-btn');
        const resultsOutput = document.getElementById('results-output');
        const lengthInput = document.getElementById('length');
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        const gradeSelect = document.getElementById('grade');
        const unitLabels = document.querySelectorAll('.unit-label-dist');
        const resetBtn = document.getElementById('reset-btn');
        const copyBtn = document.getElementById('copy-btn');
        const saveBtn = document.getElementById('save-btn');

        let currentUnit = 'imperial';

        const constants = {
            C25: { ratio: [1, 1, 2], totalParts: 4 },
            C20: { ratio: [1, 1.5, 3], totalParts: 5.5 },
            C15: { ratio: [1, 2, 4], totalParts: 7 },
            C30: { ratio: [1, 1, 2], totalParts: 4 },
            dryVolumeFactor: 1.57,
            cementDensity: 1440, // kg/m^3
            ftToM: 0.3048,
            m3ToFt3: 35.3147,
            m3ToYd3: 1.30795,
            kgToLbs: 2.20462
        };

        // --- Unit System Handler ---
        if (unitSystemButtons.length > 0) {
            const updateLabels = () => {
                const distLabel = currentUnit === 'imperial' ? 'ft' : 'm';
                unitLabels.forEach(label => label.textContent = distLabel);
            };
            unitSystemButtons.forEach(button => {
                button.addEventListener('click', () => {
                    currentUnit = button.dataset.value;
                    unitSystemButtons.forEach(btn => {
                        btn.classList.remove('bg-white', 'text-brand-primary', 'shadow');
                        btn.classList.add('text-slate-600', 'hover:text-brand-primary');
                    });
                    button.classList.add('bg-white', 'text-brand-primary', 'shadow');
                    button.classList.remove('text-slate-600', 'hover:text-brand-primary');
                    updateLabels();
                });
            });
            updateLabels(); // Initial call
        }

        // --- Shape Selector (for index.html) ---
        if (shapeSelectorButtons.length > 0) {
            const rectangleInputs = document.getElementById('rectangle-inputs');
            const circleInputs = document.getElementById('circle-inputs');
            const widthInputs = document.getElementById('width-inputs');

            shapeSelectorButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const shape = button.dataset.value;
                    shapeSelectorButtons.forEach(btn => {
                        btn.classList.remove('bg-white', 'text-brand-primary', 'shadow');
                        btn.classList.add('text-slate-600', 'hover:text-brand-primary');
                    });
                    button.classList.add('bg-white', 'text-brand-primary', 'shadow');
                    button.classList.remove('text-slate-600', 'hover:text-brand-primary');

                    if (shape === 'rectangle') {
                        if (rectangleInputs) rectangleInputs.style.display = 'block';
                        if (widthInputs) widthInputs.style.display = 'block';
                        if (circleInputs) circleInputs.style.display = 'none';
                    } else if (shape === 'circle') {
                        if (rectangleInputs) rectangleInputs.style.display = 'none';
                        if (widthInputs) widthInputs.style.display = 'none';
                        if (circleInputs) circleInputs.style.display = 'block';
                    }
                });
            });
        }
        
        // --- Calculation Logic ---
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                const shapeSelector = document.querySelector('#shape-selector button.bg-white');
                const shape = shapeSelector ? shapeSelector.dataset.value : 'rectangle'; // Default for non-index pages
                const unit = currentUnit;

                const length = parseFloat(lengthInput.value) || 0;
                const width = widthInput ? (parseFloat(widthInput.value) || 0) : 0; // Might not exist
                const radiusInput = document.getElementById('radius');
                const radius = radiusInput ? (parseFloat(radiusInput.value) || 0) : 0;
                const height = parseFloat(heightInput.value) || 0;

                let volumeM3 = 0;
                const l = unit === 'imperial' ? length * constants.ftToM : length;
                const w = unit === 'imperial' ? width * constants.ftToM : width;
                const r = unit === 'imperial' ? radius * constants.ftToM : radius;
                const h = unit === 'imperial' ? height * constants.ftToM : height;
                
                if (shape === 'rectangle') {
                    volumeM3 = l * w * h;
                } else { // circle
                    volumeM3 = Math.PI * Math.pow(r, 2) * h;
                }

                if (volumeM3 > 0 && resultsOutput) {
                    const grade = gradeSelect.value;
                    const mix = constants[grade];
                    const dryVolume = volumeM3 * constants.dryVolumeFactor;
                    
                    const cementVolumeM3 = (dryVolume * mix.ratio[0]) / mix.totalParts;
                    const sandVolumeM3 = (dryVolume * mix.ratio[1]) / mix.totalParts;
                    const aggregateVolumeM3 = (dryVolume * mix.ratio[2]) / mix.totalParts;
                    const cementWeightKg = cementVolumeM3 * constants.cementDensity;

                    let html = '';
                    if (unit === 'imperial') {
                        html = `
                            <div class="text-center">
                                <p class="text-slate-500 font-semibold">Total Volume</p>
                                <p class="text-4xl font-bold text-brand-primary">${(volumeM3 * constants.m3ToYd3).toFixed(2)} <span class="text-2xl">yd³</span></p>
                            </div>
                            <div class="w-full text-sm mt-4">
                                <h4 class="font-semibold text-slate-800 mb-2 text-center">Material Breakdown:</h4>
                                <div class="flex justify-between py-1 border-b"><span>Cement:</span><span class="font-bold">${(cementWeightKg * constants.kgToLbs).toFixed(1)} lbs</span></div>
                                <div class="flex justify-between py-1 border-b"><span>Sand:</span><span class="font-bold">${(sandVolumeM3 * constants.m3ToFt3).toFixed(2)} ft³</span></div>
                                <div class="flex justify-between py-1"><span>Gravel:</span><span class="font-bold">${(aggregateVolumeM3 * constants.m3ToFt3).toFixed(2)} ft³</span></div>
                            </div>`;
                    } else { // metric
                        html = `
                            <div class="text-center">
                                <p class="text-slate-500 font-semibold">Total Volume</p>
                                <p class="text-4xl font-bold text-brand-primary">${volumeM3.toFixed(2)} <span class="text-2xl">m³</span></p>
                            </div>
                            <div class="w-full text-sm mt-4">
                                <h4 class="font-semibold text-slate-800 mb-2 text-center">Material Breakdown:</h4>
                                <div class="flex justify-between py-1 border-b"><span>Cement:</span><span class="font-bold">${cementWeightKg.toFixed(1)} kg</span></div>
                                <div class="flex justify-between py-1 border-b"><span>Sand:</span><span class="font-bold">${sandVolumeM3.toFixed(2)} m³</span></div>
                                <div class="flex justify-between py-1"><span>Gravel:</span><span class="font-bold">${aggregateVolumeM3.toFixed(2)} m³</span></div>
                            </div>`;
                    }
                    resultsOutput.innerHTML = html;
                } else if (resultsOutput) {
                     resultsOutput.innerHTML = `<svg class="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3.333A3.333 3.333 0 0012.667 11H11.333A3.333 3.333 0 008 13.667V17m0-10a3 3 0 013-3h2a3 3 0 013 3v1.333A3.333 3.333 0 0117.333 11H6.667A3.333 3.333 0 014.333 8.333V7a3 3 0 013-3z"></path></svg><p class="font-semibold text-slate-500">Your results will appear here.</p><p class="text-sm text-slate-400">Enter dimensions and press "Calculate".</p>`;
                }
            });
        }

        // --- Action Buttons ---
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if(lengthInput) lengthInput.value = '10';
                if(widthInput) widthInput.value = '12';
                const radiusInput = document.getElementById('radius');
                if(radiusInput) radiusInput.value = '2';
                if(heightInput) heightInput.value = '0.5';
                if(gradeSelect) gradeSelect.value = 'C25';
                if(resultsOutput) resultsOutput.innerHTML = `<svg class="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3.333A3.333 3.333 0 0012.667 11H11.333A3.333 3.333 0 008 13.667V17m0-10a3 3 0 013-3h2a3 3 0 013 3v1.333A3.333 3.333 0 0117.333 11H6.667A3.333 3.333 0 014.333 8.333V7a3 3 0 013-3z"></path></svg><p class="font-semibold text-slate-500">Your results will appear here.</p><p class="text-sm text-slate-400">Enter dimensions and press "Calculate".</p>`;
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                if(resultsOutput) {
                    navigator.clipboard.writeText(resultsOutput.innerText).then(() => {
                        copyBtn.title = 'Copied!';
                        setTimeout(() => { copyBtn.title = 'Copy Results'; }, 2000);
                    });
                }
            });
        }
        
        // --- History Logic (for index.html) ---
        const historySection = document.getElementById('history-section');
        if (historySection) {
            const historyOutput = document.getElementById('history-output');
            const clearHistoryBtn = document.getElementById('clear-history-btn');
            
            if (historyOutput && clearHistoryBtn && saveBtn) {
                let calculations = JSON.parse(localStorage.getItem('calculations')) || [];

                const displayHistory = () => {
                    if (calculations.length > 0) {
                        historySection.style.display = 'block';
                        historyOutput.innerHTML = calculations.map((calc, index) => `
                            <div class="bg-white p-4 rounded-lg shadow-sm border flex flex-col justify-between">
                                <div>
                                    <p class="font-semibold text-slate-700">${calc.title}</p>
                                    <p class="text-sm text-slate-500">${new Date(calc.date).toLocaleDateString()}</p>
                                    <div class="text-xs mt-2">${calc.results.replace(/<div class="text-center">/g, '<div class="text-center text-xs">').replace(/text-4xl/g, 'text-lg').replace(/text-2xl/g, 'text-base')}</div>
                                </div>
                                <button class="delete-calc-btn text-xs text-red-500 hover:underline mt-2 text-right" data-index="${index}">Delete</button>
                            </div>`).join('');
                    } else {
                        historySection.style.display = 'none';
                    }
                };

                saveBtn.addEventListener('click', () => {
                    if (resultsOutput && resultsOutput.innerHTML.includes("Total Volume")) {
                        const shape = document.querySelector('#shape-selector button.bg-white').dataset.value;
                        const title = `Calculation for ${shape}`;
                        const calculation = {
                            title: title,
                            date: new Date(),
                            results: resultsOutput.innerHTML
                        };
                        calculations.unshift(calculation);
                        if (calculations.length > 6) calculations.pop();
                        localStorage.setItem('calculations', JSON.stringify(calculations));
                        displayHistory();
                    }
                });
                
                clearHistoryBtn.addEventListener('click', () => {
                    calculations = [];
                    localStorage.removeItem('calculations');
                    displayHistory();
                });

                historyOutput.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-calc-btn')) {
                        const index = parseInt(e.target.dataset.index, 10);
                        calculations.splice(index, 1);
                        localStorage.setItem('calculations', JSON.stringify(calculations));
                        displayHistory();
                    }
                });

                // Initialize history display on page load
                displayHistory();
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {

    // --- TRANSLATIONS ---
    const translations = {
        en: {
            // Basic UI
            totalVolume: 'Total Volume',
            materialBreakdown: 'Material Breakdown:',
            cement: 'Cement:',
            sand: 'Sand:',
            gravel: 'Gravel:',
            copied: 'Copied!',
            saved: 'Saved!',
            enterDimensions: 'Your results will appear here.',
            pressCalculate: 'Enter dimensions and press Calculate.',
            calculation: 'Calculation',
            calculator: 'Calculator',
            results: 'Results',
            calculate: 'Calculate',
            unit: 'Unit',
            imperial: 'Imperial',
            metric: 'Metric',
            share: 'Share',
            quantity: 'Quantity',
            
            // Column Calculator
            columnCalculatorTitle: 'Concrete Column Calculator',
            columnCalculatorDescription: 'Calculate the concrete volume and material needed for round columns, piers, or Sonotubes.',
            columnDiameter: 'Diameter',
            columnHeight: 'Height',
            requiredVolume: 'Required Concrete Volume',
            
            // Bag Calculator
            concreteBagCalculator: 'Concrete Bag Calculator',
            bagEstimation: 'Bag Estimation',
            youWillNeed: 'You will need:',
            bags: 'bags',
            each: 'each',
            totalWeight: 'Total Weight',
            
            // Stairs Calculator
            stairsCalculatorTitle: 'Concrete Stairs Calculator',
            stairsCalculatorDescription: 'Estimate the concrete volume and material needed for your steps.',
            stairsWidth: 'Stairs Width',
            numberOfSteps: 'Number of Steps',
            riserHeight: 'Riser Height',
            treadDepth: 'Tread Depth',
            landingDepth: 'Landing Depth (Optional)',
            
            // Cost Calculator
            estimatedTotalCost: 'Estimated Total Cost',
            
            // Main Page Content
            mainTitle: 'Concrete Calculator',
            mainSubtitle: 'Estimate Volume, Materials & Cost',
            mainDescription: 'The ultimate concrete calculator for your construction projects. Instantly estimate concrete volume (slabs, footings, columns), material quantities (cement, sand, gravel), and total cost.',
            
            // Features Section
            saveTime: 'Save Time',
            saveTimeDesc: 'Get instant estimates for volume, materials, and cost without complex manual calculations. Plan your project schedule more effectively.',
            planAccurately: 'Plan Accurately',
            planAccuratelyDesc: 'Whether you\'re pouring a simple slab or need to figure out the correct size and volume for structural supports, our tools can help. Check out our specialized concrete footing calculator for detailed foundation planning.',
            saveMoney: 'Save Money',
            saveMoneyDesc: 'Avoid over-ordering materials and reduce waste. Our calculator helps you buy exactly what you need, saving you money on your construction projects.',
            
            // Calculators Section
            exploreCalculators: 'Explore Our Specialized Calculators',
            exploreCalculatorsDesc: 'Find the perfect tool for your specific project needs.',
            
            // Individual Calculator Names
            slabCalculator: 'Slab Calculator',
            slabCalculatorDesc: 'Perfect for patios, floors, and foundations. Calculate volume and materials for any rectangular concrete slab.',
            footingCalculator: 'Footing Calculator',
            footingCalculatorDesc: 'Estimate concrete for wall footings or foundation pads. Ensures a stable and secure base for your structures.',
            columnCalculatorDesc: 'Calculate concrete volume and material needs for round columns, piers, and Sonotubes.',
            yardsCalculator: 'Yards Calculator',
            yardsCalculatorDesc: 'Calculate concrete in cubic yards for ready-mix ordering. Perfect for large projects and professional contractors.',
            cylinderCalculator: 'Cylinder Calculator',
            cylinderCalculatorDesc: 'Specialized calculator for cylindrical structures like posts, columns, and sonotube footings.',
            costCalculator: 'Cost Calculator',
            costCalculatorDesc: 'Get detailed cost estimates including materials, labor, and delivery fees for your concrete project.',
            rebarCalculator: 'Rebar Calculator',
            rebarCalculatorDesc: 'Determine the amount of rebar needed for your concrete slabs and footings.',
            stairsCalculatorDesc: 'Estimate concrete volume for your concrete steps and staircases.',
            bagCalculatorDesc: 'Working with pre-mixed bags? Calculate exactly how many bags of concrete mix you\'ll need for your project.',
            quikreteBagCalculator: 'Quikrete Bag Calculator',
            quikreteBagCalculatorDesc: 'Specifically for Quikrete products. Calculate the number of Quikrete bags needed for your project.',
            
            // Guide Section
            learnMore: 'Learn More About Concrete',
            learnMoreDesc: 'Check out our guides to help you plan and execute your project perfectly.',
            howToGuide: 'How to Calculate Concrete: A Step-by-Step Guide',
            bagGuide: 'Complete Concrete Bag Guide: How Many Bags Do I Need?',
            formulas: 'View Our Calculation Formulas',
            
            // How It Works
            howItWorks: 'How It Works in 3 Simple Steps',
            step1Title: 'Select Units & Shape',
            step1Desc: 'Choose between Imperial (ft, lb) and Metric (m, kg) systems. Then, select the shape of your pour—a rectangular slab or a circular column.',
            step2Title: 'Enter Dimensions',
            step2Desc: 'Input the required measurements (length, width, height/thickness, or diameter) for your selected shape. The calculator handles unit conversions automatically.',
            step3Title: 'Get Results',
            step3Desc: 'Instantly receive your concrete volume, material breakdown, cost estimate, and bag requirements. Save or share your calculations for future reference.',
            
            // Units
            feet: 'feet',
            meters: 'meters',
            inches: 'inches',
            centimeters: 'centimeters',
            cubicFeet: 'cubic feet',
            cubicMeters: 'cubic meters',
            cubicYards: 'cubic yards',
            pounds: 'pounds',
            kilograms: 'kilograms',
            
            // Form Fields
            length: 'Length',
            width: 'Width',
            height: 'Height',
            thickness: 'Thickness',
            diameter: 'Diameter',
            depth: 'Depth',
            grade: 'Grade',
            bagSize: 'Bag Size',
            customBagSize: 'Custom Bag Size',
            bagWeight: 'Bag Weight (lbs)',
            bagYield: 'Bag Yield (ft³)',
            costPerUnit: 'Cost per Unit',
            costPerBag: 'Cost per Bag',
            
            // Actions
            clearHistory: 'Clear History',
            copyResults: 'Copy Results',
            deleteItem: 'Delete',
            viewHistory: 'View History',
            reset: 'Reset',
            
            // Navigation
            home: 'Home',
            calculators: 'Calculators',
            guides: 'Guides',
            glossary: 'Glossary',
            faq: 'FAQ',
            contact: 'Contact',
            
            // Footer
            allRightsReserved: 'All Rights Reserved.',
            privacyPolicy: 'Privacy Policy',
            termsOfService: 'Terms of Service',
            
            // Error messages
            invalidInput: 'Please enter valid numbers',
            positiveNumber: 'Please enter positive numbers',
            missingFields: 'Please fill in all required fields'
        },
        zh: {
            // Basic UI
            totalVolume: '总体积',
            materialBreakdown: '材料明细：',
            cement: '水泥：',
            sand: '沙子：',
            gravel: '砾石：',
            copied: '已复制！',
            saved: '已保存！',
            enterDimensions: '您的结果将显示在这里。',
            pressCalculate: '输入尺寸并按计算。',
            calculation: '计算结果',
            calculator: '计算器',
            results: '计算结果',
            calculate: '计算',
            unit: '单位',
            imperial: '英制',
            metric: '公制',
            share: '分享',
            quantity: '数量',
            
            // Column Calculator
            columnCalculatorTitle: '混凝土圆柱计算器',
            columnCalculatorDescription: '计算圆形立柱、桥墩或 Sonotube 所需的混凝土体积和材料。',
            columnDiameter: '直径',
            columnHeight: '高度',
            requiredVolume: '所需混凝土体积',
            
            // Bag Calculator
            concreteBagCalculator: '预拌混凝土袋计算器',
            bagEstimation: '袋数估算',
            youWillNeed: '您需要：',
            bags: '袋',
            each: '每袋',
            totalWeight: '总重量',
            
            // Stairs Calculator
            stairsCalculatorTitle: '混凝土台阶计算器',
            stairsCalculatorDescription: '估算台阶所需的混凝土体积和材料。',
            stairsWidth: '台阶宽度',
            numberOfSteps: '台阶数量',
            riserHeight: '踢面高度',
            treadDepth: '踏步深度',
            landingDepth: '平台深度 (可选)',
            
            // Cost Calculator
            estimatedTotalCost: '预估总成本',
            
            // Main Page Content
            mainTitle: '混凝土计算器',
            mainSubtitle: '估算体积、材料和成本',
            mainDescription: '终极混凝土计算器，专为您的建筑项目设计。立即估算混凝土体积（平板、地基、柱子）、材料数量（水泥、沙子、砾石）和总成本。',
            
            // Features Section
            saveTime: '节省时间',
            saveTimeDesc: '无需复杂的手动计算，即可获得体积、材料和成本的即时估算。更有效地规划您的项目时间表。',
            planAccurately: '精准规划',
            planAccuratelyDesc: '无论您是浇筑简单的平板，还是需要计算结构支撑的正确尺寸和体积，我们的工具都能帮助您。查看我们专业的混凝土地基计算器，获得详细的基础规划。',
            saveMoney: '节省资金',
            saveMoneyDesc: '避免过度订购材料并减少浪费。我们的计算器帮助您精确购买所需材料，为您的建筑项目节省资金。',
            
            // Calculators Section
            exploreCalculators: '探索我们的专业计算器',
            exploreCalculatorsDesc: '为您特定的项目需求找到完美工具。',
            
            // Individual Calculator Names
            slabCalculator: '平板计算器',
            slabCalculatorDesc: '完美适用于露台、地板和地基。计算任何矩形混凝土平板的体积和材料。',
            footingCalculator: '地基计算器',
            footingCalculatorDesc: '估算墙基或地基垫层的混凝土用量。确保您结构的稳定和安全基础。',
            columnCalculatorDesc: '计算圆形立柱、桥墩和 Sonotube 所需的混凝土体积和材料。',
            yardsCalculator: '立方码计算器',
            yardsCalculatorDesc: '以立方码计算混凝土，用于预拌订购。完美适用于大型项目和专业承包商。',
            cylinderCalculator: '圆柱计算器',
            cylinderCalculatorDesc: '适用于柱子、立柱和 sonotube 地基等圆柱形结构的专业计算器。',
            costCalculator: '成本计算器',
            costCalculatorDesc: '获得包括材料、人工和运输费用在内的详细成本估算，用于您的混凝土项目。',
            rebarCalculator: '钢筋计算器',
            rebarCalculatorDesc: '确定您的混凝土平板和地基所需的钢筋数量。',
            stairsCalculatorDesc: '估算您的混凝土台阶和楼梯的混凝土体积。',
            bagCalculatorDesc: '使用预拌袋装混凝土？精确计算您的项目需要多少袋混凝土拌合物。',
            quikreteBagCalculator: 'Quikrete 袋装计算器',
            quikreteBagCalculatorDesc: '专门用于 Quikrete 产品。计算您的项目所需的 Quikrete 袋数。',
            
            // Guide Section
            learnMore: '了解更多混凝土知识',
            learnMoreDesc: '查看我们的指南，帮助您完美规划和执行项目。',
            howToGuide: '如何计算混凝土：逐步指南',
            bagGuide: '完整混凝土袋装指南：我需要多少袋？',
            formulas: '查看我们的计算公式',
            
            // How It Works
            howItWorks: '简单三步工作原理',
            step1Title: '选择单位和形状',
            step1Desc: '在英制（英尺、磅）和公制（米、千克）系统之间选择。然后选择您浇筑的形状——矩形平板或圆形立柱。',
            step2Title: '输入尺寸',
            step2Desc: '为您选择的形状输入所需的测量值（长度、宽度、高度/厚度或直径）。计算器会自动处理单位转换。',
            step3Title: '获得结果',
            step3Desc: '立即接收您的混凝土体积、材料明细、成本估算和袋装需求。保存或分享您的计算结果以备将来参考。',
            
            // Units
            feet: '英尺',
            meters: '米',
            inches: '英寸',
            centimeters: '厘米',
            cubicFeet: '立方英尺',
            cubicMeters: '立方米',
            cubicYards: '立方码',
            pounds: '磅',
            kilograms: '千克',
            
            // Form Fields
            length: '长度',
            width: '宽度',
            height: '高度',
            thickness: '厚度',
            diameter: '直径',
            depth: '深度',
            grade: '等级',
            bagSize: '袋装尺寸',
            customBagSize: '自定义袋装尺寸',
            bagWeight: '袋装重量 (磅)',
            bagYield: '袋装产量 (立方英尺)',
            costPerUnit: '每单位成本',
            costPerBag: '每袋成本',
            
            // Actions
            clearHistory: '清除历史',
            copyResults: '复制结果',
            deleteItem: '删除',
            viewHistory: '查看历史',
            reset: '重置',
            
            // Navigation
            home: '首页',
            calculators: '计算器',
            guides: '指南',
            glossary: '术语表',
            faq: '常见问题',
            contact: '联系我们',
            
            // Footer
            allRightsReserved: '版权所有。',
            privacyPolicy: '隐私政策',
            termsOfService: '服务条款',
            
            // Error messages
            invalidInput: '请输入有效数字',
            positiveNumber: '请输入正数',
            missingFields: '请填写所有必填字段'
        }
    };

    // --- UTILS ---
    // Cache current language to avoid repeated DOM access
    let currentLang = document.documentElement.lang || 'en';
    let currentTranslations = translations[currentLang] || translations['en'];
    
    const getLang = () => currentLang;
    const t = (key) => currentTranslations[key] || translations['en'][key];
    
    // Update language cache when language changes
    const updateLanguage = (lang) => {
        currentLang = lang;
        currentTranslations = translations[lang] || translations['en'];
        document.documentElement.lang = lang;
        translatePage();
    };
    
    // Optimized translation function with caching
    const translateElement = (element, key) => {
        const translation = t(key);
        if (translation && element && element.textContent !== translation) {
            element.textContent = translation;
        }
    };
    
    // Performance-optimized page translation
    const translatePage = () => {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            const elements = document.querySelectorAll('[data-translate]');
            const elementsArray = Array.from(elements);
            
            // Batch process translations for better performance
            elementsArray.forEach(element => {
                const key = element.getAttribute('data-translate');
                translateElement(element, key);
            });
        });
    };


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
    const guidesMenuButton = document.getElementById('guides-menu-button');
    const guidesMenu = document.getElementById('guides-menu');
    const shareBtn = document.getElementById('share-btn');

    // New elements for Bag Calculator
    const bagSizeSelect = document.getElementById('bag-size');
    const customBagInputs = document.getElementById('custom-bag-inputs');
    const customBagWeightInput = document.getElementById('custom-bag-weight');
    const customBagYieldInput = document.getElementById('custom-bag-yield');

    // New elements for Rebar Calculator
    const slabLengthInput = document.getElementById('slab-length');
    const slabWidthInput = document.getElementById('slab-width');
    const rebarSpacingInput = document.getElementById('rebar-spacing');
    const rebarSizeSelect = document.getElementById('rebar-size');
    const costPerLengthInput = document.getElementById('cost-per-length');
    const costPerPieceInput = document.getElementById('cost-per-piece');

    // New elements for Stairs Calculator
    const stairsWidthInput = document.getElementById('stairs-width');
    const numberOfStepsInput = document.getElementById('number-of-steps');
    const riserHeightInput = document.getElementById('riser-height');
    const treadDepthInput = document.getElementById('tread-depth');
    const landingDepthInput = document.getElementById('landing-depth');

    // New elements for Cost Estimation
    const costPerUnitInput = document.getElementById('cost-per-unit');
    const costUnitLabel = document.getElementById('cost-unit-label');
    const costPerBagInput = document.getElementById('cost-per-bag');


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

    const rebarData = {
        // Imperial sizes (weight in lbs per foot)
        "3": { weight: 0.376 }, // #3
        "4": { weight: 0.668 }, // #4
        "5": { weight: 1.043 }, // #5
        "6": { weight: 1.502 }, // #6
        // Metric sizes (weight in kg per meter)
        "10M": { weight: 0.785 },
        "15M": { weight: 1.570 },
        "20M": { weight: 2.355 }
    };


    // --- MOBILE OPTIMIZATION ---
    function setupMobileOptimizations() {
        // Prevent zoom on input focus for iOS
        const inputs = document.querySelectorAll('input[type="number"], input[type="text"], select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (window.innerWidth <= 768) {
                    input.style.fontSize = '16px';
                }
            });
        });
        
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');
        buttons.forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', () => {
                button.style.transform = 'scale(1)';
            });
        });
        
        // Optimize scroll performance
        let ticking = false;
        function updateScroll() {
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // --- EVENT LISTENERS & SETUP ---
    function setupEventListeners() {
        if (unitSystemDiv) {
            unitSystemDiv.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    setActiveButton(unitSystemDiv, e.target);
                    // Also update rebar options if on rebar page
                    if(rebarSizeSelect) updateRebarOptions(e.target.dataset.value);
                    resetCalculator(); // Clear results on unit change
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
        if(mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Add smooth animation for mobile menu
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.style.transform = 'translateY(0)';
                    mobileMenu.style.opacity = '1';
                } else {
                    mobileMenu.style.transform = 'translateY(-10px)';
                    mobileMenu.style.opacity = '0';
                }
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.style.transform = 'translateY(-10px)';
                    mobileMenu.style.opacity = '0';
                }
            });
            
            // Close mobile menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.style.transform = 'translateY(-10px)';
                    mobileMenu.style.opacity = '0';
                }
            });
        }
        if(languageMenuButton) languageMenuButton.addEventListener('click', (e) => { e.stopPropagation(); languageMenu.classList.toggle('hidden'); });
        if(calculatorsMenuButton) calculatorsMenuButton.addEventListener('click', (e) => { e.stopPropagation(); calculatorsMenu.classList.toggle('hidden'); });
        if(guidesMenuButton) guidesMenuButton.addEventListener('click', (e) => { e.stopPropagation(); guidesMenu.classList.toggle('hidden'); });
        if(shareBtn) shareBtn.addEventListener('click', shareResults);
        
        document.addEventListener('click', () => {
            if(languageMenu) languageMenu.classList.add('hidden');
            if(calculatorsMenu) calculatorsMenu.classList.add('hidden');
            if(guidesMenu) guidesMenu.classList.add('hidden');
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
        updateUnitLabels(button.dataset.value);
    }
    
    function updateUnitLabels(unit) {
        document.querySelectorAll('.unit-label-dist').forEach(el => el.textContent = unit === 'metric' ? 'm' : 'ft');
        document.querySelectorAll('.unit-label-mass').forEach(el => el.textContent = unit === 'metric' ? 'kg' : 'lb');
        document.querySelectorAll('.unit-label-small-dist').forEach(el => el.textContent = unit === 'metric' ? 'mm' : 'in');
        if (costUnitLabel) {
            costUnitLabel.textContent = unit === 'metric' ? '/ m³' : '/ yd³';
        }
    }

    function updateRebarOptions(unit) {
        const imperialGroup = rebarSizeSelect.querySelector('optgroup[label="Imperial (US)"]');
        const metricGroup = rebarSizeSelect.querySelector('optgroup[label="Metric"]');

        if (unit === 'metric') {
            imperialGroup.classList.add('hidden');
            metricGroup.classList.remove('hidden');
            rebarSizeSelect.value = '15M'; // Default to a common metric size
        } else {
            imperialGroup.classList.remove('hidden');
            metricGroup.classList.add('hidden');
            rebarSizeSelect.value = '4'; // Default to a common imperial size
        }
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

        // Page-specific logic
        if (document.getElementById('bag-size')) {
            displayBagResults();
        } else if (document.getElementById('rebar-size')) {
            displayRebarResults();
        } else if (document.getElementById('column-calculator-form')) {
            displayColumnResults();
        } else if (document.getElementById('stairs-calculator-form')) {
            displayStairsResults();
        } else {
            displayMaterialResults();
        }
    }

    function displayMaterialResults() {
        const currentUnitSystem = unitSystemDiv ? unitSystemDiv.querySelector('.bg-white').dataset.value : 'imperial';
        const currentShape = shapeSelectorDiv ? shapeSelectorDiv.querySelector('.bg-white').dataset.value : 'rectangle';
        const costPerUnit = costPerUnitInput ? parseFloat(costPerUnitInput.value) : 0;

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

        let costHtml = '';
        if (costPerUnit > 0) {
            const totalCost = volume * costPerUnit;
            const currencySymbol = getLang() === 'zh' ? '¥' : '$';
            costHtml = `
            <div class="text-center border-b-2 border-dashed border-slate-200 pb-4 mb-4">
                <p class="text-sm text-slate-500">${t('estimatedTotalCost')}</p>
                <p class="text-4xl font-bold text-green-600 my-2">${currencySymbol}${totalCost.toFixed(2)}</p>
            </div>
            `;
        }

        resultsOutput.innerHTML = `
            ${costHtml}
            <div class="text-center w-full">
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
        const costPerBag = costPerBagInput ? parseFloat(costPerBagInput.value) : 0;

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

        let costHtml = '';
        if (costPerBag > 0) {
            const totalCost = bagsNeeded * costPerBag;
            const currencySymbol = getLang() === 'zh' ? '¥' : '$';
            costHtml = `
            <div class="text-center border-b-2 border-dashed border-slate-200 pb-4 mb-4">
                <p class="text-sm text-slate-500">${t('estimatedTotalCost')}</p>
                <p class="text-4xl font-bold text-green-600 my-2">${currencySymbol}${totalCost.toFixed(2)}</p>
            </div>
            `;
        }

        resultsOutput.innerHTML = `
            ${costHtml}
            <div class="text-center w-full">
                <p class="text-lg text-slate-600">${t('youWillNeed')}</p>
                <p class="text-5xl font-extrabold text-brand-primary my-2">${bagsNeeded}</p>
                <p class="text-lg text-slate-600">${t('bags')} (${bagWeight} ${weightUnit} ${t('each')})</p>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-200 w-full text-sm">
                 <div class="flex justify-between">
                    <dt class="text-slate-600">${t('totalVolume')}:</dt>
                    <dd class="font-medium text-slate-800">${volume_ft3.toFixed(2)} ft³</dd>
                </div>
                 <div class="flex justify-between mt-1">
                    <dt class="text-slate-600">${t('totalWeight')}:</dt>
                    <dd class="font-medium text-slate-800">~${displayTotalWeight} ${weightUnit}</dd>
                </div>
            </div>
        `;
        updateActionButtons(false);
    }

    function displayRebarResults() {
        const unit = unitSystemDiv.querySelector('.bg-white').dataset.value;
        const length = parseFloat(slabLengthInput.value);
        const width = parseFloat(slabWidthInput.value);
        let spacing = parseFloat(rebarSpacingInput.value);
        const rebarSize = rebarSizeSelect.value;
        const costPerLength = costPerLengthInput ? parseFloat(costPerLengthInput.value) : 0;
        const costPerPiece = costPerPieceInput ? parseFloat(costPerPieceInput.value) : 0;
        
        if (isNaN(length) || isNaN(width) || isNaN(spacing) || length <= 0 || width <= 0 || spacing <= 0) {
            resultsOutput.innerHTML = `<p class="text-red-500">Please enter valid dimensions and spacing.</p>`;
            return;
        }

        // Convert all dimensions to a common unit (inches) for calculation
        const length_in = unit === 'metric' ? length * 39.3701 : length * 12;
        const width_in = unit === 'metric' ? width * 39.3701 : width * 12;
        if (unit === 'metric') spacing = spacing / 25.4; // mm to inches

        const numBarsLengthwise = Math.floor(width_in / spacing) + 1;
        const numBarsWidthwise = Math.floor(length_in / spacing) + 1;

        const totalLength_ft = (numBarsLengthwise * length) + (numBarsWidthwise * width);
        const totalLength_m = unit === 'metric' ? totalLength_ft * 0.3048 : totalLength_ft / 3.28084;

        const totalWeight = unit === 'metric'
            ? totalLength_m * rebarData[rebarSize].weight
            : totalLength_ft * rebarData[rebarSize].weight;
            
        const totalPieces = numBarsLengthwise + numBarsWidthwise;
        
        const displayLength = unit === 'metric' ? totalLength_m.toFixed(1) : totalLength_ft.toFixed(1);
        const displayWeight = totalWeight.toFixed(1);
        const lengthUnit = unit === 'metric' ? 'm' : 'ft';
        const weightUnit = unit === 'metric' ? 'kg' : 'lbs';

        let costHtml = '';
        if (costPerPiece > 0) {
            const totalCost = totalPieces * costPerPiece;
            const currencySymbol = getLang() === 'zh' ? '¥' : '$';
            costHtml = `
            <div class="text-center border-b-2 border-dashed border-slate-200 pb-4 mb-4">
                <p class="text-sm text-slate-500">${t('estimatedTotalCost')}</p>
                <p class="text-4xl font-bold text-green-600 my-2">${currencySymbol}${totalCost.toFixed(2)}</p>
            </div>
            `;
        } else if (costPerLength > 0) {
            const totalLength = unit === 'metric' ? totalLength_m : totalLength_ft;
            const totalCost = totalLength * costPerLength;
            const currencySymbol = getLang() === 'zh' ? '¥' : '$';
            costHtml = `
            <div class="text-center border-b-2 border-dashed border-slate-200 pb-4 mb-4">
                <p class="text-sm text-slate-500">${t('estimatedTotalCost')}</p>
                <p class="text-4xl font-bold text-green-600 my-2">${currencySymbol}${totalCost.toFixed(2)}</p>
            </div>
            `;
        }

        resultsOutput.innerHTML = `
            ${costHtml}
            <div class="space-y-4 w-full">
                <div class="text-center">
                    <p class="text-lg text-slate-600">Total Rebar Length</p>
                    <p class="text-4xl font-extrabold text-brand-primary my-1">${displayLength} <span class="text-3xl">${lengthUnit}</span></p>
                </div>
                <div class="mt-4 pt-4 border-t border-slate-200 w-full text-sm">
                     <dl class="space-y-1">
                        <div class="flex justify-between">
                            <dt class="text-slate-600">Total Weight:</dt>
                            <dd class="font-medium text-slate-800">${displayWeight} ${weightUnit}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-slate-600">Total Pieces:</dt>
                            <dd class="font-medium text-slate-800">${totalPieces} pcs</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-slate-600">Lengthwise:</dt>
                            <dd class="font-medium text-slate-800">${numBarsLengthwise} pcs</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-slate-600">Widthwise:</dt>
                            <dd class="font-medium text-slate-800">${numBarsWidthwise} pcs</dd>
                        </div>
                    </dl>
                </div>
            </div>
        `;
        updateActionButtons(false);
    }

    function displayColumnResults() {
        const unit = unitSystemDiv.querySelector('.bg-white').dataset.value;
        const diameter = parseFloat(document.getElementById('column-diameter').value);
        const height = parseFloat(document.getElementById('column-height').value);
        const quantity = parseInt(document.getElementById('column-quantity').value, 10);

        if (isNaN(diameter) || isNaN(height) || isNaN(quantity) || diameter <= 0 || height <= 0 || quantity <= 0) {
            resultsOutput.innerHTML = `<p class="text-red-500">Please enter valid dimensions.</p>`;
            return;
        }

        // Convert dimensions to feet for a consistent calculation base
        const diameter_ft = unit === 'metric' ? diameter / 30.48 : diameter / 12;
        const height_ft = unit === 'metric' ? height * 3.28084 : height;
        const radius_ft = diameter_ft / 2;

        const volume_ft3_single = Math.PI * Math.pow(radius_ft, 2) * height_ft;
        const total_volume_ft3 = volume_ft3_single * quantity;
        const total_volume_yd3 = total_volume_ft3 / 27;
        const total_volume_m3 = total_volume_ft3 * 0.0283168;

        let bagHtml = '';
        for (const [weight, yield_ft3] of Object.entries(bagYields)) {
            const bagsNeeded = Math.ceil(total_volume_ft3 / yield_ft3);
            bagHtml += `
                <div class="flex justify-between items-center bg-slate-200/50 p-2 rounded-md">
                    <span class="font-medium text-slate-800">${bagsNeeded} bags</span>
                    <span class="text-sm text-slate-600">@ ${weight} lb/bag</span>
                </div>
            `;
        }

        resultsOutput.innerHTML = `
            <div class="w-full">
                <div class="text-center">
                    <p class="text-sm text-slate-500" data-translate="requiredVolume">Required Volume</p>
                    <p class="text-4xl font-bold text-brand-primary my-2">${unit === 'metric' ? total_volume_m3.toFixed(2) : total_volume_yd3.toFixed(2)} <span class="text-3xl">${unit === 'metric' ? 'm³' : 'yd³'}</span></p>
                    <p class="text-sm text-slate-500">${total_volume_ft3.toFixed(2)} ft³</p>
                </div>
                <div class="mt-4 pt-4 border-t border-slate-200 w-full text-sm">
                    <p class="font-semibold text-slate-700 mb-2" data-translate="bagEstimation">Bag Estimation</p>
                    <div class="space-y-2">${bagHtml}</div>
                </div>
            </div>
        `;
    }

    function displayStairsResults() {
        const unit = unitSystemDiv.querySelector('.bg-white').dataset.value;
        const stairsWidth = parseFloat(document.getElementById('stairs-width').value);
        const numberOfSteps = parseInt(document.getElementById('number-of-steps').value, 10);
        const riserHeight = parseFloat(document.getElementById('riser-height').value);
        const treadDepth = parseFloat(document.getElementById('tread-depth').value);
        const landingDepth = parseFloat(document.getElementById('landing-depth').value);

        if (isNaN(stairsWidth) || isNaN(numberOfSteps) || isNaN(riserHeight) || isNaN(treadDepth) || stairsWidth <= 0 || numberOfSteps <= 0 || riserHeight <= 0 || treadDepth <= 0) {
            resultsOutput.innerHTML = `<p class="text-red-500">Please enter valid dimensions for all stair fields.</p>`;
            return;
        }

        // Convert all inputs to feet for calculation base
        let stairsWidth_ft = unit === 'metric' ? stairsWidth * 3.28084 : stairsWidth;
        let riserHeight_ft = unit === 'metric' ? riserHeight / 100 * 3.28084 : riserHeight / 12;
        let treadDepth_ft = unit === 'metric' ? treadDepth / 100 * 3.28084 : treadDepth / 12;
        let landingDepth_ft = unit === 'metric' ? landingDepth * 3.28084 : landingDepth;

        // Calculate volume of the steps (each step is a right-angle triangle prism)
        // Volume of one step = 0.5 * base (tread depth) * height (riser height) * width (stairs width)
        const volume_steps_ft3 = numberOfSteps * (0.5 * treadDepth_ft * riserHeight_ft * stairsWidth_ft);

        // Calculate volume of the landing (if any)
        let volume_landing_ft3 = 0;
        if (landingDepth_ft > 0) {
            // Landing width is the same as stairs width
            // Landing thickness is the same as the top riser height
            volume_landing_ft3 = stairsWidth_ft * landingDepth_ft * riserHeight_ft;
        }

        const total_volume_ft3 = volume_steps_ft3 + volume_landing_ft3;
        const total_volume_yd3 = total_volume_ft3 / 27;
        const total_volume_m3 = total_volume_ft3 * 0.0283168;

        let bagHtml = '';
        for (const [weight, yield_ft3] of Object.entries(bagYields)) {
            const bagsNeeded = Math.ceil(total_volume_ft3 / yield_ft3);
            bagHtml += `
                <div class="flex justify-between items-center bg-slate-200/50 p-2 rounded-md">
                    <span class="font-medium text-slate-800">${bagsNeeded} bags</span>
                    <span class="text-sm text-slate-600">@ ${weight} lb/bag</span>
                </div>
            `;
        }

        resultsOutput.innerHTML = `
            <div class="w-full">
                <div class="text-center">
                    <p class="text-sm text-slate-500" data-translate="requiredVolume">Required Volume</p>
                    <p class="text-4xl font-bold text-brand-primary my-2">${unit === 'metric' ? total_volume_m3.toFixed(2) : total_volume_yd3.toFixed(2)} <span class="text-3xl">${unit === 'metric' ? 'm³' : 'yd³'}</span></p>
                    <p class="text-sm text-slate-500">${total_volume_ft3.toFixed(2)} ft³</p>
                </div>
                <div class="mt-4 pt-4 border-t border-slate-200 w-full text-sm">
                    <p class="font-semibold text-slate-700 mb-2" data-translate="bagEstimation">Bag Estimation</p>
                    <div class="space-y-2">${bagHtml}</div>
                </div>
            </div>
        `;
        updateActionButtons(false);
    }


    function resetCalculator() {
        const isRebarPage = !!document.getElementById('rebar-size');
        let initialSvg = `<svg class="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3.333A3.333 3.333 0 0012.667 11H11.333A3.333 3.333 0 008 13.667V17m0-10a3 3 0 013-3h2a3 3 0 013 3v1.333A3.333 3.333 0 0117.333 11H6.667A3.333 3.333 0 014.333 8.333V7a3 3 0 013-3z"></path></svg>`;
        if (isRebarPage) {
            initialSvg = `<svg class="w-16 h-16 text-slate-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" /></svg>`;
        }
        
        resultsOutput.innerHTML = `
            ${initialSvg}
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

    function shareResults() {
        if (navigator.share) {
            let shareText = "Check out this concrete calculator!";
            if (lastCalculation) {
                shareText = `I calculated my concrete needs using this calculator!\n\n${getResultsAsText(lastCalculation)}\n\nCheck it out: ${window.location.href}`;
            }
            navigator.share({
                title: document.title,
                text: shareText,
                url: window.location.href,
            }).catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback for browsers that do not support Web Share API
            alert("Web Share API is not supported in your browser. You can copy the URL from the address bar.");
        }
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
    translatePage(); // Translate all elements with data-translate attribute
    resetCalculator(); // Display initial message
    loadHistory();
    setupEventListeners();
    setupMobileOptimizations(); // Setup mobile optimizations
    updateInputsForShape('rectangle');
});
const translations = {
  en: {
    // Header & Hero
    header_nav_link: "Use Calculator",
    hero_title: "The Ultimate Concrete Calculator",
    hero_subtitle: "Effortlessly estimate materials, volume, and costs for your next project. Accurate, fast, and free.",
    hero_cta: "Start Calculating Now",

    // Calculator
    calculator_title_1: "1. Enter Dimensions",
    calculator_subtitle_1: "Select your unit system and shape.",
    unit_imperial: "Imperial (ft, lb)",
    unit_metric: "Metric (m, kg)",
    shape_rectangle: "Slab / Rectangle",
    shape_circle: "Column / Circle",
    label_length: "Length",
    label_width: "Width",
    label_radius: "Radius",
    label_height: "Height / Thickness",
    label_grade: "Concrete Grade / Strength",
    grade_c25: "C25 (~4000 psi)",
    grade_c20: "C20 (~3000 psi)",
    grade_c15: "C15 (~2500 psi)",
    grade_c30: "C30 (~5000 psi)",
    calculator_title_2: "2. Get Results",
    results_placeholder_title: "Your results will appear here.",
    results_placeholder_subtitle: "Enter dimensions and press Calculate.",
    calculate_button: "Calculate",
    
    // Results
    result_total_volume: "Total Volume",
    result_materials_needed: "Materials Needed:",
    result_cement: "Cement",
    result_cement_bags: "bags",
    result_sand: "Sand",
    result_gravel: "Gravel",
    result_cost_estimation: "Cost Estimation:",
    result_materials_subtotal: "Materials Subtotal",
    result_labor: "Labor",
    result_total_cost: "Total",
    
    // History
    history_title: "Recent Calculations",
    history_clear: "Clear History",
    history_slab: "Slab",
    history_column: "Column",

    // Benefits Section
    benefits_title: "Why Use Our Concrete Calculator?",
    benefits_subtitle: "From DIY patio projects to professional construction footings, accuracy is key. Here’s how our tool helps you succeed.",
    benefit_1_title: "Save Money",
    benefit_1_text: "Avoid over-ordering materials. Our precise calculations ensure you buy only what you need, reducing waste and saving you money.",
    benefit_2_title: "Save Time",
    benefit_2_text: "Get instant estimates for volume, materials, and cost without complex manual calculations. Plan your project schedule more effectively.",
    benefit_3_title: "Increase Accuracy",
    benefit_3_text: "Based on standard industry formulas, our tool helps prevent costly errors from inaccurate concrete and material estimates.",
    
    // How It Works Section
    how_title: "How It Works in 3 Simple Steps",
    how_1_title: "Select Units & Shape",
    how_1_text: "Choose between Imperial (ft, lb) and Metric (m, kg) systems. Then, select the shape of your pour—a rectangular slab or a circular column.",
    how_2_title: "Enter Dimensions",
    how_2_text: "Input the length, width, and thickness for slabs, or the radius and height for columns. Select the desired concrete strength (grade).",
    how_3_title: "Get Instant Results",
    how_3_text: "Click 'Calculate' to see the required volume, a detailed list of materials (cement, sand, gravel), and a full cost breakdown.",

    // Key Features Section
    features_title: "Everything You Need in One Place",
    feature_1_title: "Dual Unit System",
    feature_1_text: "Seamlessly switch between Imperial (yards³, feet, pounds) and Metric (meters³, kilograms) units to match your project's requirements.",
    feature_2_title: "Material Breakdown",
    feature_2_text: "Get a detailed list of the required materials, including the exact amount of cement (in bags), sand, and gravel needed for your specific concrete grade.",
    feature_3_title: "Comprehensive Cost Estimation",
    feature_3_text: "Our calculator provides a full cost analysis, breaking down expenses for materials and labor to help you budget accurately.",
    feature_4_title: "Calculation History",
    feature_4_text: "Save your recent calculations directly in your browser. Easily access and compare estimates for different parts of your project.",

    // Testimonials Section
    testimonials_title: "Trusted by Builders and DIYers",
    testimonial_1_text: "\"This calculator is a lifesaver. It's simple, accurate, and the cost estimation helped me stay on budget for my new patio.\"",
    testimonial_1_author: "John D., Homeowner",
    testimonial_2_text: "\"As a small contractor, time is money. This tool gives me quick estimates on-site. The history feature is brilliant for managing multiple jobs.\"",
    testimonial_2_author: "Maria Garcia, MG Construction",
    testimonial_3_text: "\"Finally, a concrete calculator that's easy to use on mobile and provides all the details I need. Highly recommended.\"",
    testimonial_3_author: "David Chen, DIY Enthusiast",

    // Pricing Section
    pricing_title: "Simple and Transparent",
    pricing_subtitle: "Our core calculator is, and always will be, free. We believe in providing value to the construction community.",
    pricing_plan_free_title: "Free",
    pricing_plan_free_price: "$0",
    pricing_plan_free_mo: "/ forever",
    pricing_feature_1: "Unlimited calculations",
    pricing_feature_2: "Material & cost estimates",
    pricing_feature_3: "Local history storage",
    pricing_feature_4: "Standard concrete grades",
    pricing_cta_free: "Use for Free",

    // FAQ Section
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Answers to common questions about concrete calculations.",
    faq_1_q: "What do the concrete grades (C15, C20, C25) mean?",
    faq_1_a: "The 'C' stands for Compressive strength, and the number represents the concrete's characteristic compressive strength in megapascals (MPa) after 28 days. C25, for example, has a strength of 25 MPa (~3625 psi). Higher numbers mean stronger concrete.",
    faq_2_q: "How accurate is this calculator?",
    faq_2_a: "Our calculator uses standard industry formulas. The results are highly accurate for estimation. However, always consider factors like waste and spillage. It's common practice to order 5-10% extra concrete to be safe.",
    faq_3_q: "Can I use this for both ready-mix and hand-mixing?",
    faq_3_a: "Yes. For ready-mix, the total volume figure is what you need. If you're mixing it yourself, the detailed material breakdown (cement, sand, gravel) tells you what components to buy.",
    faq_4_q: "Are the prices in the cost estimation current?",
    faq_4_a: "The prices used are based on general market averages for estimation purposes only. Material and labor costs can vary significantly based on your location. We recommend contacting local suppliers for precise quotes.",

    // Footer
    footer_text: "A lightweight, fast, and accurate tool for all your concrete estimation needs."
  },
  zh: {
    // Header & Hero
    header_nav_link: "使用计算器",
    hero_title: "终极混凝土计算器",
    hero_subtitle: "轻松估算您下一个项目的材料、体积和成本。准确、快速、免费。",
    hero_cta: "立即开始计算",

    // Calculator
    calculator_title_1: "1. 输入尺寸",
    calculator_subtitle_1: "选择您的单位系统和形状。",
    unit_imperial: "英制 (ft, lb)",
    unit_metric: "公制 (m, kg)",
    shape_rectangle: "板/矩形",
    shape_circle: "柱/圆形",
    label_length: "长度",
    label_width: "宽度",
    label_radius: "半径",
    label_height: "高度/厚度",
    label_grade: "混凝土标号/强度",
    grade_c25: "C25 (~4000 psi)",
    grade_c20: "C20 (~3000 psi)",
    grade_c15: "C15 (~2500 psi)",
    grade_c30: "C30 (~5000 psi)",
    calculator_title_2: "2. 获取结果",
    results_placeholder_title: "您的结果将显示在此处。",
    results_placeholder_subtitle: "输入尺寸并按“计算”。",
    calculate_button: "计算",
    
    // Results
    result_total_volume: "总体积",
    result_materials_needed: "所需材料：",
    result_cement: "水泥",
    result_cement_bags: "袋",
    result_sand: "沙子",
    result_gravel: "石子",
    result_cost_estimation: "成本估算：",
    result_materials_subtotal: "材料小计",
    result_labor: "人工",
    result_total_cost: "总计",
    
    // History
    history_title: "最近计算",
    history_clear: "清除历史",
    history_slab: "板",
    history_column: "柱",
    
    // Benefits Section
    benefits_title: "为何使用我们的混凝土计算器？",
    benefits_subtitle: "从DIY庭院项目到专业的建筑地基，准确性是关键。这是我们的工具如何帮助您成功的方法。",
    benefit_1_title: "节省金钱",
    benefit_1_text: "避免过度订购材料。我们精确的计算确保您只购买所需，减少浪费并为您省钱。",
    benefit_2_title: "节省时间",
    benefit_2_text: "无需复杂的手动计算，即时获得体积、材料和成本的估算。更有效地规划您的项目进度。",
    benefit_3_title: "提高准确性",
    benefit_3_text: "基于标准行业公式，我们的工具有助于防止因不准确的混凝土和材料估算而导致的昂贵错误。",

    // How It Works Section
    how_title: "三步搞定",
    how_1_title: "选择单位和形状",
    how_1_text: "在英制（英尺，磅）和公制（米，公斤）系统之间选择。然后，选择您浇筑的形状——矩形板或圆柱。",
    how_2_title: "输入尺寸",
    how_2_text: "输入板的长、宽、厚，或圆柱的半径和高。选择所需的混凝土强度（标号）。",
    how_3_title: "获取即时结果",
    how_3_text: "点击“计算”，查看所需体积、详细的材料清单（水泥、沙子、石子）和完整的成本明细。",

    // Key Features Section
    features_title: "您需要的一切，尽在此处",
    feature_1_title: "双单位系统",
    feature_1_text: "在英制（码³，英尺，磅）和公制（米³，公斤）单位之间无缝切换，以满足您的项目要求。",
    feature_2_title: "材料明细",
    feature_2_text: "获取所需材料的详细清单，包括针对您特定混凝土标号所需的水泥（袋数）、沙子和石子的确切数量。",
    feature_3_title: "综合成本估算",
    feature_3_text: "我们的计算器提供全面的成本分析，分解材料和人工费用，帮助您准确预算。",
    feature_4_title: "计算历史",
    feature_4_text: "将您最近的计算直接保存在浏览器中。轻松访问和比较项目不同部分的估算。",

    // Testimonials Section
    testimonials_title: "深受建筑商和DIY爱好者的信赖",
    testimonial_1_text: "“这个计算器是救星。它简单、准确，成本估算帮助我的新庭院项目保持在预算内。”",
    testimonial_1_author: "张伟，房主",
    testimonial_2_text: "“作为一名小承包商，时间就是金钱。这个工具让我在现场快速估价。历史功能对于管理多个项目来说非常出色。”",
    testimonial_2_author: "李娜，LN建筑",
    testimonial_3_text: "“终于有了一个在手机上易于使用并提供我需要的所有细节的混凝土计算器。强烈推荐。”",
    testimonial_3_author: "王强，DIY爱好者",

    // Pricing Section
    pricing_title: "简单透明",
    pricing_subtitle: "我们的核心计算器现在是，并且永远是免费的。我们坚信为建筑社区提供价值。",
    pricing_plan_free_title: "免费版",
    pricing_plan_free_price: "¥0",
    pricing_plan_free_mo: "/ 永久",
    pricing_feature_1: "无限次计算",
    pricing_feature_2: "材料和成本估算",
    pricing_feature_3: "本地历史记录存储",
    pricing_feature_4: "标准混凝土标号",
    pricing_cta_free: "免费使用",

    // FAQ Section
    faq_title: "常见问题",
    faq_subtitle: "关于混凝土计算的常见问题解答。",
    faq_1_q: "混凝土标号（C15, C20, C25）是什么意思？",
    faq_1_a: "'C'代表抗压强度，数字代表混凝土28天后的特征抗压强度（兆帕，MPa）。例如，C25的强度为25 MPa（约3625 psi）。数字越大，混凝土越强。",
    faq_2_q: "这个计算器有多准确？",
    faq_2_a: "我们的计算器使用标准的行业公式。结果对于估算目的非常准确。但是，请始终考虑浪费、溢出等因素。通常做法是多订购5-10%的混凝土以确保安全。",
    faq_3_q: "我可以将它用于预拌混凝土和手动搅拌吗？",
    faq_3_a: "是的。如果您订购预拌混凝土，您需要的是总体积数据。如果您自己搅拌，详细的材料分解（水泥袋、沙子、石子）会告诉您需要购买哪些组分。",
    faq_4_q: "成本估算中的价格是当前的吗？",
    faq_4_a: "所用价格基于一般市场平均水平，仅供估算。材料和人工成本会因您所在地区和供应商而有很大差异。我们建议联系当地供应商获取精确报价。",
    
    // Footer
    footer_text: "一个轻量、快速、准确的工具，满足您所有的混凝土估算需求。"
  },
  es: {
    // Header & Hero
    header_nav_link: "Usar Calculadora",
    hero_title: "La Calculadora de Concreto Definitiva",
    hero_subtitle: "Estime sin esfuerzo materiales, volumen y costos para su próximo proyecto. Precisa, rápida y gratuita.",
    hero_cta: "Comenzar a Calcular Ahora",

    // Calculator
    calculator_title_1: "1. Ingrese Dimensiones",
    calculator_subtitle_1: "Seleccione su sistema de unidades y forma.",
    unit_imperial: "Imperial (ft, lb)",
    unit_metric: "Métrico (m, kg)",
    shape_rectangle: "Losa / Rectángulo",
    shape_circle: "Columna / Círculo",
    label_length: "Longitud",
    label_width: "Ancho",
    label_radius: "Radio",
    label_height: "Altura / Espesor",
    label_grade: "Grado / Resistencia del Concreto",
    grade_c25: "C25 (~4000 psi)",
    grade_c20: "C20 (~3000 psi)",
    grade_c15: "C15 (~2500 psi)",
    grade_c30: "C30 (~5000 psi)",
    calculator_title_2: "2. Obtenga Resultados",
    results_placeholder_title: "Sus resultados aparecerán aquí.",
    results_placeholder_subtitle: "Ingrese las dimensiones y presione Calcular.",
    calculate_button: "Calcular",
    
    // Results
    result_total_volume: "Volumen Total",
    result_materials_needed: "Materiales Necesarios:",
    result_cement: "Cemento",
    result_cement_bags: "sacos",
    result_sand: "Arena",
    result_gravel: "Grava",
    result_cost_estimation: "Estimación de Costos:",
    result_materials_subtotal: "Subtotal de Materiales",
    result_labor: "Mano de Obra",
    result_total_cost: "Costo Total",
    
    // History
    history_title: "Cálculos Recientes",
    history_clear: "Limpiar Historial",
    history_slab: "Losa",
    history_column: "Columna",

    // Benefits Section
    benefits_title: "¿Por Qué Usar Nuestra Calculadora de Concreto?",
    benefits_subtitle: "Desde proyectos de bricolaje en el patio hasta cimientos de construcción profesionales, la precisión es clave. Así es como nuestra herramienta le ayuda a tener éxito.",
    benefit_1_title: "Ahorre Dinero",
    benefit_1_text: "Evite pedir materiales en exceso. Nuestros cálculos precisos aseguran que compre solo lo que necesita, reduciendo el desperdicio y ahorrándole dinero.",
    benefit_2_title: "Ahorre Tiempo",
    benefit_2_text: "Obtenga estimaciones instantáneas de volumen, materiales y costos sin cálculos manuales complejos. Planifique el cronograma de su proyecto de manera más efectiva.",
    benefit_3_title: "Aumente la Precisión",
    benefit_3_text: "Basado en fórmulas estándar de la industria, nuestra herramienta ayuda a prevenir errores costosos por estimaciones incorrectas de concreto y materiales.",
    
    // How It Works Section
    how_title: "Cómo Funciona en 3 Pasos Simples",
    how_1_title: "Seleccione Unidades y Forma",
    how_1_text: "Elija entre los sistemas Imperial (pies, libras) y Métrico (metros, kilogramos). Luego, seleccione la forma de su vertido: una losa rectangular o una columna circular.",
    how_2_title: "Ingrese Dimensiones",
    how_2_text: "Ingrese la longitud, el ancho y el espesor para las losas, o el radio y la altura para las columnas. Seleccione la resistencia del concreto deseada (grado).",
    how_3_title: "Obtenga Resultados Instantáneos",
    how_3_text: "Haga clic en 'Calcular' para ver el volumen requerido, una lista detallada de materiales (cemento, arena, grava) y un desglose completo de los costos.",

    // Key Features Section
    features_title: "Todo lo que Necesita en un Solo Lugar",
    feature_1_title: "Sistema de Doble Unidad",
    feature_1_text: "Cambie sin problemas entre unidades imperiales (yardas³, pies, libras) y métricas (metros³, kilogramos) para que coincida con los requisitos de su proyecto.",
    feature_2_title: "Desglose de Materiales",
    feature_2_text: "Obtenga una lista detallada de los materiales requeridos, incluida la cantidad exacta de cemento (en sacos), arena y grava necesarios para su grado de concreto específico.",
    feature_3_title: "Estimación Integral de Costos",
    feature_3_text: "Nuestra calculadora proporciona un análisis de costos completo, desglosando los gastos de materiales y mano de obra para ayudarlo a presupuestar con precisión.",
    feature_4_title: "Historial de Cálculos",
    feature_4_text: "Guarde sus cálculos recientes directamente en su navegador. Acceda y compare fácilmente las estimaciones para diferentes partes de su proyecto.",

    // Testimonials Section
    testimonials_title: "Confiado por Constructores y Aficionados al Bricolaje",
    testimonial_1_text: "\"Esta calculadora es un salvavidas. Es simple, precisa, y la estimación de costos me ayudó a mantenerme dentro del presupuesto para mi nuevo patio.\"",
    testimonial_1_author: "Juan Pérez, Propietario",
    testimonial_2_text: "\"Como pequeño contratista, el tiempo es dinero. Esta herramienta me da estimaciones rápidas en el sitio. La función de historial es brillante para gestionar múltiples trabajos.\"",
    testimonial_2_author: "María García, MG Construcción",
    testimonial_3_text: "\"Finalmente, una calculadora de concreto que es fácil de usar en el móvil y proporciona todos los detalles que necesito. Muy recomendada.\"",
    testimonial_3_author: "David Reyes, Entusiasta del Bricolaje",
    
    // Pricing Section
    pricing_title: "Simple y Transparente",
    pricing_subtitle: "Nuestra calculadora principal es, y siempre será, gratuita. Creemos en proporcionar valor a la comunidad de la construcción.",
    pricing_plan_free_title: "Gratis",
    pricing_plan_free_price: "$0",
    pricing_plan_free_mo: "/ para siempre",
    pricing_feature_1: "Cálculos ilimitados",
    pricing_feature_2: "Estimaciones de materiales y costos",
    pricing_feature_3: "Almacenamiento de historial local",
    pricing_feature_4: "Grados de concreto estándar",
    pricing_cta_free: "Usar Gratis",

    // FAQ Section
    faq_title: "Preguntas Frecuentes",
    faq_subtitle: "Respuestas a preguntas comunes sobre cálculos de concreto.",
    faq_1_q: "¿Qué significan los grados de concreto (C15, C20, C25)?",
    faq_1_a: "La 'C' significa Resistencia a la Compresión, y el número representa la resistencia a la compresión característica del concreto en megapascales (MPa) después de 28 días. C25, por ejemplo, tiene una resistencia de 25 MPa (~3625 psi). Números más altos significan un concreto más fuerte.",
    faq_2_q: "¿Qué tan precisa es esta calculadora?",
    faq_2_a: "Nuestra calculadora utiliza fórmulas estándar de la industria. Los resultados son muy precisos para la estimación. Sin embargo, siempre considere factores como el desperdicio y los derrames. Es una práctica común pedir un 5-10% extra de concreto para estar seguro.",
    faq_3_q: "¿Puedo usar esto tanto para concreto premezclado como para mezcla manual?",
    faq_3_a: "Sí. Para el concreto premezclado, la cifra de volumen total es lo que necesita. Si lo está mezclando usted mismo, el desglose detallado de materiales (cemento, arena, grava) le dice qué componentes comprar.",
    faq_4_q: "¿Son actuales los precios en la estimación de costos?",
    faq_4_a: "Los precios utilizados se basan en promedios generales del mercado solo para fines de estimación. Los costos de materiales y mano de obra pueden variar significativamente según su ubicación. Recomendamos contactar a proveedores locales para obtener cotizaciones precisas.",
    
    // Footer
    footer_text: "Una herramienta ligera, rápida y precisa para todas sus necesidades de estimación de concreto."
  }
}; 
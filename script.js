import { GoogleGenAI } from "@google/genai";

// --- Constants & Data ---
const SKILLS = [
    'Excel', 'Power BI', 'SQL', 'Python', 'Data Visualization', 'EDA', 'DAX', 'Pandas', 'Scikit-Learn', 'Data Storytelling'
];

const PROJECTS = [
    {
        id: '1',
        title: 'Payroll Analysis Dashboard',
        description: 'Multi-page dashboard analyzing payroll costs, headcount trends and departmental variance.',
        image: 'github/payroll.png',
        tags: ['Power BI', 'Excel'],
        link: 'https://github.com/olababsmichael/Public-Sector-Payroll-Transparency-Optimization-'
    },
    {
        id: '2',
        title: 'Hospital Patient Admissions',
        description: 'Analysis of admissions by demographics, conditions, and insurance to inform resource planning.',
        image: 'github/Healthcareprojectdashboard.jpg',
        tags: ['Excel', 'Data Visualization'],
        link: 'https://github.com/olababsmichael/Exploratory-and-Insightful-Analysis-of-Hospital-Patient-Admissions'
    },
    {
        id: '3',
        title: 'Amazon Product Review Analysis',
        description: 'Structured review analysis with sentiment and category-based insights using NLP techniques.',
        image: 'github/Dashboard.jpg',
        tags: ['Excel'],
        link: 'https://github.com/olababsmichael/Amazon-Product-Review-Analysis'
    },
    {
        id: '4',
        title: 'Fitness Membership Churn & Revenue',
        description: 'Focused analysis uncovering churn drivers and revenue leakage across California gyms.',
        image: 'github/fitness.jpg',
        tags: ['Python', 'Power BI'],
        link: 'https://github.com/olababsmichael/Fitness-Membership-Churn-Revenue-Analysis-California-'
    },
    {
        id: '5',
        title: 'Global Sales Analytics',
        description: 'Comprehensive analysis of sales performance, focusing on revenue trends and manufacturer insights.',
        image: 'github/sales.jpg',
        tags: ['Power BI', 'DAX'],
        link: 'https://github.com/olababsmichael/Sales-Analytics-with-Power-BI'
    },
    {
        id: '6',
        title: 'Food Business Intelligence with Python',
        description: 'An end-to-end data analytics project where I cleaned, transformed, and analyzed a raw food delivery dataset using Python (Pandas).',
        image: 'python.png',
        tags: ['Python', 'EDA'],
        link: 'https://github.com/olababsmichael/Food-Business-Intelligence-with-Python'
    }
];

const SAMPLE_QUERIES = [
    "How would you reduce churn in a gym business?",
    "Explain your approach to cleaning messy sales data.",
    "What are the top KPIs for a healthcare dashboard?"
];

// --- Core Logic ---

document.addEventListener('DOMContentLoaded', () => {
    initDynamicElements();
    initNavigation();
    initAISection();
});

function initDynamicElements() {
    // Set Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Render Skills
    const skillsContainer = document.getElementById('skills-container');
    SKILLS.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 cursor-default';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // Render Projects
    const projectsGrid = document.getElementById('projects-grid');
    PROJECTS.forEach(project => {
        const card = document.createElement('div');
        card.className = 'group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2';
        card.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                    ${project.tags.map(tag => `<span class="bg-black/50 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="p-8">
                <h3 class="project-card-title text-xl font-bold mb-3 transition-colors">${project.title}</h3>
                <p class="text-gray-500 text-sm mb-6 line-clamp-2">${project.description}</p>
                <div class="flex items-center justify-between">
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-bold text-sm text-[#111827] hover:text-[#760263] transition-colors">
                        View Project
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navIcon = document.getElementById('nav-icon');

    navToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            navIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            mobileMenu.classList.add('hidden');
            navIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            navIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });
}

// --- AI Section Logic ---

// function initAISection() {
//     const aiForm = document.getElementById('ai-form');
//     const aiQuery = document.getElementById('ai-query');
//     const aiSubmitBtn = document.getElementById('ai-submit-btn');
//     const btnText = document.getElementById('btn-text');
//     const loadingSpinner = document.getElementById('loading-spinner');
//     const aiPlaceholder = document.getElementById('ai-placeholder');
//     const aiResult = document.getElementById('ai-result');
//     const sampleQueriesContainer = document.getElementById('sample-queries');

//     // Init sample queries
//     SAMPLE_QUERIES.forEach(query => {
//         const btn = document.createElement('button');
//         btn.type = 'button';
//         btn.className = 'bg-white border border-gray-200 hover:border-[#760263] hover:text-[#760263] hover:shadow-md px-6 py-3 rounded-2xl text-sm font-semibold text-gray-600 transition-all shadow-sm active:scale-95';
//         btn.textContent = query;
//         btn.onclick = () => {
//             aiQuery.value = query;
//             aiForm.dispatchEvent(new Event('submit'));
//         };
//         sampleQueriesContainer.appendChild(btn);
//     });

//     aiForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const query = aiQuery.value.trim();
//         if (!query) return;

//         // UI Loading State
//         aiSubmitBtn.disabled = true;
//         btnText.textContent = 'Analyzing...';
//         loadingSpinner.classList.remove('hidden');

//         const insight = await fetchAIInsight(query);
//         const structured = parseAIResponse(insight);
        
//         displayAIResult(structured);

//         // UI Reset
//         aiSubmitBtn.disabled = false;
//         btnText.textContent = 'Generate Insight';
//         loadingSpinner.classList.add('hidden');
//     });
// }

// async function fetchAIInsight(query) {
//     const SYSTEM_INSTRUCTION = `
//     You are the AI Digital Twin of Olaoluwa Babawale, a professional Data Analyst.
//     Your tone is professional, analytical, and business-focused.

//     FORMATTING RULES:
//     1. Do NOT use standard Markdown headers like # or ##.
//     2. Structure your response into exactly three sections:
//        [STRATEGY]: A high-level overview of the approach.
//        [EXECUTION]: A bulleted list of specific technical steps (SQL, Power BI, Python).
//        [IMPACT]: The expected business ROI or outcome.
//     3. Keep it concise and impactful.
//     4. Use professional language centered on churn reduction, revenue optimization, and data storytelling.
//     `;

//     try {
//         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
//         const response = await ai.models.generateContent({
//             model: 'gemini-3-flash-preview',
//             contents: `User Query: ${query}. Provide a data-driven insight as Olaoluwa.`,
//             config: {
//                 systemInstruction: SYSTEM_INSTRUCTION,
//                 temperature: 0.7,
//                 topP: 0.95,
//             },
//         });
//         return response.text || "I couldn't generate an insight at this moment. Please try again.";
//     } catch (error) {
//         console.error("Gemini Error:", error);
//         return "Error connecting to the AI brain. Ensure you have a valid API key.";
//     }
// }
async function initAISection() {
    const aiForm = document.getElementById('ai-form');
    const aiQuery = document.getElementById('ai-query');
    const aiSubmitBtn = document.getElementById('ai-submit-btn');
    const btnText = document.getElementById('btn-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const aiPlaceholder = document.getElementById('ai-placeholder');
    const aiResult = document.getElementById('ai-result');
    const sampleQueriesContainer = document.getElementById('sample-queries');

    // --- Load questions from JSON ---
    const response = await fetch('ai-questions.json');
    const questionsData = await response.json();

    // Populate dropdown
    questionsData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.question;
        option.textContent = item.question;
        aiQuery.appendChild(option);
    });

    aiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedQuestion = aiQuery.value;
        if (!selectedQuestion) return;

        const answerData = questionsData.find(q => q.question === selectedQuestion);
        if (!answerData) return;

        // Show results
        displayAIResult(answerData);
    });

    // Optional: populate sample queries buttons
    questionsData.slice(0, 3).forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bg-white border border-gray-200 hover:border-[#760263] hover:text-[#760263] hover:shadow-md px-6 py-3 rounded-2xl text-sm font-semibold text-gray-600 transition-all shadow-sm active:scale-95';
        btn.textContent = item.question;
        btn.onclick = () => {
            aiQuery.value = item.question;
            aiForm.dispatchEvent(new Event('submit'));
        };
        sampleQueriesContainer.appendChild(btn);
    });
}

// --- displayAIResult remains unchanged ---
// It will use answerData.strategy, answerData.execution, answerData.impact

function parseAIResponse(text) {
    const strategyMatch = text.match(/\[STRATEGY\]:?\s*([\s\S]*?)(?=\[EXECUTION\]|\[IMPACT\]|$)/i);
    const executionMatch = text.match(/\[EXECUTION\]:?\s*([\s\S]*?)(?=\[IMPACT\]|$)/i);
    const impactMatch = text.match(/\[IMPACT\]:?\s*([\s\S]*?)$/i);

    return {
        strategy: strategyMatch?.[1]?.trim() || "Strategy focus defined by specific business requirements.",
        execution: executionMatch?.[1]?.trim().split('\n').filter(line => line.trim()).map(line => line.replace(/^[*-]\s*/, '').trim()) || [],
        impact: impactMatch?.[1]?.trim() || "Measurable business growth and data-driven optimization."
    };
}

function displayAIResult(data) {
    const aiPlaceholder = document.getElementById('ai-placeholder');
    const aiResult = document.getElementById('ai-result');

    aiPlaceholder.classList.add('hidden');
    aiResult.classList.remove('hidden');

    aiResult.innerHTML = `
        <!-- Strategy Card -->
        <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-[#760263]/10 text-[#760263] rounded-2xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h4 class="text-xl font-bold mb-4 text-[#111827]">Core Strategy</h4>
            <p class="text-gray-600 leading-relaxed">${data.strategy}</p>
        </div>

        <!-- Execution Card -->
        <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-[#1C5E9E]/10 text-[#1C5E9E] rounded-2xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h4 class="text-xl font-bold mb-4 text-[#111827]">Execution Plan</h4>
            <ul class="space-y-3">
                ${data.execution.map(step => `
                    <li class="flex items-start gap-3 text-gray-600 text-sm">
                        <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1C5E9E] shrink-0"></span>
                        ${step}
                    </li>
                `).join('')}
            </ul>
        </div>

        <!-- Impact Card -->
        <div class="bg-[#760263] p-8 rounded-3xl shadow-xl transform lg:scale-105">
            <div class="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <h4 class="text-xl font-bold mb-4 text-white">Expected Impact</h4>
            <p class="text-pink-50 leading-relaxed font-medium">${data.impact}</p>
            <div class="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white text-[#760263] flex items-center justify-center font-bold text-xs border border-white/20">OB</div>
                <span class="text-white/80 text-xs font-semibold">Verified by Olaoluwa AI</span>
            </div>
        </div>
    `;
}


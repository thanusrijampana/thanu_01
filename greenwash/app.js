/**
 * GreenWash Finder - Main Application Controller
 * Handles state, database filtering, calculator algorithms, comparison engine, chart rendering,
 * and the E-Commerce Jargon Decoder with 1-5 Star Sustainability Ratings.
 */

document.addEventListener('DOMContentLoaded', () => {
    // State Management
    const state = {
        brands: [...GREENWASH_DATA.brands],
        tactics: [...GREENWASH_DATA.tactics],
        reports: [...GREENWASH_DATA.communityReports],
        ecomSamples: [...GREENWASH_DATA.sampleEcommerceProducts],
        activeTab: 'database',
        currentFilter: {
            industry: 'All Industries',
            riskTier: 'All Tiers',
            searchQuery: '',
            sortBy: 'riskScoreDesc'
        },
        comparison: {
            brand1Id: 'aura-style',
            brand2Id: 'ecoclean-detergent'
        },
        currentQuizIndex: 0,
        selectedEcomId: 'ecom-1'
    };

    // Initialize App Components
    initTheme();
    initNavigation();
    initHeroStats();
    initQuickSearch();
    initDatabaseFilters();
    renderBrandsGrid();
    initCalculator();
    renderTacticsGrid();
    initQuiz();
    initComparisonTool();
    renderCommunityReports();
    renderCharts();
    initModals();
    initSubmissionForm();
    initEcommerceVerifier();

    /* ==========================================================================
       1. Theme Toggle Management
       ========================================================================== */
    function initTheme() {
        const themeBtn = document.getElementById('themeToggleBtn');
        const savedTheme = localStorage.getItem('gw_theme') || 'dark';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeBtn?.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('gw_theme', next);
            updateThemeIcon(next);
            showToast(`Switched to ${next} theme`, 'info');
        });
    }

    function updateThemeIcon(theme) {
        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) {
            themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
        }
    }

    /* ==========================================================================
       2. Navigation & Section Tabs
       ========================================================================== */
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .tab-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetTab = link.getAttribute('data-tab');
                if (targetTab) {
                    e.preventDefault();
                    switchTab(targetTab);
                }
            });
        });
    }

    function switchTab(tabId) {
        state.activeTab = tabId;

        // Update active tab buttons & nav links
        document.querySelectorAll('.tab-btn, .nav-link').forEach(el => {
            if (el.getAttribute('data-tab') === tabId) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Switch view sections
        document.querySelectorAll('.view-section').forEach(section => {
            if (section.id === `${tabId}-section`) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Smooth scroll to top of content area
        const contentAnchor = document.getElementById('main-content');
        if (contentAnchor) {
            contentAnchor.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /* ==========================================================================
       3. E-Commerce Product Verifier & Jargon Decoder
       ========================================================================== */
    function initEcommerceVerifier() {
        const presetsContainer = document.getElementById('ecomPresetsContainer');
        const customInput = document.getElementById('ecomTextInput');
        const verifyBtn = document.getElementById('verifyEcomBtn');

        if (!presetsContainer) return;

        // Render preset pills
        presetsContainer.innerHTML = state.ecomSamples.map(sample => `
            <button class="preset-pill ${sample.id === state.selectedEcomId ? 'active' : ''}" data-id="${sample.id}">
                ${sample.productTitle.split(' ')[0]} (${sample.store.split('/')[0]})
            </button>
        `).join('');

        presetsContainer.querySelectorAll('.preset-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const sampleId = pill.getAttribute('data-id');
                state.selectedEcomId = sampleId;
                
                presetsContainer.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const sample = state.ecomSamples.find(s => s.id === sampleId);
                if (sample && customInput) {
                    customInput.value = sample.rawMarketingText;
                }
                renderEcommerceAnalysis(sample);
            });
        });

        verifyBtn?.addEventListener('click', () => {
            const text = customInput?.value.trim();
            if (!text) {
                showToast('Please paste a product URL or marketing text first', 'info');
                return;
            }
            analyzeCustomText(text);
        });

        // Initial render with first sample
        const initialSample = state.ecomSamples.find(s => s.id === state.selectedEcomId);
        if (initialSample) {
            if (customInput) customInput.value = initialSample.rawMarketingText;
            renderEcommerceAnalysis(initialSample);
        }
    }

    function renderStarRatingHtml(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let starsHtml = '';

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHtml += `<span class="star-icon star-filled">★</span>`;
            } else if (i === fullStars + 1 && halfStar) {
                starsHtml += `<span class="star-icon star-filled">★</span>`;
            } else {
                starsHtml += `<span class="star-icon star-empty">☆</span>`;
            }
        }
        return starsHtml;
    }

    function renderEcommerceAnalysis(productData) {
        const container = document.getElementById('ecomResultsContainer');
        if (!container) return;

        const starsHtml = renderStarRatingHtml(productData.rating);

        container.innerHTML = `
            <div class="rating-header-box">
                <div style="font-size:0.85rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em; font-weight:700;">
                    ${productData.store} Verification Result
                </div>
                <h3 style="font-size:1.3rem; margin:0.4rem 0;">${productData.productTitle}</h3>
                
                <div style="margin: 0.75rem 0;">
                    <div class="star-rating star-rating-lg">${starsHtml}</div>
                    <div class="rating-badge-title" style="color: ${productData.rating >= 4 ? 'var(--risk-low)' : productData.rating >= 3 ? 'var(--risk-medium)' : 'var(--risk-high)'};">
                        ${productData.ratingLabel}
                    </div>
                </div>
            </div>

            <!-- Jargon Decoder Callout -->
            <div style="margin-bottom:1.5rem;">
                <h4 style="font-size:1.05rem; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.4rem;">
                    🗣️ Corporate Jargon → Plain English Translator
                </h4>
                <div class="jargon-card-wrap">
                    ${productData.jargonTranslations.map(j => `
                        <div class="jargon-card">
                            <div class="jargon-original">⚠️ "${j.term}"</div>
                            <div class="jargon-translated">👉 <strong>Plain English:</strong> ${j.plainEnglish}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Bulleted Reasons Breakdown -->
            <div style="margin-bottom:1.5rem;">
                <h4 style="font-size:1.05rem; margin-bottom:0.75rem;">📋 Why This Rating? (Detailed Reasons):</h4>
                <ul class="reasons-list">
                    ${productData.bulletReasons.map(reason => `
                        <li class="reason-item">${reason}</li>
                    `).join('')}
                </ul>
            </div>

            <!-- Recommended Alternative -->
            <div style="background:var(--bg-card-hover); border-left:4px solid var(--accent-emerald); padding:1rem 1.25rem; border-radius:var(--radius-sm); margin-bottom:1.5rem;">
                <strong style="color:var(--accent-emerald); font-size:0.85rem; text-transform:uppercase;">💡 Better / Truly Sustainable Alternative:</strong>
                <p style="margin-top:0.3rem; font-size:0.95rem;">${productData.alternative}</p>
            </div>

            <!-- Simulated E-Commerce Browser Overlay Preview Widget -->
            <div class="extension-preview-widget">
                <div class="extension-preview-header">
                    <span style="font-weight:700; font-size:0.85rem; color:var(--accent-emerald);">
                        🧩 GreenWash Finder Extension Overlay (Shopping View)
                    </span>
                    <span style="font-size:0.75rem; color:var(--text-muted);">Active on E-Commerce Page</span>
                </div>
                <div style="display:flex; align-items:center; justify-space-between;">
                    <div>
                        <div style="font-weight:700; font-size:0.95rem;">Verified Rating: ${productData.rating} / 5.0</div>
                        <div style="font-size:0.8rem; color:var(--text-secondary);">Decoded 3 marketing buzzwords into plain English.</div>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="alert('GreenWash Finder browser extension overlay active!')">View Extension Breakdown</button>
                </div>
            </div>
        `;
    }

    function analyzeCustomText(text) {
        // Dynamic scan of custom input text
        const lower = text.toLowerCase();
        let rating = 3.0;
        let jargonMatches = [];
        let reasons = [];

        // Check matching jargon from dictionary
        GREENWASH_DATA.jargonDictionary.forEach(j => {
            if (lower.includes(j.buzzword.toLowerCase()) || lower.includes("natural") || lower.includes("eco")) {
                jargonMatches.push({
                    term: j.buzzword,
                    plainEnglish: j.meaning
                });
            }
        });

        if (lower.includes("100%") || lower.includes("chemical-free") || lower.includes("natural")) {
            rating -= 1.5;
            reasons.push("❌ Uses vague undefined terms ('natural', 'chemical-free') without regulatory proof.");
        }
        if (lower.includes("organic") && !lower.includes("certified")) {
            rating -= 1.0;
            reasons.push("❌ Mentions organic blend without third-party GOTS or USDA certification.");
        }
        if (lower.includes("certified") || lower.includes("b-corp") || lower.includes("usda")) {
            rating += 2.0;
            reasons.push("✅ Product references verified 3rd-party environmental audit.");
        }

        rating = Math.max(1.0, Math.min(5.0, rating));

        if (jargonMatches.length === 0) {
            jargonMatches.push({
                term: "Eco-Friendly Claim",
                plainEnglish: "Uses general green marketing language without clear scientific backing."
            });
        }
        if (reasons.length === 0) {
            reasons.push("⚠️ Claim lacks transparent life-cycle assessment data.");
        }

        const customResult = {
            id: "custom",
            store: "User Pasted Product",
            productTitle: "Custom E-Commerce Product Analysis",
            rating: rating,
            ratingLabel: `${renderStarRatingHtml(rating)} ${rating.toFixed(1)} / 5 - ${rating >= 4 ? 'Genuine Eco Choice' : rating >= 3 ? 'Moderate Caution' : 'Misleading Greenwash'}`,
            price: "N/A",
            rawMarketingText: text,
            jargonTranslations: jargonMatches,
            bulletReasons: reasons,
            alternative: "Look for USDA Organic, Fair Trade Certified, or FSC Recycled labeled products."
        };

        renderEcommerceAnalysis(customResult);
        showToast('E-Commerce Product Analyzed & Decoded!', 'success');
    }

    /* ==========================================================================
       4. Hero Stats Counter Animation
       ========================================================================== */
    function initHeroStats() {
        const stats = GREENWASH_DATA.stats;
        animateCounter('stat-brands', stats.auditedBrands);
        animateCounter('stat-claims', stats.flaggedClaims);
        animateCounter('stat-products', stats.verifiedEcoProducts);
        animateCounter('stat-reports', stats.communityReports);
    }

    function animateCounter(elementId, targetValue) {
        const el = document.getElementById(elementId);
        if (!el) return;
        let start = 0;
        const duration = 1200;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = targetValue / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
                el.textContent = Math.round(targetValue).toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.round(start).toLocaleString();
            }
        }, stepTime);
    }

    /* ==========================================================================
       5. Quick Search Autocomplete Bar
       ========================================================================== */
    function initQuickSearch() {
        const searchInput = document.getElementById('quickSearchInput');
        const dropdown = document.getElementById('searchResultsDropdown');

        if (!searchInput || !dropdown) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                dropdown.classList.remove('active');
                return;
            }

            const matches = state.brands.filter(b => 
                b.name.toLowerCase().includes(query) ||
                b.productName.toLowerCase().includes(query) ||
                b.featuredClaim.toLowerCase().includes(query) ||
                b.industry.toLowerCase().includes(query)
            );

            renderQuickSearchResults(matches, dropdown);
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    function renderQuickSearchResults(results, dropdown) {
        if (results.length === 0) {
            dropdown.innerHTML = `<div class="search-item"><span class="search-item-sub">No audited brands or claims matching query</span></div>`;
            dropdown.classList.add('active');
            return;
        }

        dropdown.innerHTML = results.map(b => `
            <div class="search-item" data-brand-id="${b.id}">
                <div class="search-item-info">
                    <span style="font-size:1.3rem;">${b.logo}</span>
                    <div>
                        <div class="search-item-title">${b.name}</div>
                        <div class="search-item-sub">${b.productName} • ${b.industry}</div>
                    </div>
                </div>
                <span class="risk-badge ${getRiskClass(b.riskScore)}">${b.riskScore}% Risk</span>
            </div>
        `).join('');

        dropdown.classList.add('active');

        dropdown.querySelectorAll('.search-item').forEach(item => {
            item.addEventListener('click', () => {
                const brandId = item.getAttribute('data-brand-id');
                dropdown.classList.remove('active');
                openAuditModal(brandId);
            });
        });
    }

    /* ==========================================================================
       6. Brand Database Filtering & Grid Rendering
       ========================================================================== */
    function initDatabaseFilters() {
        const industrySelect = document.getElementById('filterIndustry');
        const riskSelect = document.getElementById('filterRisk');
        const sortSelect = document.getElementById('sortBrands');
        const searchInput = document.getElementById('dbSearchInput');

        if (industrySelect) {
            industrySelect.innerHTML = GREENWASH_DATA.industries.map(ind => 
                `<option value="${ind}">${ind}</option>`
            ).join('');
        }

        industrySelect?.addEventListener('change', (e) => {
            state.currentFilter.industry = e.target.value;
            renderBrandsGrid();
        });

        riskSelect?.addEventListener('change', (e) => {
            state.currentFilter.riskTier = e.target.value;
            renderBrandsGrid();
        });

        sortSelect?.addEventListener('change', (e) => {
            state.currentFilter.sortBy = e.target.value;
            renderBrandsGrid();
        });

        searchInput?.addEventListener('input', (e) => {
            state.currentFilter.searchQuery = e.target.value.toLowerCase().trim();
            renderBrandsGrid();
        });
    }

    function getFilteredBrands() {
        return state.brands.filter(brand => {
            const matchesIndustry = state.currentFilter.industry === 'All Industries' || brand.industry === state.currentFilter.industry;
            const matchesRisk = state.currentFilter.riskTier === 'All Tiers' || brand.riskTier === state.currentFilter.riskTier;
            const matchesSearch = !state.currentFilter.searchQuery || 
                brand.name.toLowerCase().includes(state.currentFilter.searchQuery) ||
                brand.productName.toLowerCase().includes(state.currentFilter.searchQuery) ||
                brand.featuredClaim.toLowerCase().includes(state.currentFilter.searchQuery);

            return matchesIndustry && matchesRisk && matchesSearch;
        }).sort((a, b) => {
            if (state.currentFilter.sortBy === 'riskScoreDesc') return b.riskScore - a.riskScore;
            if (state.currentFilter.sortBy === 'riskScoreAsc') return a.riskScore - b.riskScore;
            if (state.currentFilter.sortBy === 'nameAsc') return a.name.localeCompare(b.name);
            return 0;
        });
    }

    function renderBrandsGrid() {
        const grid = document.getElementById('brandsGrid');
        const countBadge = document.getElementById('dbCountBadge');
        if (!grid) return;

        const filtered = getFilteredBrands();
        if (countBadge) countBadge.textContent = `${filtered.length} Brands Found`;

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg);">
                    <div style="font-size:3rem; margin-bottom:1rem;">🍃</div>
                    <h3>No Brands Match Your Filters</h3>
                    <p style="color: var(--text-secondary); margin-top:0.5rem;">Try adjusting your industry category or search terms.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(brand => `
            <div class="brand-card" data-risk="${brand.riskTier}">
                <div>
                    <div class="card-header">
                        <div class="brand-identity">
                            <div class="brand-logo-badge">${brand.logo}</div>
                            <div>
                                <div class="brand-name">${brand.name}</div>
                                <div class="brand-industry">${brand.industry}</div>
                            </div>
                        </div>
                        <span class="risk-badge ${getRiskClass(brand.riskScore)}">${brand.riskTier}</span>
                    </div>
                    <div class="card-body">
                        <div class="product-title">${brand.productName}</div>
                        <div class="claim-quote">"${brand.featuredClaim}"</div>
                        <div class="tactic-tag">⚠️ ${brand.primaryTactic}</div>
                        <div class="score-row">
                            <span class="score-label">Greenwash Risk Index</span>
                            <span class="score-val ${getRiskClass(brand.riskScore)}">${brand.riskScore}%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill ${getRiskClass(brand.riskScore)}" style="width: ${brand.riskScore}%;"></div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="vote-count">👥 ${brand.detailedAudit.userVotes.greenwash.toLocaleString()} Votes Flagged</span>
                    <button class="btn btn-secondary btn-sm inspect-btn" data-brand-id="${brand.id}">Inspect Audit 🔍</button>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.inspect-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const brandId = btn.getAttribute('data-brand-id');
                openAuditModal(brandId);
            });
        });
    }

    function getRiskClass(score) {
        if (score >= 70) return 'high';
        if (score >= 45) return 'medium';
        return 'low';
    }

    /* ==========================================================================
       7. Interactive Greenwash Scanner & Calculator Algorithm
       ========================================================================== */
    function initCalculator() {
        const calcForm = document.getElementById('scannerForm');
        if (!calcForm) return;

        calcForm.addEventListener('change', calculateRiskScore);
        calcForm.addEventListener('input', calculateRiskScore);

        calculateRiskScore();
    }

    function calculateRiskScore() {
        let score = 20;

        const noProof = document.getElementById('calcNoProof')?.checked;
        const vagueWords = document.getElementById('calcVagueWords')?.checked;
        const fakeSeal = document.getElementById('calcFakeSeal')?.checked;
        const futurePromise = document.getElementById('calcFuturePromise')?.checked;
        const verified3rdParty = document.getElementById('calcVerified3rdParty')?.checked;
        const fullLCA = document.getElementById('calcFullLCA')?.checked;

        if (noProof) score += 25;
        if (vagueWords) score += 20;
        if (fakeSeal) score += 30;
        if (futurePromise) score += 15;

        if (verified3rdParty) score -= 35;
        if (fullLCA) score -= 25;

        score = Math.max(5, Math.min(99, score));
        updateGaugeDisplay(score);
    }

    function updateGaugeDisplay(score) {
        const gaugeFill = document.getElementById('gaugeFill');
        const scoreText = document.getElementById('calcScoreValue');
        const verdictText = document.getElementById('calcVerdict');
        const descText = document.getElementById('calcDesc');

        if (!gaugeFill || !scoreText) return;

        const circumference = 440;
        const offset = circumference - (score / 100) * circumference;
        gaugeFill.style.strokeDashoffset = offset;

        scoreText.textContent = `${score}%`;

        let color = '#10b981';
        let verdict = 'Low Risk / Likely Genuine';
        let desc = 'This claim shows strong signs of third-party verification, clear scope, and transparent metrics.';

        if (score >= 75) {
            color = '#f43f5e';
            verdict = 'Critical Greenwash Risk';
            desc = 'High probability of deceptive marketing! Contains unverified buzzwords, lack of proof, or misleading seals.';
        } else if (score >= 45) {
            color = '#fbbf24';
            verdict = 'Moderate Suspicion';
            desc = 'Exercise caution. The claim contains vague eco-buzzwords or partial trade-offs requiring independent verification.';
        }

        gaugeFill.style.stroke = color;
        scoreText.style.color = color;
        if (verdictText) {
            verdictText.textContent = verdict;
            verdictText.style.color = color;
        }
        if (descText) descText.textContent = desc;
    }

    /* ==========================================================================
       8. Tactics Glossary & Interactive Spot-the-Greenwash Quiz
       ========================================================================== */
    function renderTacticsGrid() {
        const grid = document.getElementById('tacticsGrid');
        if (!grid) return;

        grid.innerHTML = GREENWASH_DATA.tactics.map(t => `
            <div class="tactic-card" data-tactic-id="${t.id}">
                <div class="tactic-icon">${t.icon}</div>
                <div class="tactic-title">${t.title}</div>
                <div class="tactic-sub">${t.subtitle}</div>
                <button class="btn btn-outline btn-sm">Learn Tactic & Examples →</button>
            </div>
        `).join('');

        grid.querySelectorAll('.tactic-card').forEach(card => {
            card.addEventListener('click', () => {
                const tacticId = card.getAttribute('data-tactic-id');
                openTacticModal(tacticId);
            });
        });
    }

    function initQuiz() {
        renderQuizQuestion(state.currentQuizIndex);

        document.getElementById('nextQuizBtn')?.addEventListener('click', () => {
            state.currentQuizIndex = (state.currentQuizIndex + 1) % GREENWASH_DATA.quizQuestions.length;
            renderQuizQuestion(state.currentQuizIndex);
        });
    }

    function renderQuizQuestion(index) {
        const q = GREENWASH_DATA.quizQuestions[index];
        const scenarioEl = document.getElementById('quizScenario');
        const optionsEl = document.getElementById('quizOptions');
        const feedbackEl = document.getElementById('quizFeedback');
        const nextBtn = document.getElementById('nextQuizBtn');

        if (!scenarioEl || !optionsEl) return;

        scenarioEl.textContent = `Scenario ${index + 1}: ${q.scenario}`;
        feedbackEl.classList.remove('active');
        if (nextBtn) nextBtn.style.display = 'none';

        optionsEl.innerHTML = q.options.map((opt, idx) => `
            <button class="quiz-option-btn" data-idx="${idx}">${opt}</button>
        `).join('');

        optionsEl.querySelectorAll('.quiz-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedIdx = parseInt(btn.getAttribute('data-idx'));
                const isCorrect = selectedIdx === q.correctIndex;

                optionsEl.querySelectorAll('.quiz-option-btn').forEach((b, idx) => {
                    b.disabled = true;
                    if (idx === q.correctIndex) b.classList.add('correct');
                    else if (idx === selectedIdx) b.classList.add('incorrect');
                });

                feedbackEl.className = `quiz-feedback active ${isCorrect ? 'correct' : 'incorrect'}`;
                feedbackEl.innerHTML = `
                    <strong>${isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect'}</strong>
                    <p style="margin-top:0.4rem; color: var(--text-primary);">${q.explanation}</p>
                `;

                if (nextBtn) nextBtn.style.display = 'inline-flex';
            });
        });
    }

    /* ==========================================================================
       9. Side-by-Side Brand Comparison Engine
       ========================================================================== */
    function initComparisonTool() {
        const select1 = document.getElementById('compareBrand1');
        const select2 = document.getElementById('compareBrand2');

        if (!select1 || !select2) return;

        const optionsHtml = state.brands.map(b => `<option value="${b.id}">${b.name} (${b.industry})</option>`).join('');
        select1.innerHTML = optionsHtml;
        select2.innerHTML = optionsHtml;

        select1.value = state.comparison.brand1Id;
        select2.value = state.comparison.brand2Id;

        select1.addEventListener('change', (e) => {
            state.comparison.brand1Id = e.target.value;
            renderComparisonTable();
        });

        select2.addEventListener('change', (e) => {
            state.comparison.brand2Id = e.target.value;
            renderComparisonTable();
        });

        renderComparisonTable();
    }

    function renderComparisonTable() {
        const b1 = state.brands.find(b => b.id === state.comparison.brand1Id);
        const b2 = state.brands.find(b => b.id === state.comparison.brand2Id);
        const container = document.getElementById('comparisonTableContainer');

        if (!b1 || !b2 || !container) return;

        container.innerHTML = `
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Metric / Feature</th>
                        <th>${b1.name} (${b1.logo})</th>
                        <th>${b2.name} (${b2.logo})</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Product Line</strong></td>
                        <td>${b1.productName}</td>
                        <td>${b2.productName}</td>
                    </tr>
                    <tr>
                        <td><strong>Greenwash Risk Score</strong></td>
                        <td><span class="risk-badge ${getRiskClass(b1.riskScore)}">${b1.riskScore}% (${b1.riskTier})</span></td>
                        <td><span class="risk-badge ${getRiskClass(b2.riskScore)}">${b2.riskScore}% (${b2.riskTier})</span></td>
                    </tr>
                    <tr>
                        <td><strong>Primary Deceptive Tactic</strong></td>
                        <td>${b1.primaryTactic}</td>
                        <td>${b2.primaryTactic}</td>
                    </tr>
                    <tr>
                        <td><strong>Recycled Material Content</strong></td>
                        <td>${b1.detailedAudit.recycledContentPercent}%</td>
                        <td>${b2.detailedAudit.recycledContentPercent}%</td>
                    </tr>
                    <tr>
                        <td><strong>Carbon Footprint Disclosed?</strong></td>
                        <td>${b1.detailedAudit.carbonFootprintDisclosed ? '✅ Yes (Published)' : '❌ No Disclosure'}</td>
                        <td>${b2.detailedAudit.carbonFootprintDisclosed ? '✅ Yes (Published)' : '❌ No Disclosure'}</td>
                    </tr>
                    <tr>
                        <td><strong>Verified 3rd Party Certifications</strong></td>
                        <td>${b1.detailedAudit.certifications.verified.length ? b1.detailedAudit.certifications.verified.join(', ') : 'None'}</td>
                        <td>${b2.detailedAudit.certifications.verified.length ? b2.detailedAudit.certifications.verified.join(', ') : 'None'}</td>
                    </tr>
                    <tr>
                        <td><strong>Regulatory Notices</strong></td>
                        <td>${b1.detailedAudit.regulatoryNotes}</td>
                        <td>${b2.detailedAudit.regulatoryNotes}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    /* ==========================================================================
       10. Community Claims Feed & Voting Logic
       ========================================================================== */
    function renderCommunityReports() {
        const feed = document.getElementById('reportsFeed');
        if (!feed) return;

        feed.innerHTML = state.reports.map(r => `
            <div class="report-item">
                <div style="display:flex; align-items:flex-start; gap:1.25rem;">
                    <div class="vote-actions">
                        <button class="vote-btn upvote-btn" data-rep-id="${r.id}">▲</button>
                        <span style="font-weight:700; font-size:0.9rem;" id="vote-count-${r.id}">${r.upvotes}</span>
                        <button class="vote-btn downvote-btn" data-rep-id="${r.id}">▼</button>
                    </div>
                    <div>
                        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.4rem;">
                            <h4 style="font-size:1.1rem;">${r.brandName} - ${r.product}</h4>
                            <span class="risk-badge ${r.status === 'Verified Greenwash' ? 'high' : 'medium'}">${r.status}</span>
                        </div>
                        <div class="claim-quote">"${r.claim}"</div>
                        <p style="font-size:0.85rem; color: var(--text-secondary); margin-bottom:0.5rem;">
                            <strong>Evidence:</strong> ${r.evidenceNote}
                        </p>
                        <div style="font-size:0.75rem; color: var(--text-muted);">
                            Reported by @${r.reporter} on ${r.date} • Tag: <span class="text-emerald">${r.tacticTag}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        feed.querySelectorAll('.upvote-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const repId = btn.getAttribute('data-rep-id');
                const rep = state.reports.find(r => r.id === repId);
                if (rep) {
                    rep.upvotes += 1;
                    const countEl = document.getElementById(`vote-count-${repId}`);
                    if (countEl) countEl.textContent = rep.upvotes;
                    showToast('Upvote recorded! Thank you for community auditing.', 'success');
                }
            });
        });
    }

    /* ==========================================================================
       11. SVG Charts Rendering Dashboard
       ========================================================================== */
    function renderCharts() {
        renderIndustryChart();
        renderBuzzwordsChart();
    }

    function renderIndustryChart() {
        const container = document.getElementById('industryChartContainer');
        if (!container) return;

        const data = GREENWASH_DATA.chartData.industryPrevalence;
        const maxScore = 100;

        const svgHtml = `
            <svg viewBox="0 0 500 240" style="width:100%; height:100%;">
                ${data.map((item, idx) => {
                    const barWidth = (item.score / maxScore) * 320;
                    const yPos = idx * 32 + 10;
                    const color = item.score > 75 ? '#f43f5e' : item.score > 60 ? '#fbbf24' : '#10b981';
                    return `
                        <text x="0" y="${yPos + 16}" fill="var(--text-secondary)" font-size="11" font-weight="600">${item.industry}</text>
                        <rect x="130" y="${yPos}" width="320" height="20" rx="4" fill="var(--bg-secondary)" />
                        <rect x="130" y="${yPos}" width="${barWidth}" height="20" rx="4" fill="${color}" />
                        <text x="${140 + barWidth}" y="${yPos + 15}" fill="var(--text-primary)" font-size="11" font-weight="700">${item.score}%</text>
                    `;
                }).join('')}
            </svg>
        `;

        container.innerHTML = svgHtml;
    }

    function renderBuzzwordsChart() {
        const container = document.getElementById('buzzwordsChartContainer');
        if (!container) return;

        const data = GREENWASH_DATA.chartData.topBuzzwords;
        const maxCount = 500;

        const svgHtml = `
            <svg viewBox="0 0 500 240" style="width:100%; height:100%;">
                ${data.map((item, idx) => {
                    const barWidth = (item.count / maxCount) * 300;
                    const yPos = idx * 28 + 10;
                    return `
                        <text x="0" y="${yPos + 14}" fill="var(--text-secondary)" font-size="11" font-weight="600">${item.word}</text>
                        <rect x="140" y="${yPos}" width="300" height="16" rx="4" fill="var(--bg-secondary)" />
                        <rect x="140" y="${yPos}" width="${barWidth}" height="16" rx="4" fill="url(#emeraldGradient)" />
                        <text x="${150 + barWidth}" y="${yPos + 13}" fill="var(--accent-emerald)" font-size="10" font-weight="700">${item.count}</text>
                    `;
                }).join('')}
                <defs>
                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#10b981" />
                        <stop offset="100%" stop-color="#a3e635" />
                    </linearGradient>
                </defs>
            </svg>
        `;

        container.innerHTML = svgHtml;
    }

    /* ==========================================================================
       12. Modals System (Audit Breakdown & Tactics Detail)
       ========================================================================== */
    function initModals() {
        document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close-btn')) {
                    closeAllModals();
                }
            });
        });
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }

    function openAuditModal(brandId) {
        const brand = state.brands.find(b => b.id === brandId);
        const modal = document.getElementById('auditModal');
        const body = document.getElementById('auditModalBody');

        if (!brand || !modal || !body) return;

        body.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem;">
                <div style="display:flex; align-items:center; gap:1rem;">
                    <span style="font-size:2.5rem;">${brand.logo}</span>
                    <div>
                        <h2 style="font-size:1.6rem;">${brand.name}</h2>
                        <span style="color:var(--text-secondary); font-size:0.9rem;">${brand.productName} • ${brand.industry}</span>
                    </div>
                </div>
                <span class="risk-badge ${getRiskClass(brand.riskScore)}" style="font-size:0.9rem; padding:0.5rem 1rem;">
                    ${brand.riskScore}% Risk Tier
                </span>
            </div>

            <div style="background:var(--bg-secondary); padding:1.25rem; border-radius:var(--radius-md); margin-bottom:1.5rem; border-left:4px solid var(--accent-emerald);">
                <strong style="color:var(--text-secondary); font-size:0.85rem; text-transform:uppercase;">Flagged Marketing Claim:</strong>
                <p style="font-size:1.05rem; font-style:italic; margin-top:0.3rem;">"${brand.featuredClaim}"</p>
            </div>

            <h3 style="font-size:1.15rem; margin-bottom:0.75rem;">⚖️ Environmental Audit & Reality</h3>
            <p style="font-size:0.95rem; color:var(--text-primary); margin-bottom:1.5rem; line-height:1.6;">${brand.detailedAudit.reality}</p>

            <h3 style="font-size:1.15rem; margin-bottom:0.75rem;">🔬 Evidence & Investigation Findings</h3>
            <p style="font-size:0.95rem; color:var(--text-secondary); margin-bottom:1.5rem; background:var(--bg-input); padding:1rem; border-radius:var(--radius-sm);">${brand.detailedAudit.evidenceSummary}</p>

            <h3 style="font-size:1.15rem; margin-bottom:0.75rem;">🚨 Flagged Red Flags</h3>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem;">
                ${brand.detailedAudit.redFlags.map(rf => `
                    <li style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; color:var(--risk-high);">
                        ❌ ${rf}
                    </li>
                `).join('')}
            </ul>

            <h3 style="font-size:1.15rem; margin-bottom:0.75rem;">🏛️ Regulatory Directives & Notices</h3>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.5rem;">${brand.detailedAudit.regulatoryNotes}</p>
        `;

        modal.classList.add('active');
    }

    function openTacticModal(tacticId) {
        const tactic = state.tactics.find(t => t.id === tacticId);
        const modal = document.getElementById('auditModal');
        const body = document.getElementById('auditModalBody');

        if (!tactic || !modal || !body) return;

        body.innerHTML = `
            <div style="text-align:center; margin-bottom:1.5rem;">
                <div style="font-size:3.5rem; margin-bottom:0.5rem;">${tactic.icon}</div>
                <h2 style="font-size:1.8rem;">${tactic.title}</h2>
                <p style="color:var(--accent-emerald); font-weight:600;">${tactic.subtitle}</p>
            </div>
            <p style="font-size:1rem; color:var(--text-primary); margin-bottom:1.5rem; line-height:1.6;">${tactic.description}</p>

            <div style="background:var(--bg-secondary); padding:1.25rem; border-radius:var(--radius-md); margin-bottom:1.5rem;">
                <strong style="color:var(--text-secondary); font-size:0.85rem; text-transform:uppercase;">Real-World Example:</strong>
                <p style="margin-top:0.4rem; font-size:0.95rem;">${tactic.example}</p>
            </div>

            <h3 style="font-size:1.1rem; margin-bottom:0.75rem;">🚩 Buzzwords to Watch For:</h3>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                ${tactic.redFlagWords.map(word => `
                    <span style="background:var(--risk-high-bg); color:var(--risk-high); padding:0.35rem 0.75rem; border-radius:var(--radius-full); font-size:0.85rem; font-weight:600;">${word}</span>
                `).join('')}
            </div>
        `;

        modal.classList.add('active');
    }

    /* ==========================================================================
       13. Community Claim Submission Modal & Form
       ========================================================================== */
    function initSubmissionForm() {
        const reportBtn = document.getElementById('openSubmitReportBtn');
        const modal = document.getElementById('submitModal');
        const form = document.getElementById('claimSubmissionForm');

        reportBtn?.addEventListener('click', () => {
            modal?.classList.add('active');
        });

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const brand = document.getElementById('subBrandName').value;
            const product = document.getElementById('subProductName').value;
            const claim = document.getElementById('subClaimText').value;
            const evidence = document.getElementById('subEvidence').value;

            const newReport = {
                id: `rep-${Date.now()}`,
                brandName: brand,
                product: product,
                claim: claim,
                reporter: 'You (Auditor)',
                date: new Date().toISOString().split('T')[0],
                upvotes: 1,
                downvotes: 0,
                status: 'Under Review',
                evidenceNote: evidence,
                tacticTag: 'User Submitted'
            };

            state.reports.unshift(newReport);
            renderCommunityReports();
            modal?.classList.remove('active');
            form.reset();
            showToast('Claim report submitted successfully to community queue!', 'success');
        });
    }

    /* ==========================================================================
       14. Toast Notification Helper
       ========================================================================== */
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span>${type === 'success' ? '✅' : 'ℹ️'}</span>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
});

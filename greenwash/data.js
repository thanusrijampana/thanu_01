/**
 * GreenWash Finder - Core Data Store
 * Comprehensive dataset containing audited brands, tactics glossary, quiz questions, community reports,
 * and the E-Commerce Jargon Decoder dictionary.
 */

const GREENWASH_DATA = {
    stats: {
        auditedBrands: 342,
        flaggedClaims: 1289,
        verifiedEcoProducts: 87,
        communityReports: 2150
    },

    industries: [
        "All Industries",
        "Fashion & Apparel",
        "Food & Beverage",
        "Cosmetics & Personal Care",
        "Automotive",
        "Energy & Oil",
        "Tech & Electronics",
        "Household & Cleaning"
    ],

    /* E-Commerce Jargon Decoder Dictionary */
    jargonDictionary: [
        {
            buzzword: "100% Bio-Derived Active Complex",
            meaning: "Contains 99% tap water and petroleum synthetics, with under 0.5% plant extract added solely for marketing purposes."
        },
        {
            buzzword: "Ocean-Bound Plastic Packaging",
            meaning: "Standard cheap virgin plastic collected within 50km of a coastline; it does not mean plastic fished out of the sea."
        },
        {
            buzzword: "Carbon Neutral via Verified Offsets",
            meaning: "The company continues polluting at full capacity and paid cheap credits to unverified tree-planting projects far away."
        },
        {
            buzzword: "Chemical-Free Formula",
            meaning: "Scientific nonsense. Water is a chemical. Used to scare consumers away from standard safe preservatives."
        },
        {
            buzzword: "Made with Organic Eco-Cotton Blend",
            meaning: "Only 2% of the garment is organic cotton; the remaining 98% is synthetic polyester that sheds microplastics when washed."
        },
        {
            buzzword: "100% Plant-Based Biodegradable Cleaner",
            meaning: "Will only break down in high-temperature industrial composting facilities at 140°F, not in home compost or landfills."
        },
        {
            buzzword: "Sustainably Sourced Wood Packaging",
            meaning: "Self-assessed claim without independent FSC or PEFC forestry audit certification."
        }
    ],

    /* Sample E-Commerce Products for Instant 1-Click Verification */
    sampleEcommerceProducts: [
        {
            id: "ecom-1",
            store: "Sephora / Beauty Store",
            productTitle: "Verdant Skin Bio-Pure Botanical Moisture Cream",
            rating: 2.0,
            ratingLabel: "⭐⭐☆☆☆ 2.0 / 5 - Mostly Misleading",
            price: "$48.00",
            rawMarketingText: "Formulated with 100% Bio-Derived Active Complex and Chemical-Free Formula in Ocean-Bound Plastic Packaging for pure natural skin care.",
            jargonTranslations: [
                {
                    term: "100% Bio-Derived Active Complex",
                    plainEnglish: "Water is 92% of the bottle. The botanical extract is less than 0.5% of the total ingredients."
                },
                {
                    term: "Chemical-Free Formula",
                    plainEnglish: "False marketing tactic. The cream contains synthetic parabens and silicones (dimethicone)."
                },
                {
                    term: "Ocean-Bound Plastic",
                    plainEnglish: "Standard plastic collected near coastlines. The pump mechanism is non-recyclable."
                }
            ],
            bulletReasons: [
                "❌ Organic botanical extracts make up less than 0.5% of total formula weight.",
                "❌ Uses misleading 'Chemical-Free' claim flagged by the Advertising Standards Authority.",
                "❌ Container pump mechanism cannot be recycled in standard recycling bins.",
                "✅ Product is cruelty-free (not tested on animals)."
            ],
            alternative: "EcoClean Botanicals Cream (USDA Biobased 98% Certified, 100% Glass Container)."
        },
        {
            id: "ecom-2",
            store: "Amazon / Fashion Store",
            productTitle: "Aura Style Eco-Conscious Denim Jeans",
            rating: 1.5,
            ratingLabel: "⭐☆☆☆☆ 1.5 / 5 - Critical Greenwash",
            price: "$65.00",
            rawMarketingText: "Crafted from Organic Eco-Cotton Blend with Carbon Neutral production via Verified Offsets to protect our planet.",
            jargonTranslations: [
                {
                    term: "Organic Eco-Cotton Blend",
                    plainEnglish: "Contains 3% organic cotton and 97% elastane/polyester plastic fibers."
                },
                {
                    term: "Carbon Neutral via Offsets",
                    plainEnglish: "Manufacturing emissions grew 14% this year. Offsets were bought from unverified forestry projects."
                }
            ],
            bulletReasons: [
                "❌ Organic cotton accounts for only 3% of the total garment fiber.",
                "❌ Sheds high amounts of synthetic microplastics into waterways during washing.",
                "❌ Manufacturing plant in Southeast Asia discharges untreated dye runoff into rivers.",
                "❌ No independent GOTS or Fair Trade certification provided."
            ],
            alternative: "Nudie Jeans or Patagonia Denim (100% Organic GOTS Certified Cotton with free lifetime repair)."
        },
        {
            id: "ecom-3",
            store: "Target / Home Goods",
            productTitle: "EcoClean Zero-Waste Detergent Sheets",
            rating: 4.8,
            ratingLabel: "⭐⭐⭐⭐⭐ 4.8 / 5 - Truly Sustainable & Natural",
            price: "$14.99",
            rawMarketingText: "100% Plastic-Free detergent sheets packaged in FSC-certified backyard compostable cardboard. USDA Biobased 98%.",
            jargonTranslations: [
                {
                    term: "FSC-certified Backyard Compostable",
                    plainEnglish: "Verified standard! Cardboard box breaks down naturally in home soil in under 60 days."
                },
                {
                    term: "USDA Biobased 98%",
                    plainEnglish: "Independently lab tested: 98% of ingredients derived from natural plants, not petroleum."
                }
            ],
            bulletReasons: [
                "✅ 100% plastic-free packaging and 94% lighter shipping carbon footprint.",
                "✅ Verified USDA Biobased 98% and B-Corp certified supply chain.",
                "✅ Ingredients are readily biodegradable per OECD 301B standards.",
                "✅ Zero hidden toxic chemicals or microplastics."
            ],
            alternative: "This product is top-rated! Safe and genuinely sustainable choice."
        }
    ],

    tactics: [
        {
            id: "hidden-tradeoff",
            title: "Sin of Hidden Trade-Off",
            subtitle: "Focusing on one eco-feature while ignoring greater environmental harm.",
            icon: "⚖️",
            description: "Suggesting a product is eco-friendly based on a narrow set of attributes without attention to other important environmental issues. For instance, highlighting recycled packaging while using toxic chemicals inside.",
            example: "Paper packaging made from sustainable forestry, but manufactured using coal energy and hazardous bleach.",
            redFlagWords: ["Recyclable Box", "Eco Paper", "Sustainably Harvested Box"],
            impactSeverity: "High"
        },
        {
            id: "no-proof",
            title: "Sin of No Proof",
            subtitle: "Environmental claims unsupported by accessible evidence or certification.",
            icon: "🔍",
            description: "An environmental claim that cannot be verified by easily accessible supporting information or by a reliable third-party certification.",
            example: "Facial tissue claiming '50% recycled fiber' with zero certification or audit reports published online.",
            redFlagWords: ["Sustainably Sourced*", "*Self Assessed", "Eco-Conscious Choice"],
            impactSeverity: "High"
        },
        {
            id: "vagueness",
            title: "Sin of Vagueness & Fluffy Words",
            subtitle: "Using broad, poorly defined buzzwords to create a green halo.",
            icon: "☁️",
            description: "Claims so poorly defined or broad that their real meaning is easily misunderstood by the consumer. Terms like 'chemical-free', 'natural', or 'green' have no legal definition.",
            example: "Labeling a plastic bottle as '100% Eco-Friendly' without specifying what makes it friendly.",
            redFlagWords: ["100% Natural", "Eco-Friendly", "Green Living", "Earth Conscious", "Pure"],
            impactSeverity: "Medium"
        },
        {
            id: "false-labels",
            title: "Worshiping False Labels",
            subtitle: "Creating fake eco-seals or self-certified badges that look official.",
            icon: "🏷️",
            description: "Creating fake stamps of approval, leaf graphics, or self-made badges that give the impression of third-party endorsement where none exists.",
            example: "Printing a green stamp reading 'Certified Earth Approved' created by the brand's internal marketing team.",
            redFlagWords: ["Earth Approved Seal", "Green-Verified", "Eco-Choice Award"],
            impactSeverity: "Critical"
        },
        {
            id: "irrelevance",
            title: "Sin of Irrelevance",
            subtitle: "Touting compliance with laws or standard practices as an eco-achievement.",
            icon: "🚫",
            description: "Making an environmental claim that may be truthful but is unimportant or unhelpful for consumers seeking environmentally preferable products.",
            example: "Advertising aerosol sprays as 'CFC-Free' when CFCs were banned by international law decades ago.",
            redFlagWords: ["CFC-Free", "Lead Free", "BPA-Free Plastics"],
            impactSeverity: "Low"
        },
        {
            id: "lesser-evils",
            title: "Lesser of Two Evils",
            subtitle: "Making an inherently harmful product sound environmentally friendly.",
            icon: "😈",
            description: "Claims that may be true within the product category, but risk distracting the consumer from the greater environmental impacts of the category as a whole.",
            example: "Organic tobacco cigarettes, eco-friendly SUV gas guzzlers, or biodegradable fireworks.",
            redFlagWords: ["Eco Cigarettes", "Green SUV", "Clean Fossil Fuels"],
            impactSeverity: "High"
        },
        {
            id: "fibbing",
            title: "Sin of Fibbing",
            subtitle: "Outright false environmental claims or misleading audit numbers.",
            icon: "🤥",
            description: "Making environmental claims that are simply false. Deceiving testing equipment or falsifying laboratory sustainability certifications.",
            example: "Falsifying carbon emissions metrics or claiming Energy Star certification without testing.",
            redFlagWords: ["Zero Emissions*", "Falsified Lab Metrics", "Net Zero Achieved"],
            impactSeverity: "Critical"
        },
        {
            id: "future-promises",
            title: "Unbacked Net-Zero Promises",
            subtitle: "Promising Net-Zero by 2050 while increasing fossil/waste investments today.",
            icon: "⏳",
            description: "Corporate PR campaigns promising carbon neutrality decades into the future without short-term benchmark targets, verified offsets, or spending capital on immediate reduction.",
            example: "Oil conglomerate launching a $50M ad campaign about 'Net Zero 2050' while allocating 95% of capital to new oil drilling.",
            redFlagWords: ["Net Zero 2050", "Target 2040", "Carbon Neutral Tomorrow"],
            impactSeverity: "High"
        }
    ],

    brands: [
        {
            id: "aura-style",
            name: "Aura Style Co.",
            industry: "Fashion & Apparel",
            logo: "👚",
            productName: "Conscious Eco-Cotton Hoodie",
            riskScore: 88,
            riskTier: "High Risk",
            primaryTactic: "Sin of Hidden Trade-Off",
            featuredClaim: "Made with 100% Organic Eco-Cotton for a Cleaner Planet",
            year: 2025,
            verified: false,
            detailedAudit: {
                marketingClaim: "Our Conscious Line uses 100% organic cotton to save water and eliminate toxic dyes.",
                reality: "Organic cotton makes up only 1.2% of the brand's total production. Synthetic polyester and microplastics constitute 94% of inventory. Water waste per garment remains unchanged due to energy-intensive dyeing processes.",
                evidenceSummary: "Supply chain audit by Textile Exchange (2024) revealed micro-blend polyesters in the fabric, and factory discharge contained untreated chemical dyes in local river basins.",
                redFlags: [
                    "Organic claim applies to under 2% of overall catalog",
                    "No microplastic filtration in manufacturing",
                    "Massive overproduction (50,000+ new SKUs per year)",
                    "Vague 'Conscious' branding without GOTS certification"
                ],
                certifications: {
                    verified: [],
                    unverified: ["Self-Branded 'Eco-Cotton Seal'"]
                },
                regulatoryNotes: "Flagged under the EU Green Claims Directive for misleading halo marketing on fast fashion lines.",
                userVotes: { greenwash: 1840, genuine: 92 },
                carbonFootprintDisclosed: false,
                recycledContentPercent: 5,
                thirdPartyAudited: false
            }
        },
        {
            id: "purespring",
            name: "PureSpring Water",
            industry: "Food & Beverage",
            logo: "💧",
            productName: "100% Recyclable Arctic Spring Bottled Water",
            riskScore: 92,
            riskTier: "High Risk",
            primaryTactic: "Sin of Vagueness & Fluffy Words",
            featuredClaim: "100% Recyclable & Carbon Neutral Hydration from Pristine Springs",
            year: 2025,
            verified: false,
            detailedAudit: {
                marketingClaim: "Bottled directly at pristine mountain glaciers with a 100% recyclable plant-based bottle that saves the oceans.",
                reality: "While technically recyclable in high-grade municipal facilities, less than 9% of PET bottles are actually recycled globally. The extraction depleted local groundwater aquifers during severe droughts.",
                evidenceSummary: "Local hydrology reports and municipal waste audits showed 85% of PureSpring bottles end up in landfills or incineration plants. Extraction rights depleted drinking wells in adjacent rural communities.",
                redFlags: [
                    "Touting recyclability for single-use virgin plastic packaging",
                    "Severe groundwater depletion in vulnerable ecosystems",
                    "Unverified carbon offsets purchased from dubious forestry projects"
                ],
                certifications: {
                    verified: [],
                    unverified: ["Self-Certified 'Ocean-Guardian Badge'"]
                },
                regulatoryNotes: "Subject to a class-action lawsuit for misleading consumers on 'Carbon Neutral' claims based on unverified offset credits.",
                userVotes: { greenwash: 2410, genuine: 115 },
                carbonFootprintDisclosed: true,
                recycledContentPercent: 10,
                thirdPartyAudited: false
            }
        },
        {
            id: "veloce-auto",
            name: "Veloce Motors",
            industry: "Automotive",
            logo: "🚗",
            productName: "EcoBoost Turbo Clean-Diesel SUV",
            riskScore: 95,
            riskTier: "High Risk",
            primaryTactic: "Sin of Fibbing",
            featuredClaim: "The World's Cleanest Diesel SUV with Zero-Impact Emissions",
            year: 2024,
            verified: false,
            detailedAudit: {
                marketingClaim: "Next-generation EcoBoost clean diesel technology delivers 40 MPG with near-zero harmful emissions.",
                reality: "Independent testing showed defeat-device software that suppressed NOx emission controls during laboratory testing while releasing up to 35x legal limits during real-world highway driving.",
                evidenceSummary: "Environmental Protection Agency (EPA) official audit report (2024) confirmed defeat-device code embedded in the Engine Control Unit (ECU).",
                redFlags: [
                    "Manipulated emission testing software",
                    "Oxides of Nitrogen (NOx) up to 35x higher than legal limits",
                    "Direct false claims in prime-time TV marketing"
                ],
                certifications: {
                    verified: [],
                    unverified: ["Internal 'Clean Diesel Standard'"]
                },
                regulatoryNotes: "Fined $1.2B by environmental regulators; mandatory recall issued across North America and Europe.",
                userVotes: { greenwash: 3950, genuine: 42 },
                carbonFootprintDisclosed: true,
                recycledContentPercent: 12,
                thirdPartyAudited: true
            }
        },
        {
            id: "solterra-energy",
            name: "SolTerra Petroleum",
            industry: "Energy & Oil",
            logo: "⚡",
            productName: "Clean Horizons Energy Plan",
            riskScore: 86,
            riskTier: "High Risk",
            primaryTactic: "Unbacked Net-Zero Promises",
            featuredClaim: "Leading the Renewable Transition to Net-Zero Carbon by 2050",
            year: 2025,
            verified: false,
            detailedAudit: {
                marketingClaim: "Investing heavily in solar, wind, and biofuels to build a zero-emission green future.",
                reality: "SolTerra spends less than 1.8% of its annual capital expenditure on renewables, while allocating over $14 Billion annually to expanding deepwater fossil fuel extraction.",
                evidenceSummary: "Financial disclosures filed with SEC show $14.2B in upstream oil exploration vs $240M in solar/wind R&D in FY2024.",
                redFlags: [
                    "98%+ capex still allocated to fossil fuel expansion",
                    "High-budget advertising focusing exclusively on 1.8% renewable projects",
                    "Lobbying against stricter emissions policy behind closed doors"
                ],
                certifications: {
                    verified: [],
                    unverified: ["Internal 'Green Future Benchmark'"]
                },
                regulatoryNotes: "Under investigation by the FTC for deceptive advertising misrepresenting business focus.",
                userVotes: { greenwash: 3120, genuine: 89 },
                carbonFootprintDisclosed: true,
                recycledContentPercent: 0,
                thirdPartyAudited: false
            }
        },
        {
            id: "verdant-skin",
            name: "Verdant Skin Organics",
            industry: "Cosmetics & Personal Care",
            logo: "🌿",
            productName: "Bio-Pure Botanical Moisture Cream",
            riskScore: 64,
            riskTier: "Suspicious",
            primaryTactic: "Sin of Vagueness & Fluffy Words",
            featuredClaim: "100% Pure Organic & Chemical-Free Skin Care from Nature",
            year: 2025,
            verified: false,
            detailedAudit: {
                marketingClaim: "Harnessing 100% pure organic botanicals without harmful chemicals or synthetic preservatives.",
                reality: "The product contains water (70%), synthetic dimethicone, parabens, and micro-plastics as emulsifiers. Organic aloe vera extract makes up under 0.5% of total formulation weight.",
                evidenceSummary: "INCI ingredient listing analysis revealed petroleum derivatives and synthetic fragrance listed in top 5 ingredients.",
                redFlags: [
                    "Scientific impossibility of 'Chemical-Free' (water is a chemical)",
                    "Organic botanicals listed at very bottom of ingredient deck (below 1%)",
                    "Non-recyclable multi-layered plastic pump container"
                ],
                certifications: {
                    verified: [],
                    unverified: ["Self-Stamped 'Bio-Pure Seal'"]
                },
                regulatoryNotes: "Warned by Advertising Standards Authority (ASA) regarding the claim 'Chemical-Free'.",
                userVotes: { greenwash: 920, genuine: 340 },
                carbonFootprintDisclosed: false,
                recycledContentPercent: 15,
                thirdPartyAudited: false
            }
        },
        {
            id: "apex-tech",
            name: "Apex Tech",
            industry: "Tech & Electronics",
            logo: "📱",
            productName: "Apex EcoPhone 15 Pro",
            riskScore: 38,
            riskTier: "Verified Genuine",
            primaryTactic: "Sin of Hidden Trade-Off",
            featuredClaim: "100% Recycled Aluminum Enclosure & 80% Carbon Offset Supply Chain",
            year: 2025,
            verified: true,
            detailedAudit: {
                marketingClaim: "Crafted with 100% recycled aluminum chassis and delivered in 100% fiber-based packaging without plastic wrap.",
                reality: "Audit verifies 100% recycled aluminum enclosure and plastic-free packaging. However, device repairability score remains low (4/10), encouraging 2-year upgrade cycles.",
                evidenceSummary: "ISO 14040/44 Life Cycle Assessment (LCA) audited independently by SGS. Supply chain transparency metrics verified on public ledger.",
                redFlags: [
                    "Proprietary screws hinder easy battery replacement",
                    "Short software support window encourages early replacement"
                ],
                certifications: {
                    verified: ["EPEAT Gold Certified", "FSC Packaging", "UL Environmental Validation"],
                    unverified: []
                },
                regulatoryNotes: "Fully compliant with EU Eco-Design Regulations.",
                userVotes: { greenwash: 340, genuine: 1450 },
                carbonFootprintDisclosed: true,
                recycledContentPercent: 75,
                thirdPartyAudited: true
            }
        },
        {
            id: "ecoclean-detergent",
            name: "EcoClean Labs",
            industry: "Household & Cleaning",
            logo: "🧼",
            productName: "Zero-Waste Detergent Sheets",
            riskScore: 18,
            riskTier: "Verified Genuine",
            primaryTactic: "None (Genuine)",
            featuredClaim: "Plastic-Free, Ultra-Concentrated Laundry Sheets in Compostable Box",
            year: 2025,
            verified: true,
            detailedAudit: {
                marketingClaim: "100% plastic-free laundry detergent sheets packaged in FSC-certified backyard compostable cardboard.",
                reality: "Full supply chain transparency provided. Water reduction of 94% during shipping compared to liquid detergent. Ingredients are readily biodegradable per OECD 301B standards.",
                evidenceSummary: "USDA Biobased Certified (98% bio-content). Third-party B-Corp audit score of 124.5.",
                redFlags: [],
                certifications: {
                    verified: ["USDA Biobased Certified", "Leaping Bunny Cruelty-Free", "B-Corp Certified", "FSC Recycled Packaging"],
                    unverified: []
                },
                regulatoryNotes: "Exemplary transparency rating; zero regulatory warnings.",
                userVotes: { greenwash: 45, genuine: 2180 },
                carbonFootprintDisclosed: true,
                recycledContentPercent: 100,
                thirdPartyAudited: true
            }
        },
        {
            id: "terratrek-shoes",
            name: "TerraTrek Footwear",
            industry: "Fashion & Apparel",
            logo: "👟",
            productName: "Ocean-Stride Recycled Trail Runners",
            riskScore: 58,
            riskTier: "Suspicious",
            primaryTactic: "Worshiping False Labels",
            featuredClaim: "Made from 100% Repurposed Ocean-Bound Plastics",
            year: 2025,
            verified: false,
            detailedAudit: {
                marketingClaim: "Every shoe removes 15 plastic bottles from marine ecosystems and coastal beaches.",
                reality: "Only upper mesh uses recycled ocean plastic (approx 15% of total shoe weight). The EVA midsole and synthetic rubber outsole use 100% virgin petroleum products with non-recyclable glue bonding.",
                evidenceSummary: "Independent shoe tear-down lab test confirmed 82% of total shoe weight is non-recyclable virgin polyurethanes and toxic adhesives.",
                redFlags: [
                    "Ocean plastic claim only applies to upper mesh (15% of shoe weight)",
                    "Shoe cannot be recycled at end-of-life due to mixed toxic glues",
                    "Proprietary 'Ocean-Shield' logo created internally without NGO audit"
                ],
                certifications: {
                    verified: ["Global Recycled Standard (Upper Mesh Only)"],
                    unverified: ["Self-Created 'Ocean Guard Seal'"]
                },
                regulatoryNotes: "Under notice by UK Advertising Standards Authority for overstated ocean cleanup numbers.",
                userVotes: { greenwash: 880, genuine: 410 },
                carbonFootprintDisclosed: false,
                recycledContentPercent: 22,
                thirdPartyAudited: true
            }
        }
    ],

    communityReports: [
        {
            id: "rep-101",
            brandName: "LuxeAura Cosmetics",
            product: "Bio-Shield Sunscreen Spray",
            claim: "100% Reef-Safe & Microplastic-Free Ocean Care Formula",
            reporter: "EcoWatcher_99",
            date: "2026-07-28",
            upvotes: 342,
            downvotes: 12,
            status: "Verified Greenwash",
            evidenceNote: "Contains Octocrylene and Avobenzone which are known coral bleaching agents banned in Hawaii and Palau.",
            tacticTag: "Sin of Fibbing"
        },
        {
            id: "rep-102",
            brandName: "GreenGrid Power",
            product: "100% Renewable Home Tariff",
            claim: "Powering Your Home with 100% Pure Wind Energy",
            reporter: "GridAuditor",
            date: "2026-08-01",
            upvotes: 218,
            downvotes: 8,
            status: "Under Review",
            evidenceNote: "Company buys cheap Renewable Energy Certificates (RECs) from decades-old hydro plants while generating 85% of active electricity from gas turbines.",
            tacticTag: "Sin of Hidden Trade-Off"
        },
        {
            id: "rep-103",
            brandName: "BioPack Solutions",
            product: "Compostable Food Containers",
            claim: "100% Home Compostable Packaging",
            reporter: "ZeroWasteSarah",
            date: "2026-08-03",
            upvotes: 489,
            downvotes: 15,
            status: "Verified Greenwash",
            evidenceNote: "Requires industrial composting facility at 140°F (60°C) for 180 days. Will NOT break down in home compost systems.",
            tacticTag: "Sin of Vagueness"
        }
    ],

    quizQuestions: [
        {
            id: 1,
            scenario: "A clothing brand advertises a new t-shirt line as '100% Eco-Friendly & Natural'. The tag lists 95% Polyester (plastic) and 5% Organic Cotton, with no third-party certification provided.",
            question: "Which greenwashing tactic is primary here?",
            options: [
                "Sin of Vagueness & Sin of No Proof",
                "Sin of Irrelevance",
                "Verified Genuine Eco Product",
                "Sin of Lesser of Two Evils"
            ],
            correctIndex: 0,
            explanation: "Combining broad undefined buzzwords ('Eco-Friendly') with a minor 5% organic ingredient and zero proof/certification is a textbook example of Vagueness and No Proof."
        },
        {
            id: 2,
            scenario: "A bottled water company prints a green leaf badge reading 'Earth Guardian Approved' on its single-use plastic bottles. Research shows 'Earth Guardian' is an internal marketing slogan created by the brand itself.",
            question: "What greenwashing trap are consumers being subjected to?",
            options: [
                "Sin of Irrelevance",
                "Worshiping False Labels",
                "Third-Party Certified Excellence",
                "Sin of Fibbing"
            ],
            correctIndex: 1,
            explanation: "Worshiping False Labels occurs when a brand designs fake seals or self-created badges that mimic official third-party environmental certifications."
        },
        {
            id: 3,
            scenario: "An oil company spends $25 Million on nationwide TV commercials celebrating its $1 Million investment in algae solar research, while spending $12 Billion expanding offshore crude drilling.",
            question: "What is this corporate campaign called?",
            options: [
                "Unbacked Net-Zero / Halo Distraction",
                "Genuine Carbon Offset",
                "Sin of Irrelevance",
                "Zero Emission Manufacturing"
            ],
            correctIndex: 0,
            explanation: "Spending exponentially more on marketing an eco-project than on the project itself to distract from core destructive operations is classic greenwash halo distraction."
        }
    ],

    chartData: {
        industryPrevalence: [
            { industry: "Fashion & Apparel", score: 78, label: "High Risk" },
            { industry: "Energy & Oil", score: 89, label: "Critical Risk" },
            { industry: "Food & Beverage", score: 71, label: "High Risk" },
            { industry: "Cosmetics", score: 64, label: "Suspicious" },
            { industry: "Automotive", score: 68, label: "Suspicious" },
            { industry: "Tech & Electronics", score: 45, label: "Moderate" },
            { industry: "Household Goods", score: 38, label: "Low Risk" }
        ],

        topBuzzwords: [
            { word: "100% Eco-Friendly", count: 432, risk: "High" },
            { word: "Carbon Neutral", count: 398, risk: "High" },
            { word: "Net Zero 2050", count: 350, risk: "Critical" },
            { word: "100% Natural", count: 310, risk: "Medium" },
            { word: "Ocean Bound Plastic", count: 275, risk: "Medium" },
            { word: "Plant-Based Plastic", count: 240, risk: "Medium" },
            { word: "Conscious Choice", count: 210, risk: "High" },
            { word: "Chemical-Free", count: 185, risk: "High" }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GREENWASH_DATA;
}

# City of Orange Budget Analysis 2026
## Complete Documentation Index & Executive Summary

---

## 📋 DOCUMENT INVENTORY

### **PRIMARY DASHBOARD**
**File:** `orange_budget_dashboard.jsx`
- Interactive React application
- 7 specialized tabs for comprehensive budget analysis
- Year-over-year comparisons throughout
- PILOT program data and analysis
- Real-time financial metrics and visualizations

### **WEBSITE MICRO WIDGET**
**Files:** `orange-budget-widget.js`, `widget-demo.html`
- Dependency-free web component for embedding a compact budget snapshot on another website
- Highlights FY2026 budget, tax levy, PILOT revenue, grant revenue, and the top watch item
- Includes direct links to the full dashboard and GitHub repository
- Example embed:

```html
<script src="orange-budget-widget.js" defer></script>
<orange-budget-widget
  dashboard-url="https://jameshward3.github.io/OrangeBudgetDashboard/"
  github-url="https://github.com/jameshward3/OrangeBudgetDashboard">
</orange-budget-widget>
```

**Features:**
- Overview: Key metrics with 2025 vs 2026 changes
- 2025 vs 2026 Delta: Comprehensive year-over-year comparison
- **NEW: PILOT Program Tab** - Payment-in-Lieu-of-Taxes analysis with 27 property portfolio
- Capital Projects: 2026-2031 six-year plan ($16.2M)
- Spending Analysis: Department-by-department breakdown
- 6-Year Forecast: Multi-year budget projections
- Change Orders: Construction contract modifications & cost overruns

---

### **ANALYSIS DOCUMENTS**

#### **1. INTEGRATED_FINANCIAL_ANALYSIS_2026.md**
**Purpose:** Complete financial health assessment across all budget categories

**Contents:**
- Executive summary with overall health rating
- Integrated overview of budget movement and revenue shifts
- Key financial impacts by source (grants, PILOTs, insurance, etc.)
- Department-by-department impact analysis
- Financial health scorecard (6 categories)
- 2027 budget implications and revenue challenges
- Critical action items (immediate, short-term, medium-term)
- Risk matrix with mitigation strategies
- 5-year financial forecast
- Top 5 strategic recommendations

**Best For:** C-level decision-makers, strategic planning, city council

---

#### **2. PILOT_PROGRAM_ANALYSIS.md**
**Purpose:** Deep-dive analysis of Payment-in-Lieu-of-Taxes program

**Contents:**
- Executive summary of PILOT financial impacts
- What PILOTs are and why Orange uses them
- Portfolio composition and analysis (27 active agreements)
- Individual PILOT agreement performance (2025 vs 2026)
- Portfolio health assessment (tier analysis)
- Financial impact analysis with reconciliation
- Risk assessment (critical concerns, aging patterns)
- Strategic recommendations for program improvement
- Comparative context vs. peer cities
- Program financial health rating

**Coverage:** All 27 PILOT properties with detailed comparisons
- Washington Dodd ($443.7K, -10.13%)
- Oakwood Towers ($243.3K, -11.28%)
- Our Lady of Mt. Carmel ($178.3K, -12.75%)
- Station Partners - Tony Galento ($21.2K, -91.53% 🚨)
- L & M Development ($66.6K, -53.65% 🚨)
- Plus 22 additional properties analyzed

**Best For:** Economic development, tax assessor, finance director

---

#### **3. 2025_vs_2026_DELTA_ANALYSIS.md**
**Purpose:** Comprehensive year-over-year variance analysis

**Contents:**
- Executive summary with overall budget changes
- Total budget comparison across all categories
- Operations analysis (within and excluded from CAP)
- Capital improvements comparison
- Debt service analysis
- Revenue sources comparison (detailed)
- Tax levy comparison and CAP status
- Department-by-department summary
- Water & sewer utility comparison
- Parking utility status (eliminated)
- Key trends and patterns
- Significant variances explained (14 key items)
- Operational efficiency analysis
- Capital investment shift analysis
- Summary of key deltas table
- Financial health assessment

**Highlights:**
- Workers' Compensation: +50% (🚨 largest increase)
- Grant Revenue: +4,531% ($6.8M new grants)
- Court Fines: -21.86%
- Fire Department: +10.54%
- Police: -3.75%
- Debt Service: -10.23% (positive)

**Best For:** Budget analysts, finance staff, detailed review

---

#### **4. DELTA_SUMMARY_QUICK_REFERENCE.md**
**Purpose:** One-page quick-reference guide to 2025-2026 changes

**Contents:**
- Overall budget movement summary
- Red flags and green flags (3 each category)
- Key metrics at a glance table
- Department changes ranked by impact
- Revenue source changes ranked by significance
- Budget composition shifts
- Interpretation for different stakeholders
- Action items by group
- Questions to ask city leadership

**Best For:** Quick briefings, public presentations, stakeholder communications

---

#### **5. CONSTRUCTION_MANAGER_SUMMARY.md**
**Purpose:** Focused analysis for construction and facilities professionals

**Contents:**
- Capital projects quick summary
- Total capital investment breakdown
- Priority projects for 2026 (table format)
- Funding sources for capital projects
- Recent change orders analysis and lessons learned
- Municipal facilities improvements by location
- Water & sewer infrastructure details
- Infrastructure investment priorities
- Opportunities for 2026 (4 major areas)
- Risk factors and considerations
- Project timeline implications
- Key contacts and resources
- Educational/BIM teaching applications

**Capital Project Focus:**
- Water/Sewer: $5.4M (highest priority)
- DPW/Facilities: $3.2M
- Equipment/Tech: $800K
- Roads/Infrastructure: $250K

**Best For:** Architects, engineers, construction managers, BIM coordinators, Columbia University BIM teaching

---

#### **6. BUDGET_DASHBOARD_GUIDE.md**
**Purpose:** Comprehensive user guide for understanding the budget dashboard

**Contents:**
- Overview of dashboard features
- Budget summary with all key figures
- Capital projects detailed descriptions
- Spending analysis methodology
- Water & sewer utility details
- Debt service breakdown
- Municipal data and official contacts
- Legislative and regulatory references
- How to use dashboard by role (administrators, managers, analysts, citizens)
- Navigation tips and shortcuts
- Data accuracy notes
- Additional resources and references

**Best For:** New users, training materials, reference documentation

---

### **LEGACY DOCUMENTS** (Previously Created)

- `orange_budget_dashboard.jsx` - Interactive dashboard (updated with PILOT data)
- `CONSTRUCTION_MANAGER_SUMMARY.md` - Construction focus
- `BUDGET_DASHBOARD_GUIDE.md` - Dashboard user guide

---

## 🎯 QUICK NAVIGATION BY ROLE

### **For City Mayor/Council**
1. Start: DELTA_SUMMARY_QUICK_REFERENCE.md
2. Review: INTEGRATED_FINANCIAL_ANALYSIS_2026.md (Section: Stakeholder Communication)
3. Deep Dive: INTEGRATED_FINANCIAL_ANALYSIS_2026.md (Sections: Risks, Forecast, Recommendations)

**Time Required:** 30-60 minutes

---

### **For CFO/Finance Director**
1. Start: Dashboard - Overview & Delta tabs
2. Detailed: INTEGRATED_FINANCIAL_ANALYSIS_2026.md (all sections)
3. Specialized: PILOT_PROGRAM_ANALYSIS.md
4. Reference: 2025_vs_2026_DELTA_ANALYSIS.md

**Time Required:** 2-3 hours

---

### **For Department Heads**
1. Start: DELTA_SUMMARY_QUICK_REFERENCE.md
2. Your Department: 2025_vs_2026_DELTA_ANALYSIS.md (Section 8-9)
3. Dashboard: Check your department in dashboard spending tab
4. Context: INTEGRATED_FINANCIAL_ANALYSIS_2026.md (Department impacts)

**Time Required:** 30-45 minutes

---

### **For Construction/Facilities Managers**
1. Start: CONSTRUCTION_MANAGER_SUMMARY.md
2. Dashboard: PILOT Program and Capital Projects tabs
3. Detailed: PILOT_PROGRAM_ANALYSIS.md
4. Planning: 2027 implications from INTEGRATED analysis

**Time Required:** 45-60 minutes

---

### **For Public/Community**
1. Start: Dashboard - Overview tab
2. Easy Read: DELTA_SUMMARY_QUICK_REFERENCE.md (Taxpayers section)
3. Learn More: BUDGET_DASHBOARD_GUIDE.md

**Time Required:** 20-30 minutes

---

### **For Academic/BIM Teaching**
1. Start: CONSTRUCTION_MANAGER_SUMMARY.md (Educational section)
2. Case Study: Dashboard - Capital Projects tab
3. Analysis: INTEGRATED_FINANCIAL_ANALYSIS_2026.md
4. Questions: See CONSTRUCTION_MANAGER_SUMMARY.md (Discussion Questions)

**Time Required:** Variable by assignment

---

## 📊 KEY FINDINGS SUMMARY

### **OVERALL BUDGET RATING: STABLE WITH CAUTION** ⚠️

### **Top 5 Positives** ✅

1. **Grant Acquisition Success** (+$6.8M)
   - Major state/federal grants secured
   - Infrastructure investment without local tax burden
   - Demonstrates excellent grant writing

2. **Debt Decline** (-$491K or -10.23%)
   - Bonds maturing on schedule
   - Long-term financial health improving
   - Future tax relief potential

3. **Fiscal Discipline** (-2.63% core operations)
   - Kept core operations within 2% CAP
   - Despite inflation and pressures
   - Shows effective cost management

4. **Capital Investment** ($16.2M 6-year plan)
   - Infrastructure modernization prioritized
   - Water/sewer systems being upgraded
   - Municipal facilities improvements planned

5. **Revenue Diversification** (PILOTs, Grants, Permits)
   - 27 PILOT properties providing $2.79M
   - Permit revenues growing (+25.89%)
   - Less dependent on property taxes alone

### **Top 5 Concerns** ⚠️

1. **Workers' Comp Cost Spike** (+50% or +$500K)
   - Largest percentage increase across budget
   - Root cause requires investigation
   - If trend continues, becomes unsustainable

2. **PILOT Portfolio Aging** (56% declining)
   - 13 of 27 properties showing revenue reduction
   - 4 properties discontinued (-$212K)
   - New recruitment insufficient to replace losses
   - Forecast: -10-15% decline in 2027

3. **2027 Revenue Cliff** (Potential -$6.8M)
   - Most 2026 grants are one-time project funding
   - Grant revenue drop from $6.95M to ~$500K likely
   - Creates budget challenge unless new grants secured

4. **Community Services Cuts** (-24.36% or -$326K)
   - Largest departmental percentage reduction
   - Impacts vulnerable populations
   - Service continuity questions

5. **Tax Increase Over CAP** (+4.81% vs 2% limit)
   - Exceeds cap despite controls
   - Taxpayers will see significant increases
   - Requires exception approvals

---

## 📈 CRITICAL METRICS DASHBOARD

### **2026 Budget at a Glance**

| Metric | 2025 | 2026 | Change | Status |
|--------|------|------|--------|--------|
| **Total Budget** | $92.3M | $94.6M | +2.44% | ✅ Controlled |
| **Tax Levy** | $66.9M | $70.1M | +4.81% | ⚠️ Over cap |
| **Grant Revenue** | $150K | $6.95M | +4,531% | ✅ Major success |
| **PILOT Revenue** | $2.66M | $2.79M | +4.64% | ⚠️ Aging portfolio |
| **Workers' Comp** | $1.0M | $1.5M | +50.0% | 🚨 Critical |
| **Health Insurance** | $13.6M | $14.3M | +5.42% | ⚠️ Expected trend |
| **Debt Service** | $4.8M | $4.3M | -10.23% | ✅ Improving |
| **Police** | $17.9M | $17.2M | -3.75% | ✅ Controlled |
| **Fire** | $9.1M | $10.0M | +10.54% | ⚠️ Expected increase |
| **Capital Plan (6yr)** | $8M | $16.2M | +102.8% | ✅ Strategic |

---

## 🚀 IMMEDIATE ACTIONS REQUIRED (Next 30 Days)

### **By CFO/Finance Director**
- [ ] Investigate workers' compensation +50% cost increase
- [ ] Determine if rate increase vs. claims experience
- [ ] Document all 2026 grant agreements and timelines
- [ ] Review PILOT portfolio decline patterns
- [ ] Identify Tony Galento Plaza PILOT status (-91%)

### **By City Manager/Mayor**
- [ ] Brief council on 2027 revenue challenges
- [ ] Approve PILOT recruitment initiative
- [ ] Direct insurance cost containment strategy
- [ ] Evaluate community services transition plan

### **By Planning/Development**
- [ ] Identify 3-5 PILOT candidate properties
- [ ] Target 2-3 new agreements within 12 months
- [ ] Coordinate with economic development plan

---

## 📞 QUESTIONS FOR CITY LEADERSHIP

1. **Workers' Compensation:** What drove the 50% increase? Is it rate-driven or claims-driven?
2. **Tony Galento Plaza PILOT:** Why did revenue drop 91%? What is current property status?
3. **Grant Sustainability:** Which 2026 grants are recurring vs. one-time?
4. **Community Services:** What programs are being cut? How will services be maintained?
5. **PILOT Strategy:** What is plan to recruit new properties for 2027+?
6. **2027 Budget:** How will you address potential $6.8M grant revenue cliff?
7. **Insurance Costs:** What risk management strategies are being implemented?
8. **Capital Projects:** What is prioritization order for 2026 capital spending?

---

## 📚 DOCUMENT USAGE CHECKLIST

### **For Different Meeting Types**

**☐ Council Budget Presentation**
- Dashboard (Overview + Delta tabs)
- DELTA_SUMMARY_QUICK_REFERENCE.md
- INTEGRATED_FINANCIAL_ANALYSIS_2026.md (Recommendations section)

**☐ Public Budget Hearing**
- Dashboard (Overview tab)
- DELTA_SUMMARY_QUICK_REFERENCE.md (Community section)
- Visual aids from dashboard charts

**☐ Department Head Meeting**
- Department-specific sections from 2025_vs_2026_DELTA_ANALYSIS.md
- Dashboard Spending Analysis tab
- Individual department budget items

**☐ Economic Development/PILOT Discussion**
- PILOT_PROGRAM_ANALYSIS.md (full document)
- Dashboard PILOT Program tab
- PILOT portfolio status charts

**☐ Capital Projects Planning**
- CONSTRUCTION_MANAGER_SUMMARY.md
- Dashboard Capital Projects tab
- Project-specific budget details

**☐ Finance Committee Meeting**
- INTEGRATED_FINANCIAL_ANALYSIS_2026.md
- Dashboard all tabs
- Risk matrix and forecast sections

**☐ Media/Public Information**
- Dashboard Overview tab
- DELTA_SUMMARY_QUICK_REFERENCE.md
- Key findings summary (this document)

---

## ✅ COMPLETION CHECKLIST

**Dashboard Application**
- [x] Overview tab with 2025 vs 2026 changes below each metric
- [x] 2025 vs 2026 Delta tab with comparisons
- [x] NEW: PILOT Program tab with 27-property analysis
- [x] Capital Projects tab with project details
- [x] Spending Analysis tab with department breakdowns
- [x] 6-Year Forecast tab with projections
- [x] Change Orders tab with construction updates

**Analysis Documents**
- [x] INTEGRATED_FINANCIAL_ANALYSIS_2026.md (11 sections, comprehensive)
- [x] PILOT_PROGRAM_ANALYSIS.md (detailed 27-property portfolio)
- [x] 2025_vs_2026_DELTA_ANALYSIS.md (18 detailed sections)
- [x] DELTA_SUMMARY_QUICK_REFERENCE.md (one-page summaries)
- [x] CONSTRUCTION_MANAGER_SUMMARY.md (construction focus)
- [x] BUDGET_DASHBOARD_GUIDE.md (user guide)

**Reference Materials**
- [x] This master index document
- [x] Key findings summary
- [x] Quick navigation by role
- [x] Critical metrics dashboard
- [x] Immediate actions list
- [x] Document usage checklist

---

## 🎓 EDUCATIONAL VALUE FOR BIM TEACHING

**Potential Case Study Applications:**

1. **Construction Cost Estimation**
   - Change order analysis showing real cost overruns
   - NJDOT project: 21.7% overrun ($112K)
   - Roof project: 20.4% overrun ($75K)
   - Safe Streets: 49.4% overrun ($113K)

2. **Project Management**
   - Multi-stakeholder coordination (utilities, transit, pedestrians)
   - Scope creep management
   - Timeline and budget control
   - Lessons learned documentation

3. **VDC/BIM Applications**
   - How BIM could reduce change orders (utility coordination)
   - Conflict detection benefits
   - Public sector project examples
   - Infrastructure modernization planning

4. **Municipal Finance**
   - Budget development and constraints
   - Capital planning and prioritization
   - Multi-year project commitment
   - Risk management in public projects

5. **Urban Infrastructure**
   - Water/sewer system modernization ($6.9M investment)
   - Street/pedestrian improvements
   - Municipal facility upgrades
   - Public-private partnerships (PILOTs)

---

## 📞 CONTACT & NEXT STEPS

**For Dashboard Questions:**
- Review BUDGET_DASHBOARD_GUIDE.md
- Check dashboard help/tooltips
- Contact: [City of Orange Finance Department]

**For Budget Analysis Questions:**
- Review INTEGRATED_FINANCIAL_ANALYSIS_2026.md
- Contact CFO: Nile Clements
- Email: [Finance@orange.gov]

**For PILOT Program Questions:**
- Review PILOT_PROGRAM_ANALYSIS.md
- Contact: Economic Development / Finance Director
- Email: [Finance@orange.gov]

**For Public Information:**
- Review DELTA_SUMMARY_QUICK_REFERENCE.md
- Visit: [City Website]
- Contact: City Manager or Public Information Officer

---

**Document Prepared:** May 2026
**Last Updated:** May 2026
**Next Review:** October 2026 (2027 Budget Development)
**Distribution:** City Council, Department Heads, Finance Committee, Public Records

---

## 🏁 SUMMARY

You now have a **comprehensive, production-ready budget analysis system** including:

✅ **Interactive Dashboard** with 7 tabs and full 2025 vs 2026 comparison  
✅ **PILOT Program Analysis** covering all 27 properties and financial impacts  
✅ **Integrated Financial Analysis** with strategic recommendations  
✅ **Delta Analysis** showing year-over-year changes across all categories  
✅ **Construction Focus** for facilities and building management professionals  
✅ **Supporting Documentation** for all stakeholder groups  

**All files are ready for:**
- Council presentations
- Public budget hearings  
- Department planning
- Capital project management
- Educational/BIM teaching
- Community communications

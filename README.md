# -CSCI39529
This is the product delivered by Group 10.

# ProfitLens: live prototype

**Live demo:** https://barnabasnovak1.github.io/-CSCI39529/

| How to get in | What happens |
|---|---|
| Click **"Try the live demo"** on the homepage | Guest access, straight to the dashboard. No signup needed. |
| Log in with `demo@profitlens.app` / `demo1234` | Goes through the 3-step onboarding first, then the dashboard. |
| Click **"Reset demo"** in the top banner | Clears everything you clicked and starts over. |

> **Everything in this prototype is example data.** The business, numbers, customers and recommendations are made up for a sample café, "Harbor & Pine Coffee Co." (2 locations, 18 staff, 12 months of history). No real accounts are connected, no API calls are made, and nothing you type leaves your browser. Your clicks are saved only in your own browser (localStorage).

---

## 1. What ProfitLens is

ProfitLens is affordable business intelligence for small and medium-sized businesses. Most small businesses already use several separate tools: one for accounting, one for sales, one for customers, one for ads. Each tool shows only its own slice of the business, and the owner rarely has the time or an analyst to connect the dots.

ProfitLens **connects those tools, combines their data, finds where money is being lost or left on the table, and tells the owner exactly what to do about it, with an estimated dollar impact.** Think of it as a part-time business analyst for $25–$75 a month.

## 2. How it works (the big picture)

```
 Your tools                 ProfitLens                                    You
 ──────────                 ──────────                                    ───
 QuickBooks / Xero  ─┐
 HubSpot / Salesforce├─►  1. Connect   ─►  2. Combine  ─►  3. Analyze  ─►  4. Recommend  ─►  5. Track
 Shopify / Square    │     (API key or     (match the      (spot trends,    (plain-English    (mark actions
 Stripe              │      OAuth, read-    same customer,  waste, risks,    actions with      done, see
 Google / Meta Ads  ─┘      only access)    order, date)    compare peers)   a $ impact)       $ saved)
```

1. **Connect:** the owner connects each tool once, using that tool's API key or a "Sign in with…" (OAuth) button. Access is **read-only**: ProfitLens can look at data but never change it.
2. **Combine:** data from all tools is pulled on a schedule and put into one common format, e.g. a Shopify order, a Square payment and a QuickBooks invoice all become "a sale on a date, to a customer, for an amount."
3. **Analyze:** rules and statistics run over the combined data to find patterns no single tool can see: labor cost vs. sales by hour, ad spend vs. actual orders, customers who stopped coming back, supplier prices creeping up, unpaid invoices, and so on. Results are also compared with anonymized averages from similar businesses (benchmarks).
4. **Recommend:** each finding becomes an "insight card": what is happening, the evidence, how confident we are, the estimated monthly dollar impact, and step-by-step actions.
5. **Track:** the owner marks actions as in progress / done, and the dashboard adds up how much profit has been captured. "Was this useful?" feedback helps improve future recommendations.

In this prototype, steps 1–2 are simulated and steps 3–5 are shown with pre-made example results.

## 3. Tour of the app: what is what

| Screen | What it is | How it works in the demo |
|---|---|---|
| **Landing page** (`/`) | The marketing website: value proposition, how it works, supported tools, pricing, add-ons, security. | Monthly/annual price toggle. "Try the live demo" logs you in as a guest. |
| **Login / Sign up** (`/login`) | Account access. | Accepts the demo login above, or "Continue as guest". Sign up is simulated. |
| **Onboarding** (`/onboarding`) | First-time setup in 3 steps: 1) industry, team size, goals; 2) connect tools; 3) analysis. | Connecting is simulated. The analysis is a progress bar that walks through what the real system would do. |
| **Overview** (dashboard) | The one-page summary of the business. | **Profit Health Score** (0–100, built from profitability, cash, growth, efficiency and retention sub-scores), KPI cards (revenue, net profit, gross margin, cash), revenue vs. expenses chart, top 3 actions this week, impact tracker, expense mix and a 90-day forecast. |
| **Insights and actions** | The core feature: a feed of recommendations. | 8 example insights (e.g. "Tue/Wed afternoons are overstaffed", $720/mo; "Google Ads \"Brand – Broad\" campaign is losing money", $640/mo; "$8,420 in wholesale invoices are 45+ days overdue"). Each card shows impact, evidence, data sources, confidence, effort and a checklist. Filter by area/status, sort by impact/effort/confidence, mark progress, rate usefulness. |
| **Benchmarks** *(Growth plan)* | How the business compares with similar ones. | Example peer data for cafés of similar size: your value, peer median, and your percentile, for metrics like gross margin, labor % of revenue, net margin, ad return (ROAS), repeat-customer rate, average ticket and days to get paid. Includes an opt-out from contributing anonymized data. |
| **Ask ProfitLens** *(Growth plan)* | Ask questions about your business in plain English. | Scripted answers to example questions such as "Why did profit drop in September?" or "Which location is more profitable?". |
| **Reports** | A monthly summary the owner can download or share with a bookkeeper, lender or partner. | Example monthly report, email digest settings, and a "custom report" upsell. |
| **Integrations** | Where tools are connected and plan usage is shown. | Usage meters (platforms, records processed, users, locations) against plan limits. **Connect** opens an API key form (placeholder, any value works). Disconnect is also simulated. |
| **Plan and billing** | Current plan, usage, invoices, plan comparison, add-ons. | Switch between Starter and Growth to see features unlock or lock across the app. No real payment. |

## 4. The connected tools, in short

Each tool supplies one piece of the picture. ProfitLens only **reads** data, never changes it.

| Tool | Type | What ProfitLens reads | Why it matters (simply) | How it connects |
|---|---|---|---|---|
| **QB** QuickBooks Online | Accounting | Invoices, bills, vendors, profit & loss | Shows where money comes in and goes out; finds overdue invoices and rising supplier costs. | OAuth sign-in |
| **X** Xero | Accounting | Transactions, reports | Same job as QuickBooks for businesses that use Xero. | OAuth sign-in |
| **HS** HubSpot CRM | CRM (customers) | Contacts, deals, email engagement | Spots loyal customers who stopped buying and leads going cold. | Private app token (API key) |
| **SF** Salesforce | CRM (customers) | Accounts, opportunities | Measures the sales pipeline and win rate. | OAuth sign-in |
| **SH** Shopify | Sales (online) | Orders, products, customers | Finds best sellers, slow items and abandoned carts. | Admin API token (API key) |
| **SQ** Square POS | Sales (in-store) | Payments, items, staff shifts | Compares sales with labor cost hour by hour to find over/under-staffing. | Access token (API key) |
| **ST** Stripe | Payments | Charges, subscriptions, refunds | Tracks recurring revenue, refunds and failed payments. | Restricted read-only API key |
| **GA** Google Ads | Advertising | Campaign spend, clicks, conversions | Shows which ads actually lead to sales and which waste money. | Developer token + OAuth |
| **M** Meta Ads | Advertising | Facebook/Instagram ad spend and results | Compares cost per customer with Google Ads. | Marketing API token (OAuth) |

**The value comes from combining them.** For example: Square payments show only ~14 sales an hour on Tue/Wed 2–5 pm at one location, while Square shift data shows 3 staff scheduled, so labor runs 38% of sales against a 26% target. ProfitLens recommends trimming that shift (about $720/mo). Similarly, Google Ads shows a campaign spent $1,120 last month, but the Shopify orders traced back to its clicks bring in only $896 (a 0.8x return), so ProfitLens recommends narrowing or pausing it and moving budget to better campaigns (about $640/mo).

## 5. API connection placeholders

A real version would connect to each tool through its official API, using an **API key** (copied from the tool's settings) or an **OAuth token** (issued when the owner clicks "Sign in with…"). The prototype includes the placeholders for this but runs in **demo mode**, so no requests are made.

| File | What it contains |
|---|---|
| `web/src/api/config.ts` | `DEMO_MODE = true`, plus, for each tool: auth type (API key or OAuth), key label, placeholder value (e.g. `YOUR_SHOPIFY_ADMIN_API_TOKEN`), environment variable name, API base URL and link to the official docs. |
| `web/src/api/client.ts` | `connectIntegration()` / `disconnectIntegration()`. In demo mode they wait briefly and return example numbers. With demo mode off, they call a placeholder backend URL (`https://api.profitlens.example/v1`). |
| `web/.env.example` | The list of keys a real deployment would need, with placeholder values. |
| Integrations page → **Connect** | A form asking for the tool's key (placeholder text shown). Any value or a blank field works, and nothing is stored or sent. |

**How it would work for real:**
1. The owner pastes a key or signs in with OAuth on the Integrations page.
2. The browser sends it once to the ProfitLens **backend server** over HTTPS. The backend stores it encrypted. Keys are never kept in the browser or in the website code.
3. On a schedule (e.g. every hour), the backend calls each tool's API with the stored key, downloads new records and saves them in one common format in a secure database.
4. The analysis runs on that database and the app shows the results.
5. Disconnecting deletes the key and the synced data.

A backend, a database and real API keys are not part of this prototype.

## 6. Plans and what they unlock

| | Starter: $25/mo | Growth: $75/mo |
|---|---|---|
| Connected tools | up to 3 | up to 10 |
| Records processed / month | 10,000 | 100,000 |
| Users / locations | 1 / 1 | 5 / 3 |
| Insights | Top 3 per week | Full feed |
| Benchmarks, Ask ProfitLens, 90-day forecast | locked | included |

Annual billing gives 2 months free ($250 / $750 per year). Add-ons: expert strategy session ($149), custom report pack (from $99), custom integration (quoted). Switch plans in **Plan and billing** to see locked features in the app.

## 7. Project structure

```
/                     Built website served by GitHub Pages (index.html, assets/)
web/                  Source code (React + TypeScript + Vite + Tailwind CSS)
  src/main.tsx        App entry point (hash routing, so it works on GitHub Pages)
  src/App.tsx         Page routes
  src/store.tsx       Demo state (logged-in user, plan, connected tools, progress), saved in localStorage
  src/data.ts         ALL example data: plans, tools, the sample café, monthly numbers, insights, benchmarks, scripted answers
  src/api/            API placeholders (config.ts, client.ts)
  src/pages/          Landing, Login, Onboarding
  src/app/            Logged-in screens: Dashboard, Insights, Benchmarks, Assistant, Reports, Integrations, Billing, Layout
  src/components/     Shared UI pieces (cards, buttons, insight card, plan lock)
.github/workflows/    Publishes the site to GitHub Pages on every push to main
```

To change any number, insight or text shown in the demo, edit `web/src/data.ts`.

## 8. Run locally and deploy

```bash
cd web
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # writes the website to the repo root (index.html, assets/)
```
Commit and push the build output; `.github/workflows/pages.yml` publishes it to https://barnabasnovak1.github.io/-CSCI39529/ (Settings → Pages → Source: GitHub Actions).

---

# Business Intelligence SaaS Platform

**Affordable, Actionable Business Intelligence for Small and Medium-Sized Businesses**

## Overview

Our venture is developing an affordable, integrated business intelligence platform designed primarily for small and medium-sized businesses (SMBs). Many smaller businesses rely on multiple disconnected tools to manage accounting, sales, customer relationships, and advertising, but lack the resources to hire dedicated data analysts or business consultants.

Our platform connects these existing business tools, analyzes their data, identifies operational inefficiencies and revenue opportunities, and provides actionable recommendations to improve profitability and business performance.

Rather than competing directly with expensive enterprise analytics solutions, our goal is to make intelligent, data-driven decision-making accessible to businesses with limited technical and financial resources.

## Core Features

- **Data Integration:** Connect accounting software, CRM systems, sales platforms, and advertising services.
- **Business Analytics:** Analyze financial and operational data to identify trends and inefficiencies.
- **Revenue Optimization:** Discover opportunities to increase revenue and reduce unnecessary expenses.
- **Actionable Recommendations:** Translate complex data into practical business recommendations.
- **Performance Benchmarking:** Help businesses evaluate their performance using anonymized and appropriately aggregated industry data.
- **Scalable Dashboard:** Present important business metrics in an accessible, centralized interface.

## Business Model

We follow a tiered Software-as-a-Service (SaaS) subscription model, offering affordable plans based on business size and usage.

| Plan | Monthly Price | Target Customers |
|---|---:|---|
| Starter | $25 | Small businesses |
| Growth | $75 | Growing businesses |

Pricing and features will scale according to:
- Number of connected platforms.
- Monthly data-processing volume.
- Number of users and business locations.
- Access to advanced analytics.
- Personalized recommendations.

Additional revenue opportunities include premium consulting, customized reports, and specialized integrations.

### Key Business Metrics

We will monitor:
- Monthly Recurring Revenue (MRR).
- Customer Acquisition Cost (CAC).
- Customer Lifetime Value (LTV).
- Customer retention and churn.
- Subscription conversion rates.
- Customer engagement and measurable business impact.

## Technology and Intellectual Property

Our competitive advantage will come from proprietary data-analysis methods, recommendation algorithms, and benchmarking models.

Our core assets will include:
- Proprietary analytical algorithms.
- Recommendation and decision-support logic.
- Secure databases and cloud infrastructure.
- Third-party software integrations.
- Data-processing and benchmarking capabilities.

We will prioritize cybersecurity, appropriate data permissions, customer privacy, and reliable analytical results.

## Legal Structure and Governance

The proposed legal structure is a **Delaware C-Corporation**, selected for its scalability and compatibility with future venture capital investment.

Our governance framework will include:
- A formal founders' agreement.
- Equity allocation based on contributions and responsibilities.
- Four-year equity vesting with a one-year cliff.
- Repurchase provisions for unvested shares when founders leave.
- Copyright and trademark protection.
- Intellectual Property Assignment Agreements.
- Confidentiality agreements for employees and external developers.

## Team and Organizational Strategy

Our founding team brings together different technical, educational, and business perspectives. This heterogeneous composition allows us to approach the venture from both software development and commercial perspectives.

### Identified Skills Gaps

Our primary areas for improvement include:
- Advanced cloud infrastructure and scalability.
- Cybersecurity and data protection.
- Financial analytics and reporting.
- B2B sales and customer acquisition.

### Recruitment Strategy

Over the next 12 months, we plan to address these gaps through targeted recruitment, experienced industry advisors, and equity incentives where appropriate.

## Partnerships and Growth Strategy

To overcome the challenges associated with being a new venture, we intend to establish relationships with:

- Experienced SaaS entrepreneurs.
- Financial technology professionals.
- Cloud infrastructure and cybersecurity specialists.
- Accounting firms and business consultants.
- University entrepreneurship programs.
- Startup accelerators and mentorship networks.

We will initially focus on pilot programs and early business customers, using feedback and measurable results to improve the platform and establish credibility.

## Development Roadmap

**Phase 1 – Research and MVP Development**
- Identify the most valuable integrations.
- Define core analytical capabilities.
- Develop the initial platform and dashboard.
- Test data-processing and recommendation functionality.

**Phase 2 – Testing and Validation**
- Recruit initial pilot customers.
- Collect feedback and evaluate recommendations.
- Improve usability, security, and analytical accuracy.
- Validate the proposed subscription pricing.

**Phase 3 – Launch and Growth**
- Introduce Starter and Growth subscription plans.
- Expand integrations and analytical capabilities.
- Develop customer acquisition channels.
- Establish strategic partnerships.

**Phase 4 – Scaling**
- Improve cloud infrastructure and scalability.
- Introduce advanced benchmarking.
- Expand into additional industries and markets.
- Explore external investment opportunities.

## Long-Term Vision

Our long-term vision is to become an accessible business intelligence solution that helps smaller businesses make better decisions through data.

We believe that advanced analytics should not be limited to large corporations with significant financial and technical resources. By connecting existing business tools and translating complex information into actionable insights, we aim to help businesses operate more efficiently, identify new opportunities, and achieve sustainable growth.

---

*This repository represents the business concept, strategic direction, and development vision of our proposed SaaS venture. Product features, pricing, and implementation details are subject to validation and refinement.*

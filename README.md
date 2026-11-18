# ProfitLens

Small-business analytics prototype for CSCI 395 (Group 10). It connects to a business's tools (accounting, sales, CRM, ads), finds where money is being lost, and suggests what to do about it.

Live demo: [https://matenovak07.github.io/-CSCI39529/](https://matenovak07.github.io/CSCI39529/)

Everything in the demo is made-up data for a sample café, Harbor & Pine Coffee Co. Nothing you type leaves your browser. Click "Try the live demo" on the homepage to get in, or log in with `demo@profitlens.app` / `demo1234`.

## Pages

- **Overview:** revenue, profit, one chart and the top 3 actions
- **Insights:** all recommendations, with the evidence and steps for each
- **Benchmarks, Ask ProfitLens:** Growth plan only
- **Reports:** printable monthly summary
- **Integrations:** connect and disconnect tools (simulated)
- **Billing:** switch between the Starter ($25/mo) and Growth ($75/mo) plans

## Running it

​```bash
cd web
npm install
npm run dev     # http://localhost:5173
npm run build   # writes the site to the repo root for GitHub Pages
​```

All example data lives in `web/src/data.ts`.

## Business plan

We sell a tiered SaaS subscription (Starter $25, Growth $75) to small businesses that can't afford an analyst. Planned extras: consulting, custom reports and custom integrations. We plan to form a Delaware C-Corp with four-year founder vesting and a one-year cliff.

The development plan has four phases: build the MVP, run pilots with early customers, launch the paid plans, then scale.

export type PlanId = 'starter' | 'growth'

export const PLANS: Record<PlanId, {
  name: string; monthly: number; annual: number; tagline: string
  integrations: number; records: number; users: number; locations: number
  features: string[]; locked?: string[]
}> = {
  starter: {
    name: 'Starter', monthly: 25, annual: 250,
    tagline: 'For owner-operators who want a clear monthly picture.',
    integrations: 3, records: 10_000, users: 1, locations: 1,
    features: ['Up to 3 connected platforms', '10,000 records processed / month', '1 user, 1 location', 'Profit Health Score and core KPIs', 'Top 3 recommended actions each week', 'Monthly PDF summary report'],
  },
  growth: {
    name: 'Growth', monthly: 75, annual: 750,
    tagline: 'For growing teams that want to act on every dollar.',
    integrations: 10, records: 100_000, users: 5, locations: 3,
    features: ['Up to 10 connected platforms', '100,000 records processed / month', '5 users, up to 3 locations', 'Full insight feed with dollar impact', 'Peer benchmarking (anonymized)', '90-day cash and revenue forecast', 'Ask ProfitLens assistant', 'Weekly digest and Slack alerts'],
  },
}

export const ADDONS = [
  { name: 'Expert strategy session', price: '$149 / session', desc: '60-minute call with a ProfitLens analyst who walks your numbers and builds a 90-day plan.' },
  { name: 'Custom report pack', price: 'from $99', desc: 'Investor-, lender- or board-ready reports built from your connected data.' },
  { name: 'Custom integration', price: 'Quoted', desc: 'Connect an industry-specific POS, ERP or in-house system.' },
]

export type Category = 'Accounting' | 'CRM' | 'Sales' | 'Advertising'

export interface Integration {
  id: string; name: string; category: Category; color: string; initials: string
  scopes: string[]; records: number; howItWorks: string
}

export const INTEGRATIONS: Integration[] = [
  { id: 'quickbooks', name: 'QuickBooks Online', category: 'Accounting', color: '#2ca01c', initials: 'QB', scopes: ['Read invoices and bills', 'Read P&L and balance sheet', 'Read vendors'], records: 3120, howItWorks: 'Reads your invoices, bills and P&L so we can see where money comes in and goes out.' },
  { id: 'xero', name: 'Xero', category: 'Accounting', color: '#13b5ea', initials: 'X', scopes: ['Read transactions', 'Read reports'], records: 2800, howItWorks: 'Same as QuickBooks: reads transactions and reports to track income, costs and cash.' },
  { id: 'hubspot', name: 'HubSpot CRM', category: 'CRM', color: '#ff7a59', initials: 'HS', scopes: ['Read contacts', 'Read deals', 'Read email engagement'], records: 4210, howItWorks: 'Reads contacts and deals to spot customers who stopped buying and leads going cold.' },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', color: '#00a1e0', initials: 'SF', scopes: ['Read accounts', 'Read opportunities'], records: 5100, howItWorks: 'Reads accounts and opportunities to measure your sales pipeline and win rate.' },
  { id: 'shopify', name: 'Shopify', category: 'Sales', color: '#95bf47', initials: 'SH', scopes: ['Read orders', 'Read products', 'Read customers'], records: 6890, howItWorks: 'Reads online orders, products and customers to find best sellers and abandoned carts.' },
  { id: 'square', name: 'Square POS', category: 'Sales', color: '#111827', initials: 'SQ', scopes: ['Read payments', 'Read items', 'Read labor shifts'], records: 9420, howItWorks: 'Reads in-store payments and staff shifts to compare sales with labor cost by hour.' },
  { id: 'stripe', name: 'Stripe', category: 'Sales', color: '#635bff', initials: 'ST', scopes: ['Read charges', 'Read subscriptions'], records: 1800, howItWorks: 'Reads charges and subscriptions to track recurring revenue, refunds and failed payments.' },
  { id: 'googleads', name: 'Google Ads', category: 'Advertising', color: '#4285f4', initials: 'GA', scopes: ['Read campaigns', 'Read spend and conversions'], records: 1240, howItWorks: 'Reads campaign spend and conversions so we can see which ads actually bring sales.' },
  { id: 'metaads', name: 'Meta Ads', category: 'Advertising', color: '#0866ff', initials: 'M', scopes: ['Read campaigns', 'Read spend and conversions'], records: 980, howItWorks: 'Reads Facebook/Instagram ad spend and results to compare cost per customer with Google.' },
]

export const DEFAULT_CONNECTED = ['quickbooks', 'square', 'shopify', 'hubspot', 'googleads']

export const BUSINESS = {
  name: 'Harbor & Pine Coffee Co.',
  industry: 'Café and retail (food and beverage)',
  locations: ['Portland: Pearl District', 'Portland: Alberta St.'],
  employees: 18,
}

export const MONTHLY = [
  { month: 'Dec', revenue: 96400, expenses: 84100 },
  { month: 'Jan', revenue: 81200, expenses: 77900 },
  { month: 'Feb', revenue: 83900, expenses: 78400 },
  { month: 'Mar', revenue: 90100, expenses: 80900 },
  { month: 'Apr', revenue: 92800, expenses: 82300 },
  { month: 'May', revenue: 97600, expenses: 85700 },
  { month: 'Jun', revenue: 101900, expenses: 89800 },
  { month: 'Jul', revenue: 104300, expenses: 93900 },
  { month: 'Aug', revenue: 102700, expenses: 94600 },
  { month: 'Sep', revenue: 98200, expenses: 92100 },
  { month: 'Oct', revenue: 99800, expenses: 94100 },
  { month: 'Nov', revenue: 100900, expenses: 94800 },
].map((m) => ({ ...m, profit: m.revenue - m.expenses }))

export const FORECAST = [
  { month: 'Nov', base: 6100, withActions: 6100 },
  { month: 'Dec', base: 8900, withActions: 11600 },
  { month: 'Jan', base: 2700, withActions: 6900 },
  { month: 'Feb', base: 3400, withActions: 7900 },
]

export const EXPENSE_BREAKDOWN = [
  { name: 'Labor', value: 33300, color: '#4f46e5' },
  { name: 'Cost of goods', value: 34300, color: '#06b6d4' },
  { name: 'Rent and utilities', value: 12400, color: '#f59e0b' },
  { name: 'Marketing', value: 5300, color: '#ec4899' },
  { name: 'Software and other', value: 9500, color: '#94a3b8' },
]

export type InsightArea = 'Marketing' | 'Expenses' | 'Customers' | 'Operations' | 'Cash flow' | 'Pricing'
export type InsightKind = 'Inefficiency' | 'Opportunity' | 'Risk'

export interface Insight {
  id: string
  title: string
  area: InsightArea
  kind: InsightKind
  impact: number
  impactLabel?: string
  confidence: number
  effort: 'Low' | 'Medium' | 'High'
  sources: string[]
  summary: string
  evidence: { label: string; value: string }[]
  why: string
  actions: string[]
  growthOnly?: boolean
}

export const INSIGHTS: Insight[] = [
  {
    id: 'labor-tue-wed', title: 'Tue/Wed afternoons are overstaffed', area: 'Operations', kind: 'Inefficiency', impact: 720, confidence: 0.88, effort: 'Low', sources: ['square'],
    summary: 'From 2 to 5pm on Tuesdays and Wednesdays, labor runs 38% of sales at Alberta St. Your target is 26%.',
    evidence: [{ label: 'Labor % of sales (Tue/Wed 2–5pm)', value: '38%' }, { label: 'Target labor %', value: '26%' }, { label: 'Avg. transactions / hr in window', value: '14' }, { label: 'Staff scheduled in window', value: '3' }],
    why: 'We matched 12 weeks of Square labor shifts against hourly transactions. Traffic in this window is consistently 40% below your daily average, but staffing stays the same.',
    actions: ['Cut one barista shift from 2–5pm on Tue/Wed at Alberta St.', 'Move the hours to the Saturday 8–11am rush, where wait times peak', 'Re-check labor % in 4 weeks (ProfitLens will alert you)'],
  },
  {
    id: 'google-broad', title: 'Google Ads "Brand – Broad" campaign is losing money', area: 'Marketing', kind: 'Inefficiency', impact: 640, confidence: 0.91, effort: 'Low', sources: ['googleads', 'shopify'],
    summary: 'This campaign spent $1,120 last month and drove $896 in attributed online orders, a 0.8x return on ad spend (ROAS).',
    evidence: [{ label: 'Spend (30 days)', value: '$1,120' }, { label: 'Attributed revenue', value: '$896' }, { label: 'ROAS', value: '0.8x' }, { label: 'Your other campaigns ROAS', value: '3.4x' }],
    why: 'We matched Google Ads click IDs to Shopify orders. Most of this campaign\'s clicks come from broad-match keywords like "coffee near me" in cities where you don\'t ship.',
    actions: ['Pause "Brand – Broad" or limit it to the Portland metro area', 'Move $600/mo to the "Subscription – Retargeting" campaign (4.1x ROAS)', 'Add negative keywords: "starbucks", "free", "jobs"'],
  },
  {
    id: 'lapsed-loyalty', title: '312 loyal customers have gone quiet', area: 'Customers', kind: 'Opportunity', impact: 1150, confidence: 0.74, effort: 'Medium', sources: ['hubspot', 'square'],
    summary: '312 customers who used to visit weekly haven\'t made a purchase in 60+ days. Win-back emails have historically brought back 22% of customers like these.',
    evidence: [{ label: 'Lapsed loyalty members', value: '312' }, { label: 'Avg. monthly spend before lapsing', value: '$46' }, { label: 'Historical win-back rate', value: '22%' }, { label: 'Last email sent to this group', value: '94 days ago' }],
    why: 'We combined Square loyalty IDs with HubSpot contacts. These customers stopped visiting around the time the Pearl District location changed its hours.',
    actions: ['Send a "We miss you" email with a free pastry with any drink (ProfitLens drafted one)', 'Create a HubSpot workflow that triggers after 45 days without a visit', 'Track redemptions under the "Win-back" tag'],
  },
  {
    id: 'dairy-creep', title: 'Dairy supplier prices are up 18% in 6 months', area: 'Expenses', kind: 'Inefficiency', impact: 410, confidence: 0.83, effort: 'Medium', sources: ['quickbooks'],
    summary: 'Bills from Valley Fresh Dairy are up 18% while volume grew only 4%. Similar cafés pay about 9% less per gallon.',
    evidence: [{ label: 'Price change per unit (6 mo)', value: '+18%' }, { label: 'Volume change', value: '+4%' }, { label: 'Monthly dairy spend', value: '$4,560' }, { label: 'Peer median cost per gallon', value: '9% lower' }],
    why: 'We pulled line items from your QuickBooks bills and normalized them per unit. The increases arrived as three small changes, so they never showed up as one large jump.',
    actions: ['Ask Valley Fresh to go back to May pricing, using the peer median as leverage', 'Get a quote from at least one other supplier (2 regional options listed)', 'Set a price-change alert on this vendor'],
  },
  {
    id: 'oat-pricing', title: 'Oat milk drinks are priced below the market', area: 'Pricing', kind: 'Opportunity', impact: 530, confidence: 0.69, effort: 'Low', sources: ['square'], growthOnly: true,
    summary: 'Oat lattes are your #2 seller but have your lowest margin. Comparable Portland cafés charge $0.40–$0.75 more.',
    evidence: [{ label: 'Oat drinks sold / month', value: '1,320' }, { label: 'Gross margin', value: '58% (menu avg 71%)' }, { label: 'Peer price premium', value: '+$0.40 to $0.75' }, { label: 'Expected volume loss at +$0.40', value: '< 3%' }],
    why: 'We combined your item-level margins with anonymized pricing from similar cafés. Price elasticity for specialty milk tends to be low.',
    actions: ['Raise the oat milk add-on by $0.40', 'Update Square item prices (one click from the Integrations page)', 'Watch weekly oat-drink volume for 3 weeks'],
  },
  {
    id: 'aging-invoices', title: '$8,420 in wholesale invoices are 45+ days overdue', area: 'Cash flow', kind: 'Risk', impact: 8420, impactLabel: 'one-time cash', confidence: 0.97, effort: 'Low', sources: ['quickbooks'],
    summary: '23 invoices from 6 wholesale accounts are past 45 days. Two accounts hold 71% of the balance.',
    evidence: [{ label: 'Overdue invoices', value: '23' }, { label: 'Total overdue', value: '$8,420' }, { label: 'Largest debtor', value: 'Northside Offices ($3,900)' }, { label: 'Avg. days to pay (wholesale)', value: '52 days' }],
    why: 'We read QuickBooks accounts receivable aging. You have no automatic reminders set up, and invoice terms are Net 30.',
    actions: ['Send the reminder sequence ProfitLens drafted (3 emails over 14 days)', 'Turn on QuickBooks automatic payment reminders', 'Offer a 2% discount for paying within 10 days on new wholesale invoices'],
  },
  {
    id: 'saas-dupes', title: 'You pay for 3 overlapping software tools', area: 'Expenses', kind: 'Inefficiency', impact: 187, confidence: 0.92, effort: 'Low', sources: ['quickbooks'],
    summary: 'Mailchimp, Square Marketing and HubSpot Starter all send customer email. Only HubSpot has been active in the last 90 days.',
    evidence: [{ label: 'Mailchimp', value: '$79/mo, last used 4 mo ago' }, { label: 'Square Marketing', value: '$108/mo, 0 campaigns in 90 days' }, { label: 'HubSpot Starter', value: '$50/mo, active' }],
    why: 'We grouped recurring charges in QuickBooks by vendor and checked the usage signals available from each connected tool.',
    actions: ['Cancel Mailchimp and Square Marketing', 'Export Mailchimp contacts into HubSpot first'],
  },
  {
    id: 'cart-abandon', title: 'Online cart abandonment is 74%', area: 'Marketing', kind: 'Opportunity', impact: 380, confidence: 0.66, effort: 'Medium', sources: ['shopify', 'hubspot'], growthOnly: true,
    summary: 'About 410 Shopify carts a month are abandoned, and you have no recovery emails set up. Stores like yours recover 8–12% of them.',
    evidence: [{ label: 'Abandoned carts / month', value: '~410' }, { label: 'Avg. cart value', value: '$38' }, { label: 'Recovery flow active', value: 'No' }],
    why: 'Shopify checkout events show abandoned carts, and HubSpot shows no automation tied to them.',
    actions: ['Turn on Shopify\'s abandoned-checkout email (1 hour and 24 hours after)', 'Add a free-shipping threshold of $35'],
  },
]

export const BENCHMARKS = [
  { metric: 'Gross margin', you: 66, peer: 68, unit: '%', higherBetter: true, percentile: 41 },
  { metric: 'Labor as % of revenue', you: 33, peer: 30, unit: '%', higherBetter: false, percentile: 34 },
  { metric: 'Net profit margin', you: 6.0, peer: 7.8, unit: '%', higherBetter: true, percentile: 38 },
  { metric: 'Marketing ROAS', you: 2.1, peer: 2.9, unit: 'x', higherBetter: true, percentile: 30 },
  { metric: 'Repeat customer rate', you: 58, peer: 49, unit: '%', higherBetter: true, percentile: 78 },
  { metric: 'Avg. ticket size', you: 11.4, peer: 9.9, unit: '$', higherBetter: true, percentile: 81 },
  { metric: 'Days sales outstanding (wholesale)', you: 52, peer: 34, unit: ' days', higherBetter: false, percentile: 22 },
]

export const ASSISTANT_SUGGESTIONS = [
  'Why did profit drop in September?',
  'Which location is more profitable?',
  'What should I do first this week?',
  'How much am I spending on ads?',
]

export function assistantAnswer(q: string): string {
  const s = q.toLowerCase()
  if (s.includes('september') || s.includes('drop') || s.includes('profit')) return 'Profit fell from $8,100 in August to $6,100 in September. Three things drove it: (1) revenue dropped $4,500 when the summer cold-brew season ended, (2) dairy costs went up again (+$310), and (3) labor hours stayed at summer levels even with less traffic. Two of these have open recommendations: "Tue/Wed afternoons are overstaffed" and "Dairy supplier prices are up 18%". Together they would recover about $1,130/month.'
  if (s.includes('location') || s.includes('alberta') || s.includes('pearl')) return 'Pearl District earns more: an 8.1% net margin on $58.2k monthly revenue, compared with 3.4% on $42.7k at Alberta St. The gap is mostly labor, which is 37% of sales at Alberta vs. 30% at Pearl. Fixing Alberta\'s afternoon scheduling would close about 40% of that gap.'
  if (s.includes('first') || s.includes('week') || s.includes('start')) return 'Start with the three highest-impact, lowest-effort actions: (1) send the overdue-invoice reminders to bring in $8,420 of cash, (2) pause the Google "Brand – Broad" campaign to save $640/mo, and (3) trim the Tue/Wed afternoon shifts to save $720/mo. All three take less than an hour combined.'
  if (s.includes('ad') || s.includes('marketing') || s.includes('google') || s.includes('meta')) return 'You spent $5,300 on marketing last month: $3,050 on Google Ads, $1,450 on Meta Ads, and about $800 on tools. Blended ROAS is 2.1x, below the 2.9x peer median. Most of the gap comes from one campaign ("Brand – Broad", 0.8x).'
  if (s.includes('cash') || s.includes('runway')) return 'You have $41,200 in the bank. Average monthly burn in your slow months (Jan/Feb) is about $3,000, so your cash position is healthy. Collecting the $8,420 in overdue wholesale invoices would add about 2.5 weeks of operating expenses to your buffer.'
  return 'Here\'s what I found in your connected data: revenue is $100.9k this month (+1.1% MoM), net profit is $6.1k (6.0% margin), and there are 8 open recommendations worth about $4,000/month in combined impact. Try asking about a specific location, expense, campaign or month.'
}

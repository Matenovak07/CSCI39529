// API connection placeholders for each integration.
// The prototype runs in DEMO_MODE: no requests are made and every number in the app is example data.
// In production, keys and OAuth tokens would live on a backend server (never in the browser bundle);
// the browser would call our backend, and the backend would call each provider with the stored key.

export const DEMO_MODE = true

export type AuthType = 'oauth' | 'api_key'

export interface ApiConfig {
  authType: AuthType
  keyLabel: string
  keyPlaceholder: string
  envVar: string
  baseUrl: string
  docs: string
}

export const API_CONFIG: Record<string, ApiConfig> = {
  quickbooks: { authType: 'oauth', keyLabel: 'OAuth access token', keyPlaceholder: 'YOUR_QUICKBOOKS_ACCESS_TOKEN', envVar: 'QUICKBOOKS_ACCESS_TOKEN', baseUrl: 'https://quickbooks.api.intuit.com/v3/company/{realmId}', docs: 'https://developer.intuit.com/app/developer/qbo/docs/get-started' },
  xero: { authType: 'oauth', keyLabel: 'OAuth access token', keyPlaceholder: 'YOUR_XERO_ACCESS_TOKEN', envVar: 'XERO_ACCESS_TOKEN', baseUrl: 'https://api.xero.com/api.xro/2.0', docs: 'https://developer.xero.com/documentation/' },
  hubspot: { authType: 'api_key', keyLabel: 'Private app access token', keyPlaceholder: 'YOUR_HUBSPOT_PRIVATE_APP_TOKEN', envVar: 'HUBSPOT_ACCESS_TOKEN', baseUrl: 'https://api.hubapi.com/crm/v3', docs: 'https://developers.hubspot.com/docs/api/private-apps' },
  salesforce: { authType: 'oauth', keyLabel: 'OAuth access token', keyPlaceholder: 'YOUR_SALESFORCE_ACCESS_TOKEN', envVar: 'SALESFORCE_ACCESS_TOKEN', baseUrl: 'https://{your-instance}.my.salesforce.com/services/data/v60.0', docs: 'https://developer.salesforce.com/docs/apis' },
  shopify: { authType: 'api_key', keyLabel: 'Admin API access token', keyPlaceholder: 'YOUR_SHOPIFY_ADMIN_API_TOKEN', envVar: 'SHOPIFY_ADMIN_TOKEN', baseUrl: 'https://{your-store}.myshopify.com/admin/api/2024-10', docs: 'https://shopify.dev/docs/api/admin-rest' },
  square: { authType: 'api_key', keyLabel: 'Access token', keyPlaceholder: 'YOUR_SQUARE_ACCESS_TOKEN', envVar: 'SQUARE_ACCESS_TOKEN', baseUrl: 'https://connect.squareup.com/v2', docs: 'https://developer.squareup.com/docs' },
  stripe: { authType: 'api_key', keyLabel: 'Restricted API key (read-only)', keyPlaceholder: 'rk_live_YOUR_STRIPE_RESTRICTED_KEY', envVar: 'STRIPE_RESTRICTED_KEY', baseUrl: 'https://api.stripe.com/v1', docs: 'https://docs.stripe.com/keys' },
  googleads: { authType: 'oauth', keyLabel: 'Developer token + OAuth token', keyPlaceholder: 'YOUR_GOOGLE_ADS_DEVELOPER_TOKEN', envVar: 'GOOGLE_ADS_DEVELOPER_TOKEN', baseUrl: 'https://googleads.googleapis.com/v17', docs: 'https://developers.google.com/google-ads/api/docs/start' },
  metaads: { authType: 'oauth', keyLabel: 'Marketing API access token', keyPlaceholder: 'YOUR_META_ACCESS_TOKEN', envVar: 'META_ACCESS_TOKEN', baseUrl: 'https://graph.facebook.com/v21.0', docs: 'https://developers.facebook.com/docs/marketing-apis' },
}

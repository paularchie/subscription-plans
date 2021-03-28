export enum BillingPeriods {
  Monthly = 'monthly',
  Yearly = 'yearly'
}

export enum ActionTypes {
  InitialiseState = 'initialise state',
  UpdatePlans = 'update plans',
  UpdateBillingPeriod = 'update billing period',
  UpdateCurrency = 'update currency'
}
export const currencySymbolMapping = {
  'GBP': '\u00A3',
  'EUR': '\u20AC',
  'USD': '\u0024'
}

export const flagImageMaping = {
  gb: 'https://flagcdn.com/w40/gb.png',
  fr: 'https://flagcdn.com/w40/fr.png',
  de: 'https://flagcdn.com/w40/de.png',
  us: 'https://flagcdn.com/w40/us.png',
  jp: 'https://flagcdn.com/w40/jp.png'
}
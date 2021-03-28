import { ActionTypes, BillingPeriods } from "./constants"

export type SubscriptionPlan = {
  id: string;
  code: string;
  name: string;
  monthlyCost: number;
  annualCost: number;
  appliedCost: number;
}

export type SubscriptionState = {
  availablePlans: SubscriptionPlan[];
  selectedPlanCodes?: string[];
  billingPeriod: BillingPeriods;
  currencyCode: string;
}

export type SubscriptionPlanAction = {
  type: ActionTypes;
  payload: any;
}
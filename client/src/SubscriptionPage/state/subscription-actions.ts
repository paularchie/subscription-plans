import { ActionTypes, BillingPeriods } from "../constants"
import { SubscriptionPlan, SubscriptionPlanAction } from "../models"

export const initialiseStateAction = (
  plans: SubscriptionPlan[],
  rates: { [key: string]: number }
): SubscriptionPlanAction => {
  return {
    type: ActionTypes.InitialiseState,
    payload: { plans, rates }
  }
}

export const updatePlanAction = (
  plans: SubscriptionPlan[],
  rates: { [key: string]: number },
  add: boolean,
  selectedPlan: string
): SubscriptionPlanAction => {
  return {
    type: ActionTypes.UpdatePlans,
    payload: { plans, rates, add, selectedPlan }
  }
}

export const updateBillingPeriodAction = (
  plans: SubscriptionPlan[],
  rates: { [key: string]: number },
  billingPeriod: BillingPeriods
): SubscriptionPlanAction => {
  return {
    type: ActionTypes.UpdateBillingPeriod,
    payload: { plans, rates, billingPeriod }
  }
}

export const updateCurrencyAction = (
  plans: SubscriptionPlan[],
  rates: { [key: string]: number },
  currency: string
): SubscriptionPlanAction => {
  return {
    type: ActionTypes.UpdateCurrency,
    payload: { plans, rates, currency }
  }
}
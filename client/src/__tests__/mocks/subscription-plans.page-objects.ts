import { BillingPeriods } from "../../SubscriptionPage/constants";

export const getPageContainer = (): HTMLElement => {
  return document.querySelector('#subscription-test-container');
}

export const getPageHeader = (): HTMLElement => {
  return document.querySelector('h1');
}

export const getRegions = (): NodeListOf<HTMLLIElement> => {
  return document.querySelectorAll('#subscription-region li')
}

export const getMonthlyBillingPeriodInput = (): HTMLInputElement => {
  return document.querySelector(`input[name="billing"]input[value="${BillingPeriods.Monthly}"]`);
}

export const getYearlyBillingPeriodInput = (): HTMLInputElement => {
  return document.querySelector(`input[name="billing"]input[value="${BillingPeriods.Yearly}"]`);
}

export const getCurrencySelector = (): HTMLSelectElement => {
  return document.querySelector('select[name="currency"]');
}

export const getPlanTotal = (): HTMLElement => {
  return document.querySelector('#plan-total');
}

export const getSubscriptionRegionInput = (planName: string): HTMLInputElement => {
  return document.querySelector('#subscription-region').querySelector(`input[name=${planName}]`);
}
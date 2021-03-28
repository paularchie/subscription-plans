import { ActionTypes, BillingPeriods } from "../constants";
import { SubscriptionPlan, SubscriptionPlanAction, SubscriptionState } from "../models";


export const initialState: SubscriptionState = {
  availablePlans: [],
  selectedPlanCodes: [],
  billingPeriod: BillingPeriods.Yearly,
  currencyCode: 'GBP'
}

export const subscriptionReducer = (state: SubscriptionState, action: SubscriptionPlanAction): SubscriptionState => {

  const { payload } = action;
  const { plans, rates } = payload;

  const actionHandlers = {
    [ActionTypes.InitialiseState]: initialiseState,
    [ActionTypes.UpdatePlans]: updatePlans,
    [ActionTypes.UpdateBillingPeriod]: updateBillingPeriod,
    [ActionTypes.UpdateCurrency]: updateCurrency,
  }

  return actionHandlers[action.type] ? actionHandlers[action.type]() : state;


  function initialiseState(): SubscriptionState {
    return {
      ...state,
      availablePlans: plans.map((plan: SubscriptionPlan): SubscriptionPlan => {
        return {
          ...plan,
          appliedCost: getConvertedPlanCost(plan.code, state.billingPeriod, state.currencyCode)
        }
      })
    };
  }

  function updatePlans(): SubscriptionState {
    const { add, selectedPlan } = payload;
    const updatedPlanCodes = new Set(state.selectedPlanCodes);
    const action = add ? 'add' : 'delete';
    updatedPlanCodes[action](selectedPlan);

    return {
      ...state,
      selectedPlanCodes: Array.from(updatedPlanCodes),
    };
  }

  function updateBillingPeriod(): SubscriptionState {
    const availablePlans = state.availablePlans.map((plan: SubscriptionPlan): SubscriptionPlan => {
      return {
        ...plan,
        appliedCost: getConvertedPlanCost(plan.code, payload.billingPeriod, state.currencyCode)
      }
    });

    return {
      ...state,
      billingPeriod: payload.billingPeriod,
      availablePlans
    };
  }

  function updateCurrency(): SubscriptionState {
    const availablePlans = state.availablePlans.map((plan: SubscriptionPlan): SubscriptionPlan => {
      return {
        ...plan,
        appliedCost: getConvertedPlanCost(plan.code, state.billingPeriod, payload.currency)
      }
    });
    return {
      ...state,
      currencyCode: payload.currency,
      availablePlans
    };
  }

  function getConvertedPlanCost(planCode: string, billingPeriod: BillingPeriods, currencyCode: string): number {
    const planData: SubscriptionPlan = plans.find((plan: SubscriptionPlan) => plan.code === planCode);
    const costPerPeriod = billingPeriod === BillingPeriods.Monthly ? planData.monthlyCost: planData.annualCost;
    const currencyRate = rates[currencyCode];

    return Math.floor(costPerPeriod * currencyRate);
  }
}
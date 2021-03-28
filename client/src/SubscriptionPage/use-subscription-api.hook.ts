import { SubscriptionPlan } from "./models";
import useRequest from "../common/hooks/use-request";

const useSubscriptionApi = () => {
  const { doRequest, errors } = useRequest();

  const getSubscriptionPlans = (): Promise<SubscriptionPlan[]> => {
    return doRequest({
      url: '/api/subscription-plans',
      method: 'get'
    });
  }

  const getCurrencyRates = async (): Promise<{ rates: { [key: string]: number } }> => {
    const response = await doRequest({
      url: 'https://api.exchangeratesapi.io/latest?base=GBP&symbols=GBP,EUR,USD,JPY',
      method: 'get'
    });
    return response.rates;
  }

  return {
    getSubscriptionPlans,
    getCurrencyRates,
    errors
  }
}

export default useSubscriptionApi;
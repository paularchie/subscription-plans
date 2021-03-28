import React, { useEffect, useReducer, useState } from 'react';
import useSubscriptionApi from './use-subscription-api.hook';
import { initialiseStateAction, updateBillingPeriodAction, updateCurrencyAction, updatePlanAction } from './state/subscription-actions';
import { subscriptionReducer, initialState } from './state/subscription-reducer';
import { BillingPeriods, currencySymbolMapping, flagImageMaping } from './constants';
import { SubscriptionPlan } from './models';
import '@babel/polyfill';
import './SubscriptionPage.scss';
import './utils.scss';

const SubscriptionPage = (): JSX.Element => {

    const [subscriptionPlans, setSubscrptionPlans] = useState<SubscriptionPlan[]>([]);
    const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>({});
    const [state, dispatch] = useReducer(subscriptionReducer, initialState);
    const { getSubscriptionPlans, getCurrencyRates, errors } = useSubscriptionApi();


    useEffect(() => {
        initialise();
    }, []);

    useEffect(() => {
        errors && console.error(errors);
    }, [errors]);


    const initialise = async (): Promise<void> => {
        const [plans, rates] = await Promise.all([getSubscriptionPlans(), getCurrencyRates()]);
        initialiseState(plans, rates);
    }

    const initialiseState = (plans, rates): void => {
        setSubscrptionPlans(plans);
        setCurrencyRates(rates);
        dispatch(initialiseStateAction(plans, rates))
    }

    const handlePlanChange = ({ target: { checked, value } }): void => {
        dispatchAction(updatePlanAction, checked, value)
    }

    const handleBillingPeriodChange = ({ target }): void => {
        dispatchAction(updateBillingPeriodAction, target.value)
    }

    const handleCurrencyChange = ({ target }): void => {
        dispatchAction(updateCurrencyAction, target.value)
    }

    const dispatchAction = (action, ...args): void => {
        dispatch(action(subscriptionPlans, currencyRates, ...args));
    }

    const getTotalCost = (): number => {
        const selectedPlansData = state.availablePlans.filter(
            (plan: SubscriptionPlan) => state.selectedPlanCodes.includes(plan.code));

        return selectedPlansData.reduce((acc: number, curr: SubscriptionPlan) => (acc + curr.appliedCost), 0)
    }

    const getPlanDisplayText = (plan: SubscriptionPlan): string => {
        return `(${getCurrencySymbol(state.currencyCode)}${plan.appliedCost}${getBillingPeriodDisplayText()})`;
    }

    const getTotalCostDisplayText = (): string => {
        return getCurrencySymbol(state.currencyCode) + getTotalCost() + getBillingPeriodDisplayText();
    }

    const getBillingPeriodDisplayText = (): string => {
        return state.billingPeriod === BillingPeriods.Monthly ? '/month' : '/year';
    }

    const getCurrencySymbol = (currencyCode: string): string => {
        return currencySymbolMapping[currencyCode];
    }

    const getCurrencyCodes = (): string[] => {
        return Object.keys(currencySymbolMapping)
    }

    return (
        <div className="subscription-page-container flex column align-center" id="subscription-test-container">
            <h1 className="mb-8">Choose your subscription plan</h1>

            <main className="flex">
                <section className="flex column flex-1 justify-space-between">
                    <div>
                        <h2>Select region</h2>
                        <ul className="flex column" id="subscription-region">
                            {state.availablePlans.map((plan: SubscriptionPlan) => (
                                <li className="flex align-center mb-2" key={plan.code}>
                                    <img src={flagImageMaping[plan.code]} width="24px" height="14px" className="mr-1" />
                                    <input
                                        type="checkbox"
                                        id={plan.name}
                                        className="mr-2"
                                        name={plan.name}
                                        value={plan.code}
                                        onChange={handlePlanChange}
                                    />
                                    <label htmlFor={plan.name}>{plan.name}&nbsp;</label>
                                    <span>
                                        {getPlanDisplayText(plan)}&nbsp;
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="mr-1 mb-2 text-bold">Currency:</p>
                        <select name="currency" id="currency" onChange={handleCurrencyChange}>
                            {getCurrencyCodes().map((currencyCode: string) => (
                                <option key={currencyCode} value={currencyCode}>
                                    {`${currencyCode} (${getCurrencySymbol(currencyCode)})`}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                <section className="flex column align-center flex-1">
                    <h2>Choose billing period</h2>
                    <div>
                        {Object.values(BillingPeriods).map((billingPeriod: BillingPeriods, index: number) => (
                            <React.Fragment key={billingPeriod}>
                                <input
                                    type="radio"
                                    id={billingPeriod}
                                    name="billing"
                                    value={billingPeriod}
                                    onChange={handleBillingPeriodChange}
                                    checked={billingPeriod === state.billingPeriod}
                                    className="mr-1"
                                />
                                <label htmlFor={billingPeriod} className="mr-2">{Object.keys(BillingPeriods)[index]}</label>
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                <section className="flex column justify-space-between flex-1">
                    <div className="flex justify-end">
                        <div>
                            <h2>Your plan summary</h2>
                            <div>
                                {state.selectedPlanCodes.length
                                    ? <ul className="flex column align-center">
                                        {state.selectedPlanCodes.map((planCode: string) => {
                                            const plan: SubscriptionPlan = state.availablePlans.find(plan => plan.code === planCode);
                                            return (
                                                <li className="flex mb-2" key={planCode}>
                                                    <div>{plan.name}&nbsp;</div>
                                                    <div>{getPlanDisplayText(plan)}</div>
                                                </li>

                                            )
                                        })}
                                    </ul>
                                    : <div className="text-center">You have no plans selected</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end text-bold">
                        <div id="plan-total">
                            <p className="mb-2">Total:</p>
                            {getTotalCostDisplayText()}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default SubscriptionPage;

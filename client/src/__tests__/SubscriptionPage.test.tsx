
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import SubscriptionPage from '../SubscriptionPage/SubscriptionPage';
import axios from 'axios';
import { mockRatesResponse, mockSubscriptionDataResponse } from './mocks/subscription-plans.mock';
import { getCurrencySelector, getMonthlyBillingPeriodInput, getPageContainer, getPageHeader, getPlanTotal, getRegions, getSubscriptionRegionInput, getYearlyBillingPeriodInput } from './mocks/subscription-plans.page-objects';


jest.mock('axios');

const axiosMock = axios as any;

beforeEach(() => {
    axiosMock.get.mockImplementationOnce(() => {
        return Promise.resolve({ data: mockSubscriptionDataResponse })
    });
    axiosMock.get.mockImplementationOnce(() => {
        return Promise.resolve({ data: { rates: mockRatesResponse } })
    });
});


test('should render', async () => {
    await renderComponent()
    expect(getPageContainer()).toBeDefined();
});

test('should contain main header', async () => {
    await renderComponent();
    expect(getPageHeader().textContent).toEqual('Choose your subscription plan');
});

test('should render the regions retrieved from the server on an initial page load', async () => {
    await renderComponent();
    const regions = getRegions();

    expect(regions.length).toEqual(mockSubscriptionDataResponse.length);

    regions.forEach((region: HTMLLIElement, index: number) => {
        const plan = mockSubscriptionDataResponse[index];
        expect(region.textContent).toContain(plan.name);
        expect(region.textContent).toContain(plan.annualCost);
        expect(region.textContent).toContain('year');
    });
});

test('shoule pre-select the "Yearly" billing period on an initial page load', async () => {
    await renderComponent();

    expect(getMonthlyBillingPeriodInput().checked).toBe(false);
    expect(getYearlyBillingPeriodInput().checked).toBe(true);
});

test('should correctly calculate and display the total for the selected plan options', async () => {
    await renderComponent();
    const currencyCode = 'USD';

    // choose monthly billing period
    fireEvent.click(getMonthlyBillingPeriodInput());

    // select USD as currency
    fireEvent.change(getCurrencySelector(), { target: { value: currencyCode } });

    // get GBP/USD exchange rate from the mock response 
    const currencyRate = mockRatesResponse[currencyCode];

    // select a few regions and calculate their total based on the specified billing period and currency rate
    const regionIndex = [1, 3, 4];
    let total = 0;
    regionIndex.forEach(index => {
        const plan = mockSubscriptionDataResponse[index];
        fireEvent.click(getSubscriptionRegionInput(plan.name));
        total += Math.floor(plan.monthlyCost * currencyRate);
    });

    expect(getPlanTotal().textContent).toContain(`$${total}/month`);
});


async function renderComponent() {
    let wrapper;
    await act(async () => {
        wrapper = await render(<SubscriptionPage />);
    });
    return wrapper;
}


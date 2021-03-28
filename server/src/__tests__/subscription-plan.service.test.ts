import sinon from 'sinon';
import * as typeorm from 'typeorm';
import { mockSubscriptionPlanData } from './mocks/subscription-plan-data.mock';
import { getSubscriptionPlans } from '../services/subscription-plan.service';

const sandbox = sinon.createSandbox();

describe('getSubscriptionPlans service', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should return subscription plan data retrieved from the repository', async () => {
    sandbox
    .stub(typeorm, 'getRepository')
    .returns({ find: () => Promise.resolve(mockSubscriptionPlanData) });

    const subscriptionPlans = await getSubscriptionPlans();

    expect(subscriptionPlans).toEqual(mockSubscriptionPlanData);
  });
})

import request from 'supertest';
import { app } from '../app';
import { getSubscriptionPlans } from '../services/subscription-plan.service';
import { mockSubscriptionPlanData } from './mocks/subscription-plan-data.mock';

jest.mock('../services/subscription-plan.service');

const getSubscriptionPlansMock = getSubscriptionPlans as jest.Mock;


describe('subscription-plans controller', () => {

  it('should return 200 with available subscription plans data', async () => {
    getSubscriptionPlansMock.mockImplementation(() =>
      Promise.resolve(mockSubscriptionPlanData)
    );

    const response = await request(app)
      .get('/subscription-plans')
      .expect(200);

    expect(response.body).toEqual(mockSubscriptionPlanData);
  });
});

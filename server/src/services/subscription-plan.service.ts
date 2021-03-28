import { getRepository } from 'typeorm';
import { SubscriptionPlanEntity } from '../common/entities/SubscriptionPlan.entity';

export const getSubscriptionPlans = async (): Promise<any> => {
  return await getRepository(SubscriptionPlanEntity).find();
};

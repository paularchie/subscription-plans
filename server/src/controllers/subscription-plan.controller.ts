import { Request, Response } from 'express';
import { getSubscriptionPlans } from '../services/subscription-plan.service';

export const subscriptionPlansController = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send(await getSubscriptionPlans());
};

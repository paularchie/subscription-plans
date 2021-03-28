import express from 'express';
import { subscriptionPlansController } from './controllers/subscription-plan.controller';

const router = express.Router();

router.get('/subscription-plans', subscriptionPlansController);


export { router as subscriptionsRouter };
import { getRepository } from "typeorm";
import { SubscriptionPlanEntity } from "./common/entities/SubscriptionPlan.entity";

const subscriptionData = [
  {
    code: 'gb',
    name: 'UK',
    monthlyCost: 10,
    annualCost: 50
  },
  {
    code: 'fr',
    name: 'France',
    monthlyCost: 10,
    annualCost: 60
  },
  {
    code: 'de',
    name: 'Germany',
    monthlyCost: 15,
    annualCost: 75
  },
  {
    code: 'us',
    name: 'USA',
    monthlyCost: 25,
    annualCost: 150
  },
  {
    code: 'jp',
    name: 'Japan',
    monthlyCost: 15,
    annualCost: 65
  }
];

export const populateDb = async () => {
  // drop all entities
  const entities = await getRepository(SubscriptionPlanEntity).find();
  await getRepository(SubscriptionPlanEntity).remove(entities);

  const subscriptionPlanEntities: SubscriptionPlanEntity[] = subscriptionData.map(item => {
      const entity = new SubscriptionPlanEntity();
      entity.code = item.code;
      entity.name = item.name;
      entity.monthlyCost = item.monthlyCost;
      entity.annualCost = item.annualCost;
      return entity;
  });

  await getRepository(SubscriptionPlanEntity).save(subscriptionPlanEntities);
}
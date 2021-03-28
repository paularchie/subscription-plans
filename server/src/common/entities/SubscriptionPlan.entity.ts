import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
} from 'typeorm';

@Entity()
export class SubscriptionPlanEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  monthlyCost: number;

  @Column()
  annualCost: number;
}

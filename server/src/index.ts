import { createConnection, ConnectionOptions } from 'typeorm';
import { populateDb } from './populate-repository.utils';
import { SubscriptionPlanEntity } from './common/entities/SubscriptionPlan.entity';
import { app } from './app';

const connectionOptions: ConnectionOptions = {
    type: 'mongodb',
    url: 'mongodb://mongo' /*process.env.MONGO_URI*/,
    port: 27017,
    migrationsRun: true,
    synchronize: true,
    logging: false,
    useUnifiedTopology: true,
    entities: [SubscriptionPlanEntity],
};

const start = async () => {
    try {
        await createConnection(connectionOptions);
        populateDb();
    } catch (err) {
        console.error(err);
    }

    const PORT = process.env.PORT || 5000;

    app.listen({ port: PORT }, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
}

start();

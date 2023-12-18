export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: process.env.APP_NAME,
    PORT: Number(process.env.PORT),
    DATABASE: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        type: process.env.DATABASE_TYPE,
        synchronize: process.env.DATABASE_SYNC,
        autoLoadEntities: process.env.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
    RABBITMQ: {
        uri: envs.RABBITMQ_URI,
        connectionInitOptions: {
            wait: envs.RABBITMQ_CONNECTION_WAIT,
        },
        exchanges: [
            {
                name: envs.RABBITMQ_EXCHANGE,
                type: envs.RABBITMQ_EXCHANGE_TYPE,
            },
        ],
    },
});
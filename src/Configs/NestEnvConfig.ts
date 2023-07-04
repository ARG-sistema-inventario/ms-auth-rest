export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
    APP_NAME: process.env.APP_NAME,
    PORT: Number(process.env.PORT),
    DATABASE: {
        host: envs.DATABASE_HOST,
        port: Number(envs.DATABASE_PORT),
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASSWORD,
        database: envs.DATABASE_DB,
        type: envs.DATABASE_TYPE,
        synchronize: false,
        autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
        keepConnectionAlive: true,
    },
});
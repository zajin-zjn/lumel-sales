import { Configuration } from '../interfaces/config.interface';

export default (): Configuration => ({
  env: (process.env.ENV as string) || 'local',
  port: Number(process.env.PORT) || 3200,
  database: {
    type: process.env.DATABASE_TYPE as string,
    host: process.env.DATABASE_HOST as string,
    name: process.env.DATABASE_NAME as string,
    port: Number(process.env.DATABASE_PORT) || 5432,
    password: process.env.DATABASE_PASSWORD as string,
    username: process.env.DATABASE_USERNAME as string,
  },
});

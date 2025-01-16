export interface Configuration {
  port: number;
  env: string;

  database: {
    type: string;
    host: string;
    name: string;
    port: number;
    password: string;
    username: string;
  };
}

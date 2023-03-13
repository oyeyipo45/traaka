import dotenv from 'dotenv';
dotenv.config();

export type configType = {
  API_KEY: string | undefined;
  PORT: string | undefined;
};

export const config: configType = {
  API_KEY: process.env.API_KEY,
  PORT: process.env.PORT,
};

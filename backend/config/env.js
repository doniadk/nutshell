import { config } from "dotenv";

// config({path: '.env'}); if it was just one .env file

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

// selecting the variables to export from .env
export const { PORT, NODE_ENV, DB_URL, API_KEY } = process.env;

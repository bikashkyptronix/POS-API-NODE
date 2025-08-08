import { config } from "dotenv";
config();

export const envs = {
  env: process.env.NODE_ENV || "dev",
  port: Number(process.env.NODE_PORT) || 4000,
  mongodb_uri: process.env.MONGODB_URI,
  apiKey: process.env.API_KEY || "",
  passwordSalt: Number(process.env.PASSWORD_SALT_ROUND) || 12,
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET || "",
      expiry: Number(process.env.ACCESS_TOKEN_EXPIRED) || 3600,
    },
  },
  smtp: {
    email: process.env.SMTP_AUTH_EMAIL,
    password: process.env.SMTP_AUTH_PASSWORD,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE == "no" ? false : true,
    fromEmail: process.env.SMTP_FROM_EMAIL,
  },
  maxFileUploadSize: process.env.maxFileUploadSize || 20,
  siteUrl: process.env.siteUrl || "",
  adminSiteUrl: process.env.adminSiteUrl || "",
  PROJECT_NAME: process.env.PROJECT_NAME || "",
  DEFAULT_PAGE_LIMIT: process.env.DEFAULT_PAGE_LIMIT || 10,
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || "",
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || "",
};

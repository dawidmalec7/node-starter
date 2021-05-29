import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  db: {
    url: process.env.DATABASE_URL,
    user: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
  },
};

export default config;

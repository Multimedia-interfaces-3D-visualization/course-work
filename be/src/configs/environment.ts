import Dotenv from "dotenv";

Dotenv.config();

const required_envs = [
    "DB_URL", "PORT", "JWT_SECRET"
];

for (const env of required_envs) {
    if (!process.env[env]) {
        throw new Error(`There is no '${env}' env variable, which is required`);
    }
}

export const DB_URL = process.env.DB_URL!;
export const PORT = process.env.PORT!;
export const JWT_SECRET = process.env.JWT_SECRET!;

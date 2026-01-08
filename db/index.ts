import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";

config({ path: ".env" }); // or .env.local

// Use a properly formatted placeholder for build time
const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/dbname';

const sql = neon(databaseUrl);
export const db = drizzle({ client: sql, schema });

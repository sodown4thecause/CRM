import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Configure Neon for edge runtime
neonConfig.fetchConnectionCache = true;

// Allow build to succeed without DATABASE_URL (it will be set in production)
const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/dbname';

// Create Neon connection
const sql = neon(databaseUrl);

// Create Drizzle instance
export const db = drizzle(sql);

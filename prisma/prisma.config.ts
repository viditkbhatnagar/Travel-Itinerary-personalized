import path from 'node:path';
import { defineConfig } from 'prisma/config';

// Load .env manually since dotenv/config may not resolve from prisma/
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '..', '.env') });

export default defineConfig({
  schema: path.join(__dirname, 'schema.prisma'),
  datasource: {
    url: process.env.DIRECT_DATABASE_URL!,
  },
});

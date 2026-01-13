import { drizzle } from "drizzle-orm/node-postgres";

export function dbInit(url: string) {
  const db = drizzle(url);
  return db;
}

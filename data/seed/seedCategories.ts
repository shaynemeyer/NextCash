import { categoriesTable } from "@/db/schema";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { categoriesSeed } from "./categoriesSeedData";

config({ path: ".env.local" });

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding categories");
  await db.insert(categoriesTable).values(categoriesSeed);
}

main();

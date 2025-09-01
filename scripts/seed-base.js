// scripts/seed-base.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { kv, baseKey } from "../lib/kv.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// خواندن metadata.json
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/metadata.json"), "utf-8"));

(async () => {
  for (const item of data) {
    await kv.set(baseKey(item.edition), {
      name: item.name,
      description: item.description || "",
      image: item.image,
      attributes: item.attributes
    });
    console.log("Seeded base for edition", item.edition);
  }
  console.log("✅ All metadata seeded successfully!");
})();

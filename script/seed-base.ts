import fs from "fs";
import path from "path";
import { kv, baseKey } from "../lib/kv";

interface BaseItem {
  edition: number;
  name: string;
  description?: string;
  image: string;
  attributes: any[];
}

const data: BaseItem[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/metadata.json"), "utf-8")
);

(async () => {
  for (const item of data) {
    await kv.set(baseKey(item.edition), {
      name: item.name,
      description: item.description || "",
      image: item.image,
      attributes: item.attributes,
    });
    console.log("Seeded base for edition", item.edition);
  }
  console.log("✅ All metadata seeded successfully!");
})();

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface DynData {
  xp: number;
  level: number;
}

// مسیر فایل‌ها
const metadataPath = path.join(process.cwd(), "data", "metadata.json");
const dynPath = path.join(process.cwd(), "data", "dyn.json");

// خواندن کل metadata فقط یک بار
const allMetadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));

// خواندن dyn.json
let dynData: Record<string, DynData> = {};
try {
  dynData = JSON.parse(fs.readFileSync(dynPath, "utf-8"));
} catch {
  dynData = {};
}

export async function GET(_req: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);

  if (isNaN(id) || id < 0 || id >= allMetadata.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const item = allMetadata[id];
  const dyn: DynData = dynData[id] || { xp: 0, level: 0 };

  const metadata = {
    name: `Bobo #${id + 1}`,
    description: item.description || "",
    image: item.image,
    attributes: [
      ...item.attributes,
      { trait_type: "XP", value: dyn.xp },
      { trait_type: "Level", value: dyn.level }
    ]
  };

  return NextResponse.json(metadata);
}

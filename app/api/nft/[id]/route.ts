import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { buildOpenSeaJson } from "@/lib/metadata";

interface DynData {
  xp: number;
  level: number;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const tokenId = parseInt(id, 10); // TokenID مثل 0, 1, 2...

  const metadataPath = path.join(process.cwd(), "data", "metadata.json");
  const dynPath = path.join(process.cwd(), "data", "dyn.json");

  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  let dynData: Record<string, DynData> = {};

  try {
    dynData = JSON.parse(fs.readFileSync(dynPath, "utf-8"));
  } catch {
    dynData = {};
  }

  // ❌ قبلاً بر اساس edition پیدا می‌کردیم
  // ✅ حالا مستقیم با ایندکس آرایه
  const item = metadata[tokenId];
  if (!item) {
    return new NextResponse(
      JSON.stringify({ error: "Not found" }, null, 2),
      {
        status: 404,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  const dyn: DynData = dynData[tokenId] || { xp: 0, level: 0 };

  // 🪄 اسم رو تغییر می‌دیم که از 1 شروع بشه
  const responseData = buildOpenSeaJson(
    {
      ...item,
      name: `Bobo #${tokenId + 1}`, // یعنی tokenId=0 → Bobo #1
    },
    dyn
  );

  return new NextResponse(JSON.stringify(responseData, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
import { NextResponse } from "next/server";
import { kv, baseKey, dynKey } from "@/lib/kv";
import { buildOpenSeaJson } from "@/lib/metadata";

interface DynData {
  xp: number;
  level: number;
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const base = await kv.get(baseKey(id));
  if (!base)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const dyn: DynData = (await kv.get(dynKey(id))) || { xp: 0, level: 0 };
  const url = process.env.COLLECTION_EXTERNAL_URL
    ? `${process.env.COLLECTION_EXTERNAL_URL}/api/nft/${id}`
    : undefined;

  const json = buildOpenSeaJson(base, dyn, url);
  return NextResponse.json(json);
}

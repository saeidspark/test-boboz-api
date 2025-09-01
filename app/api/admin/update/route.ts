import { NextResponse } from "next/server";
import { kv, dynKey } from "@/lib/kv";
import { UpdateDynamicSchema } from "@/lib/schema";

export async function POST(req: Request) {
  const auth = (req.headers.get("authorization") || "").split(" ")[1];
  if (!auth || auth !== process.env.ADMIN_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = UpdateDynamicSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await kv.set(dynKey(parsed.data.id), {
    xp: parsed.data.xp,
    level: parsed.data.level,
  });
  return NextResponse.json({ ok: true });
}

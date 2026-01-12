import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", url);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return NextResponse.json({ success: true });
}

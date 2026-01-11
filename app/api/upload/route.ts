import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // unique filename
    const ext = file.type.includes("video") ? "webm" : "webm";
    const filename = `${Date.now()}.${ext}`;

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    // public URL
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
}

import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const files: File[] = data.getAll("files") as unknown as File[];

    console.log("data", data);
    console.log("files", files);

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const paths = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(process.cwd(), "public", "uploads", file.name);

      await writeFile(path, buffer);
      paths.push(path);
    }

    return NextResponse.json({ success: true, paths });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid formdata" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { fileName } = await req.json();

    if (!fileName) {
      return NextResponse.json(
        { error: "No filename provided" },
        { status: 400 },
      );
    }

    const path = join(process.cwd(), "public", "uploads", fileName);

    await unlink(path);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid body" }, { status: 500 });
  }
}

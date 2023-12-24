import { NextResponse } from "next/server";
import { verifyPassword } from "~/lib/auth/passwords";
import { db } from "~/server/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 },
    );
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (user && user.password) {
    const isVerified = await verifyPassword(password, user.password);
    if (isVerified) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }
  } else {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 404 },
    );
  }
}

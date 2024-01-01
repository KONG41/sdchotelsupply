// seed user
import { db } from "@/server/db";
import { hashPassword } from "@/lib/auth/passwords";

export const seedUser = async () => {
  const existingUser = await db.user.findUnique({
    where: { username: "admin" },
  });
  const hashedPassword = await hashPassword("admin");
  if (!existingUser) {
    await db.user.create({
      data: {
        username: "admin",
        password: hashedPassword,
        status: "active",
        email: "admin@example.com",
      },
    });
  }
};

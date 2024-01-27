// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;

const prisma = new PrismaClient();

async function main() {
  // check if user already exists
  const userExists = await prisma.user.findFirst({
    where: {
      username: "root",
    },
  });
  if (userExists) {
    console.log("User already exists, exiting...");
    return;
  }
  const password = "1234";
  const newUser = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "root",
      password: await hash(password, 12),
      email: "johndoe@example.com",
      role: "user",
      status: "active",
    },
  });

  console.log(
    `Created new username: ${newUser.username} ,password: ${password})`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// prisma/seed.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: "password",
      email: "johndoe@example.com",
      role: "user",
      status: "active",
    },
  });

  const newPost = await prisma.post.create({
    data: {
      name: "First Post",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
  console.log(`Created new post: ${newPost.name} (ID: ${newPost.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

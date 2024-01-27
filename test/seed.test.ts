import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
describe("Database Seeding Check", () => {
  it("should have at least one user", async () => {
    const users = await prisma.user.findMany();
    expect(users.length).toBeGreaterThan(0);
  });

  it("should have one user with username admin_demo", async () => {
    const user = await prisma.user.findUnique({
      where: {
        username: "admin_demo",
      },
    });
    expect(user).toBeTruthy();
  });
});

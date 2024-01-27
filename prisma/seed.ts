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

  const careerExists = await prisma.career.findFirst({
    where: {
      position: "IT",
    },
  });
  if (careerExists) {
    console.log("User already exists, exiting...");
    return;
  }
  const newCareer = await prisma.career.create({
    data: {
      position: "IT",
      term: "FullTime",
      openDate: "16-01-2024",
      closeDate: "16-02-2024",
    },
  });

  const educationExists = await prisma.education.findFirst({
    where: {
      name: "Vue online class",
    },
  });
  if (educationExists) {
    console.log("User already exists, exiting...");
    return;
  }
  const newEducation = await prisma.education.create({
    data: {
      name: "Vue online class",
      description: "learing programing",
      youtubeLink: "https://www.youtube.com/watch?v=q1EvZJ2s09g",
      categoryId: 1,
    },
  });

  const promotionExists = await prisma.promotion.findFirst({
    where: {
      name: "50% sale off",
    },
  });
  if (promotionExists) {
    console.log("Promotion already exists, exiting...");
    return;
  }
  const newPromotion = await prisma.promotion.create({
    data: {
      name: "50% sale off",
      status: "active",
      description: "clone on december",
    },
  });

  const eventExists = await prisma.event.findFirst({
    where: {
      name: "Charity event",
    },
  });
  if (eventExists) {
    console.log("Event already exists, exiting...");
    return;
  }
  const newEvent = await prisma.event.create({
    data: {
      name: "Charity event",
      status: "active",
      description: "go to province for help school",
    },
  });

  const clientExists = await prisma.client.findFirst({
    where: {
      name: "Campain",
    },
  });
  if (clientExists) {
    console.log("client already exists, exiting...");
    return;
  }
  const newClient = await prisma.client.create({
    data: {
      name: "Campain",
      year: "2024",
      description: "pain to the world",
    },
  });

  const productExists = await prisma.product.findFirst({
    where: {
      name: "Big Bed",
    },
  });
  if (productExists) {
    console.log("product already exists, exiting...");
    return;
  }
  const newProduct = await prisma.product.create({
    data: {
      name: "Big Bed",
      status: "active",
      description: "Bed good for health",
      price: 200,
      popular: true,
      categoryId: 1,
    },
  });

  const menuExists = await prisma.menu.findFirst({
    where: {
      name: "Product",
    },
  });
  if (menuExists) {
    console.log("menu already exists, exiting...");
    return;
  }
  const newMenu = await prisma.menu.create({
    data: {
      name: "Product",
      status: "active",
      description: "/product",
    },
  });

  const subMenuExists = await prisma.subMenu.findFirst({
    where: {
      name: "Home Product",
    },
  });
  if (subMenuExists) {
    console.log("subMenu already exists, exiting...");
    return;
  }
  const newSubMenu = await prisma.subMenu.create({
    data: {
      name: "Home Product",
      status: "active",
      description: "home_product",
      parentId: 1,
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

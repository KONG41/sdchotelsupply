import { procedure, router } from "../trpc";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "../db";

const productRouter = router({
  gets: procedure.query(async () => {
    const products = await db.product.findMany({ include: { category: true } });
    return products;
  }),
  get: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      const product = await db.product.findUnique({
        where: { id: opts.input.id },
      });
      return product;
    }),
  getImage: procedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const id = opts.input.id;
      const products = await db.product.findUnique({
        where: { id },
        select: { image: true },
      });
      return products;
    }),
  add: procedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
        popular: z.boolean(),
        image: z.string().optional(),
        categoryId: z.number(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "disable", {
            message: "status must be an active or disable",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { name, price, description, status, image, popular, categoryId } =
        opts.input;
      await db.product.create({
        data: {
          name,
          price,
          description,
          status,
          image,
          popular,
          categoryId,
        },
      });
      return { message: "Product added successfully" };
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        description: z.string(),
        popular: z.boolean(),
        image: z.string().optional(),
        categoryId: z.number(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "disable", {
            message: "status must be an active or disable",
          }),
      }),
    )
    .mutation(async (opts) => {
      const {
        id,
        name,
        price,
        description,
        status,
        popular,
        categoryId,
        image,
      } = opts.input;
      await db.product.update({
        where: { id },
        data: {
          name,
          price,
          description,
          status,
          popular,
          categoryId,
          image: image,
        },
      });
      return true;
    }),
  updateImgOnDelete: procedure
    .input(
      z.object({
        id: z.number(),
        image: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { id, image } = opts.input;
      await db.product.update({
        where: { id },
        data: {
          image,
        },
      });
      return true;
    }),
  delete: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const { id } = opts.input;
      await db.product.delete({
        where: { id },
      });
      return { message: "Product deleted successfully" };
    }),
});

export { productRouter };

import { procedure, router } from "../trpc";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "../db";

const clientRouter = router({
  gets: procedure.query(async () => {
    const data = await db.client.findMany();
    return data;
  }),
  get: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      const data = await db.client.findUnique({
        where: { id: opts.input.id },
      });
      return data;
    }),
  getImage: procedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const id = opts.input.id;
      const data = await db.client.findUnique({
        where: { id },
        select: { image: true },
      });
      return data;
    }),
  add: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        year: z.string(),
        image: z.array(z.string()).optional(),
      }),
    )
    .mutation(async (opts) => {
      const { name, description, year, image } = opts.input;
      await db.client.create({
        data: {
          name,
          description,
          year,
          image: JSON.stringify(image),
        },
      });
      return { message: "client added successfully" };
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        year: z.string(),
        image: z.array(z.string()).optional(),
      }),
    )
    .mutation(async (opts) => {
      const { id, name, description, image, year } = opts.input;
      await db.client.update({
        where: { id },
        data: {
          name,
          description,
          image: JSON.stringify(image),
          year,
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
      await db.client.update({
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
      await db.client.delete({
        where: { id },
      });
      return { message: "client deleted successfully" };
    }),
});

export { clientRouter };

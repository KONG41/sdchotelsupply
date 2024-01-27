import { procedure, router } from "../trpc";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "../db";

const careerRouter = router({
  gets: procedure.query(async () => {
    const data = await db.career.findMany();
    return data;
  }),
  get: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      const data = await db.career.findUnique({
        where: { id: opts.input.id },
      });
      return data;
    }),
  getImage: procedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const id = opts.input.id;
      const data = await db.career.findUnique({
        where: { id },
        select: { image: true },
      });
      return data;
    }),
  add: procedure
    .input(
      z.object({
        position: z.string(),
        term: z.string(),
        openDate: z.string(),
        closeDate: z.string(),
        description: z.string(),
        image: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      await db.career.create({
        data: opts.input,
      });
      return { message: "career added successfully" };
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        position: z.string(),
        term: z.string(),
        openDate: z.string(),
        closeDate: z.string(),
        description: z.string(),
        image: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      const { id, position, term, openDate, closeDate, description, image } =
        opts.input;
      await db.career.update({
        where: { id },
        data: {
          position,
          term,
          openDate,
          closeDate,
          description,
          image,
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
      await db.career.update({
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
      await db.career.delete({
        where: { id },
      });
      return { message: "career deleted successfully" };
    }),
});

export { careerRouter };

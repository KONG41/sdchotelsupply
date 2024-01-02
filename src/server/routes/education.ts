import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "../db";

const educationRouter = router({
  gets: procedure.query(async () => {
    const educations = await db.education.findMany();
    return educations;
  }),
  get: procedure.input(z.object({ id: z.number() })).query(async (opts) => {
    const education = await db.education.findUnique({
      where: { id: opts.input.id },
    });
    return education;
  }),
  add: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        youtubeLink: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { name, description, youtubeLink } = opts.input;
      await db.education.create({
        data: {
          name,
          description,
          youtubeLink,
        },
      });
      return { message: "success" };
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        youtubeLink: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { id, name, description, youtubeLink } = opts.input;
      await db.education.update({
        where: { id },
        data: {
          name,
          description,
          youtubeLink,
        },
      });
      return { message: "success" };
    }),
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      await db.education.delete({
        where: { id },
      });
      return { message: "success" };
    }),
});

export { educationRouter };

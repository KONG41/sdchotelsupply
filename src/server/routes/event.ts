import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "../db";

const eventRouter = router({
  gets: procedure.query(async () => {
    const data = await db.event.findMany();
    return data;
  }),
  get: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      const data = await db.event.findUnique({
        where: { id: opts.input.id },
      });
      return data;
    }),
  getImage: procedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const id = opts.input.id;
      const data = await db.event.findUnique({
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
        youtubeLink: z.string(),
        image: z.array(z.string()).optional(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "disable", {
            message: "status must be an active or disable",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { name, description, status, image, youtubeLink } = opts.input;
      await db.event.create({
        data: {
          name,
          description,
          status,
          image,
          youtubeLink,
        },
      });
      return { message: "Event added successfully" };
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        youtubeLink: z.string(),
        image: z.array(z.string()).optional(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "disable", {
            message: "status must be an active or disable",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { id, name, description, status, image, youtubeLink } = opts.input;
      await db.event.update({
        where: { id },
        data: {
          name,
          description,
          status,
          image,
          youtubeLink,
        },
      });
      return true;
    }),
  updateImgOnDelete: procedure
    .input(
      z.object({
        id: z.number(),
        image: z.array(z.string()),
      }),
    )
    .mutation(async (opts) => {
      const { id, image } = opts.input;
      await db.event.update({
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
      await db.event.delete({
        where: { id },
      });
      return { message: "Event deleted successfully" };
    }),
});

export { eventRouter };

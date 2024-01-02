import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "../db";
import { hashPassword } from "~/lib/auth/passwords";

const userRouter = router({
  add: procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "suspend", {
            message: "status must be an active or suspend",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { username, password, status, email } = opts.input;
      const existingUser = await db.user.findUnique({
        where: { username },
      });
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }
      const hashedPassword = await hashPassword(password);
      const newUser = await db.user.create({
        data: {
          username,
          password: hashedPassword,
          status,
          email,
        },
      });
      return newUser;
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        username: z.string(),
        password: z.string(),
        email: z.string(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "suspend", {
            message: "status must be an active or suspend",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { id, username, password, status, email } = opts.input;
      let updateData: any = {
        username,
        status,
        email,
      };
      if (password) {
        const hashedPassword = await hashPassword(password);
        updateData = {
          ...updateData,
          password: hashedPassword,
        };
      }

      await db.user.update({
        where: { id },
        data: updateData,
      });
      return { message: "Update Success" };
    }),
  get: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      const { id } = opts.input;
      const user = await db.user.findUnique({
        where: { id },
      });
      return user;
    }),
  delete: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const { id } = opts.input;
      await db.user.delete({
        where: { id },
      });
      return { message: "Delete Success" };
    }),
});

export default userRouter;

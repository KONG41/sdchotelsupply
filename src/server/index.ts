import { TRPCError } from "@trpc/server";
import { procedure, router } from "./trpc";
import { auth } from "@/auth";
import { z } from "zod";
import { db } from "./db";

export const appRouter = router({
  getTodos: procedure.query(async () => {
    const userId = (await auth())?.user.id;
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return [11, 22, 33];
  }),
  getData: procedure.query(async () => {
    // throw new TRPCError({
    //   code: "INTERNAL_SERVER_ERROR",
    //   message: "An unexpected error occurred, please try again later.",
    // });
    return { message: "Hello world" };
  }),
  addUser: procedure
    .input(
      z.object({
        username: z.string(),
        role: z
          .string()
          .refine((value) => value === "admin" || value === "editor", {
            message: "role must be an admin or editor",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { username, role } = opts.input;
      const newUser = await db.user.create({
        data: {
          username,
          role,
        },
      });
      return newUser;
    }),
  getUsers: procedure.query(async () => {
    const users = await db.user.findMany({
      select: { id: true, username: true, role: true, status: true },
    });
    return users;
  }),
});

export type AppRouter = typeof appRouter;

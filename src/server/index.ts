import { TRPCError } from "@trpc/server";
import { procedure, router } from "./trpc";
import { auth } from "@/auth";
import { z } from "zod";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.SECRET);

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
});

export type AppRouter = typeof appRouter;

import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "~/auth";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;

export const protectProcedure = t.procedure.use(async (opts) => {
  const user = await auth();
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next();
});

export const procedure = t.procedure;

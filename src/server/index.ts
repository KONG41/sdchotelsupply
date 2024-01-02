import { TRPCError } from "@trpc/server";
import { procedure, router } from "./trpc";
import { auth } from "@/auth";
import { db } from "./db";
import userRouter from "./routes/user";
import { menuRouter, subMenuRouter } from "./routes/menu";
import { productRouter } from "./routes/product";
import { promotionRouter } from "./routes/promotion";
import { eventRouter } from "./routes/event";
import { clientRouter } from "./routes/client";
import { educationRouter } from "./routes/education";
import { careerRouter } from "./routes/career";

export const appRouter = router({
  user: userRouter,
  menu: menuRouter,
  subMenu: subMenuRouter,
  product: productRouter,
  promotion: promotionRouter,
  event: eventRouter,
  clientRoute: clientRouter,
  education: educationRouter,
  career: careerRouter,
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
  getUsers: procedure.query(async () => {
    const users = await db.user.findMany({
      select: { id: true, username: true, email: true, status: true },
    });
    return users;
  }),
});
export type AppRouter = typeof appRouter;

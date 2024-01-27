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
import { z } from "zod";
import nodemailer from "nodemailer";

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
  contactSubmit: procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, email, phone, message } = input;
      const transporter = nodemailer.createTransport({
        host: "mail.sdchotelsupply.com",
        port: 465,
        auth: {
          user: "contact@sdchotelsupply.com",
          pass: "y~dh5}kRpBi9",
        },
      });
      // verify connection configuration
      transporter.verify(function (error) {
        if (error) {
          console.log(error);
          return false;
        }
      });

      await transporter.sendMail({
        from: "contact@sdchotelsupply.com",
        to: "contact@sdchotelsupply.com",
        subject: "Contact Us",
        html: `<div>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
        </div>`,
      });

      return true;
    }),
});
export type AppRouter = typeof appRouter;

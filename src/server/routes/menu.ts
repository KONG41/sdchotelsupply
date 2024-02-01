import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "../db";

const menuRouter = router({
  gets: procedure.query(async () => {
    const menus = await db.menu.findMany({
      include: {
        subMenus: true,
      },
    });
    return menus;
  }),
  add: procedure
    .input(
      z.object({
        name: z.string(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "suspend", {
            message: "status must be an active or suspend",
          }),
        description: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { name, status, description } = opts.input;
      const existingMenu = await db.menu.findUnique({
        where: { name },
      });
      if (existingMenu) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Menu already exists",
        });
      }
      const newMenu = await db.menu.create({
        data: {
          name,
          status,
          description,
        },
      });
      return newMenu;
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "disable", {
            message: "status must be an active or disable",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { id, name, description, status } = opts.input;
      await db.menu.update({
        where: { id },
        data: {
          name,
          description,
          status,
        },
      });
      return { message: "success" };
    }),
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      const deletedUser = await db.menu.delete({
        where: { id },
      });
      return deletedUser;
    }),
  list: procedure.input(z.object({})).query(async () => {
    const users = await db.menu.findMany();
    return users;
  }),
  get: procedure.input(z.object({ id: z.number() })).query(async (opts) => {
    const { id } = opts.input;
    const user = await db.menu.findUnique({
      where: { id },
    });
    return user;
  }),
});

const subMenuRouter = router({
  gets: procedure.query(async () => {
    const menus = await db.subMenu.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        parentId: true,
        parent: {
          select: {
            name: true,
          },
        },
      },
    });
    return menus;
  }),
  getParentList: procedure.query(async () => {
    const menus = await db.menu.findMany({ select: { id: true, name: true } });
    return menus;
  }),
  list: procedure.query(async () => {
    const menus = await db.subMenu.findMany({
      select: { id: true, name: true },
    });
    return menus;
  }),
  add: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        parentId: z.number(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "suspend", {
            message: "status must be an active or suspend",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { name, description, parentId, status } = opts.input;
      const existingMenu = await db.subMenu.findUnique({
        where: { name },
      });
      if (existingMenu) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Menu already exists",
        });
      }
      const newMenu = await db.subMenu.create({
        data: {
          name,
          description,
          status,
          parentId,
        },
      });
      return newMenu;
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        parentId: z.number(),
        status: z
          .string()
          .refine((value) => value === "active" || value === "disable", {
            message: "status must be an active or disable",
          }),
      }),
    )
    .mutation(async (opts) => {
      const { id, name, description, parentId, status } = opts.input;
      await db.subMenu.update({
        where: { id },
        data: {
          name,
          description,
          parentId,
          status,
        },
      });
      return { message: "success" };
    }),
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      const deletedUser = await db.subMenu.delete({
        where: { id },
      });
      return deletedUser;
    }),
  get: procedure.input(z.object({ id: z.number() })).query(async (opts) => {
    const { id } = opts.input;
    const user = await db.subMenu.findUnique({
      where: { id },
    });
    return user;
  }),
});

export { menuRouter, subMenuRouter };

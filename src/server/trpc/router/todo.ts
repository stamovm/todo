import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const todoRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getTodos: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(z.object({ text: z.string().min(3) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.create({
        data: { text: input.text, checked: false, userId: ctx.session.user.id },
      });
    }),
  updateChecked: protectedProcedure
    .input(z.object({ id: z.string().min(8), checked: z.boolean() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.update({
        data: { checked: input.checked },
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().min(8) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.delete({
        where: { id: input.id },
      });
    }),
});

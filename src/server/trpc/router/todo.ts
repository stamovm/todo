import { t, authedProcedure } from "../trpc";
import { z } from "zod";

export const todoRouter = t.router({
  getTodos: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: authedProcedure
    .input(z.object({ text: z.string().min(3) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.create({
        data: { text: input.text, checked: false, userId: ctx.session.user.id },
      });
    }),
  updateChecked: authedProcedure
    .input(z.object({ id: z.string().min(8), checked: z.boolean() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.update({
        data: { checked: input.checked },
        where: { id: input.id },
      });
    }),
  delete: authedProcedure
    .input(z.object({ id: z.string().min(8) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.delete({
        where: { id: input.id },
      });
    }),
});

import { t } from '../trpc'
import { z } from 'zod'

export const todoRouter = t.router({
  hello: t.procedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
    }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany()
  }),
  create: t.procedure
    .input(z.object({ text: z.string().min(3) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.create({
        data: { text: input.text, checked: false },
      })
    }),
  updateChecked: t.procedure
    .input(z.object({ id: z.string().min(8), checked: z.boolean() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.update({
        data: { checked: input.checked },
        where: { id: input.id },
      })
    }),
  delete: t.procedure
    .input(z.object({ id: z.string().min(8) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.delete({
        where: { id: input.id },
      })
    }),
})

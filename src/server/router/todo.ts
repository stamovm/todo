import { createRouter } from './context'
import { z } from 'zod'

export const todoRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany()
    },
  })
  .mutation('create', {
    input: z.object({ text: z.string().min(3) }),
    async resolve(req) {
      return await req.ctx.prisma.todo.create({
        data: { text: req.input.text, checked: false },
      })
    },
  })
  .mutation('updateChecked', {
    input: z.object({ id: z.string().min(8), checked: z.boolean() }),
    async resolve(req) {
      return await req.ctx.prisma.todo.update({
        data: { checked: req.input.checked },
        where: { id: req.input.id },
      })
    },
  })
  .mutation('delete', {
    input: z.object({ id: z.string().min(8) }),
    async resolve(req) {
      return await req.ctx.prisma.todo.delete({
        where: { id: req.input.id },
      })
    },
  })

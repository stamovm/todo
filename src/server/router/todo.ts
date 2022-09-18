import { createRouter } from './context'
import { z } from 'zod'

export const todoRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany()
    },
  })
  .mutation('createTodo', {
    input: z.object({ text: z.string().min(3) }),
    async resolve(req) {
      return await req.ctx.prisma.todo.create({
        data: { text: req.input.text, checked: false },
      })
    },
  })
  .mutation('create', {
    input: z.object({ question: z.string().min(3) }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.todo.create({
        data: {
          text: input.question,
        },
      })
    },
  })

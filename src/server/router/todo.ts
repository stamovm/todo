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
    // validate input with Zod
    input: z.object({ name: z.string().min(3) }),
    async resolve(req) {
      // use your ORM of choice
      return await prisma.todo.create({
        data: req.input,
      })
    },
  })

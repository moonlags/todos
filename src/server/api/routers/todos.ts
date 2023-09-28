import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todosRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.todo.findMany({ where: { userId: userId } });
  }),
  create: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.todo.create({
        data: {
          content: input.content,
          completed: false,
          user: { connect: { id: userId } },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ todoid: z.string().min(1).uuid() }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.todo.delete({
        where: { userId: userId, id: input.todoid },
      });
    }),
  complete: protectedProcedure
    .input(z.object({ todoid: z.string().min(1).uuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const isCompleted = await ctx.db.todo.findUnique({
        where: { userId: userId, id: input.todoid },
        select: { completed: true },
      });

      return ctx.db.todo.update({
        where: { userId: userId, id: input.todoid },
        data: { completed: !isCompleted?.completed },
      });
    }),
  changeContent: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
        todoid: z.string().min(1).uuid(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.todo.update({
        where: { userId: userId, id: input.todoid },
        data: { content: input.content },
      });
    }),
});

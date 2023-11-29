import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const spaceRouter = createTRPCRouter({
  // query: getSpaces
  getSpaces: protectedProcedure.query(async ({ ctx }) => {
    const spaces = await ctx.db.space.findMany();
    return spaces;
  }),
  // mutation: create
  create: protectedProcedure
    .input(
      z.object({
        floor: z.number(),
        number: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.db.space.create({
        data: {
          floor: input.floor,
          number: input.number,
          available: true,
        },
      });
      return space;
    }),
});

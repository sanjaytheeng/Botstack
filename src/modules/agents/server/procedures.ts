import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  // TODO: Change `getOne` to use `protectedProcedure`
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          //TODO: change to actual count
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),
  // TODO: Change `getMany` to use `protectedProcedure`
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userID: ctx.auth.user.id,
        })
        .returning();
      return createAgent;
    }),
});

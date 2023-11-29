import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

interface InvitationInput {
  guestName: string;
  startDate: Date;
  endDate: Date;
  spaceId: number;
  createdBy: string;
}

interface CancelInvitationInput {
  id: number;
}

export const invitationRouter = createTRPCRouter({
  getAllInvitations: publicProcedure.query<object>((opt) => async () => {
    const invitations = await db.invitation.findMany();
    return invitations;
  }),

  createInvitation: protectedProcedure.query<object>((opt) => async (input: InvitationInput) => {
    const { guestName, startDate, endDate, spaceId, createdBy } = input;

    const invitation = await db.invitation.create({
      data: {
        guestName,
        startDate,
        endDate,
        spaceId,
        createdById: createdBy,
      },
    });

    return invitation;
  }),

  cancelInvitation: protectedProcedure.mutation<object>(() => async (input: CancelInvitationInput) => {
    const { id } = input;
    await db.invitation.delete({ where: { id } });

    return true;
  }),
});

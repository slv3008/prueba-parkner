import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@parkner.com" },
    update: {},
    create: {
      email: "alice@parkner.com",
      name: "Alice",
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@parkner.com" },
    update: {},
    create: {
      email: "bob@parkner.com",
      name: "Bob",
    },
  });
  const charlie = await prisma.user.upsert({
    where: { email: "charlie@parkner.com" },
    update: {},
    create: {
      email: "charlie@parkner.com",
      name: "Charlie",
    },
  });

  // Add 10 new spaces
  for (let i = 0; i < 10; i++) {
    await prisma.space.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        number: i + 1,
        floor: (i % 3) + 1,
        available: true,
      },
    });
  }

  const users = [alice, bob, charlie];

  // Add 10 new invitations
  for (let i = 0; i < 10; i++) {
    const startDate = new Date();
    // endDate is 3 hours from start date
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
    await prisma.invitation.create({
      data: {
        spaceId: i + 1,
        createdById: users[i % 3]!.id,
        guestName: "Invitation " + i,
        startDate,
        endDate,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

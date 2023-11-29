import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import InvitationTable from "./_components/InvitationTable";
import MainLayout from "./_components/MainLayout";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <main className="">
      <MainLayout>
        <InvitationTable />
      </MainLayout>
    </main>
  );
}

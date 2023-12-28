import PageTitle from "@/components/page-title";
import prisma from "@/config/db";
import React from "react";
import UsersTable from "./_components/users-table";

async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <div>
      <PageTitle title="Admin / Users" />
      <UsersTable users={users} />
    </div>
  );
}

export default AdminUsersPage;

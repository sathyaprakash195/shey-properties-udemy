import { GetCurrentUserFromMongoDB } from "@/actions/users";
import PageTitle from "@/components/page-title";
import prisma from "@/config/db";
import React from "react";
import UserQueriesTable from "./_components/user-queries-table";

async function QueriesPage() {
  const user = await GetCurrentUserFromMongoDB();
  const queries = await prisma.query.findMany({
    where: {
      userId: user?.data?.id,
    },
    include: {
      property: true,
    },
  });
  return (
    <div>
      <PageTitle title="Queries" />
      <UserQueriesTable queries={queries} />
    </div>
  );
}

export default QueriesPage;

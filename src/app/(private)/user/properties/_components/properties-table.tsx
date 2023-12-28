import prisma from "@/config/db";
import React from "react";
import ClientSidePropertiesTable from "./properties-table-clientside";
import { GetCurrentUserFromMongoDB } from "@/actions/users";

async function PropertiesTable({
  searchParams,
  fromAdmin = false,
}: {
  searchParams: any;
  fromAdmin?: boolean;
}) {
  const user = await GetCurrentUserFromMongoDB();

  const whereCondition = searchParams;
  if (!fromAdmin) {
    whereCondition.userId = user?.data?.id;
  }

  const properties = await prisma.property.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: whereCondition,
    include : {
      user : true
    }
  });
  return (
    <div>
      <ClientSidePropertiesTable
        properties={properties}
        fromAdmin={fromAdmin}
      />
    </div>
  );
}

export default PropertiesTable;

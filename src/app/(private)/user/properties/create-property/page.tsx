import PageTitle from "@/components/page-title";
import React from "react";
import PropertiesForm from "../_components/properties-form";
import prisma from "@/config/db";
import { Property } from "@prisma/client";
import { GetCurrentUserFromMongoDB } from "@/actions/users";

async function CreatePropertyPage({ searchParams }: { searchParams: any }) {
  const mongoUser = await (await GetCurrentUserFromMongoDB()).data;
  const cloneFrom = searchParams?.cloneFrom || "";
  let property: Property | null = null;
  if (cloneFrom) {
    property = (await prisma.property.findUnique({
      where: {
        id: cloneFrom,
      },
    })) as Property;
  }

  // check user subscription and properties count

  const [userSubscription, propertiesCount] = (await Promise.all([
    prisma.subscription.findFirst({
      where: {
        userId: mongoUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.property.count({
      where: {
        userId: mongoUser?.id,
      },
    }),
  ])) as any;

  let showForm = true;
  let errorMessage = "";
  if (!userSubscription && propertiesCount >= 3) {
    showForm = false;
    errorMessage =
      "You have reached the maximum number of properties (3), please upgrade your subscription to add more properties";
  }

  if (userSubscription?.plan.propertiesCount >= propertiesCount) {
    showForm = false;
    errorMessage = `You have reached the maximum number of properties ${userSubscription?.plan.propertiesCount} , please upgrade your subscription to add more properties`;
  }

  return (
    <div>
      <PageTitle title="Create Property" />
      {showForm ? (
        <PropertiesForm initialValues={property ? property : {}} />
      ) : (
        <span className="text-sm text-gray-600">{errorMessage} </span>
      )}
    </div>
  );
}

export default CreatePropertyPage;

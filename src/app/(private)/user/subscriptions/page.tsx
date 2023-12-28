import PageTitle from "@/components/page-title";
import { subscriptionPlans } from "@/constants";
import React from "react";
import BuySubScription from "./_components/buy-subscription";
import prisma from "@/config/db";
import { GetCurrentUserFromMongoDB } from "@/actions/users";

async function SubscriptionsPage() {
  const mongoUser = await (await GetCurrentUserFromMongoDB()).data;
  const userSubscription: any = await prisma.subscription.findFirst({
    where: { userId: mongoUser?.id },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <PageTitle title="Subscriptions" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subscriptionPlans.map((plan) => {
          let isSelected = userSubscription?.plan?.name === plan.name;
          if (!userSubscription) {
            isSelected = plan.name === "Basic";
          }
          return (
            <div
              className={`flex flex-col gap-5 justify-between p-5 border rounded  border-solid
             ${isSelected ? "border-primary border-2" : "border-gray-300"}
            `}
            >
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-bold text-primary">{plan.name}</h1>
                <h1 className="text-orange-700 text-2xl lg:text-5xl font-bold">
                  ${plan.price}
                </h1>

                <hr />

                <div className="flex flex-col gap-1">
                  {plan.features.map((feature) => (
                    <span className="text-gray-500 text-sm">{feature}</span>
                  ))}
                </div>
              </div>
              <BuySubScription plan={plan} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubscriptionsPage;

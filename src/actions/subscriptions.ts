"use server";

import prisma from "@/config/db";
import { GetCurrentUserFromMongoDB } from "./users";

export const SaveSubscription = async ({
  paymentId,
  plan,
}: {
  paymentId: string;
  plan: any;
}) => {
  try {
    const user = await GetCurrentUserFromMongoDB();
    const payload: any = {
      paymentId,
      plan,
      userId: user.data?.id,
    };
    await prisma.subscription.create({
      data: payload,
    });
    return {
      message: "Subscription saved successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

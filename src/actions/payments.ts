"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const GetStripeClientSecret = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description : "Payment for the sheyproperties.com",
    });

    // return client secret
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

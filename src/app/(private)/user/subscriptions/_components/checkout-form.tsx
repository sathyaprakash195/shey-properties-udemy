import { Button, Modal, message } from "antd";
import React from "react";
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { SaveSubscription } from "@/actions/subscriptions";

interface Props {
  plan: any;
  showCheckoutForm: boolean;
  setShowCheckoutForm: any;
}

function CheckoutForm({ plan, showCheckoutForm, setShowCheckoutForm }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://localhost:3000/user/account",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        await SaveSubscription({ paymentId: result.paymentIntent.id, plan });
        message.success("Subscription purchased successfully");
        router.push("/user/account");
      }
      setShowCheckoutForm(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Complete your subscription purchase"
      open={showCheckoutForm}
      onCancel={() => setShowCheckoutForm(false)}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit} className="mt-7">
        <PaymentElement />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US"],
          }}
        />

        <div className="flex justify-end gap-5 mt-7">
          <Button onClick={() => setShowCheckoutForm(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CheckoutForm;

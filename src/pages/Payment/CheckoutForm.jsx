// Import necessary dependencies
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

// Create the CheckoutForm component
const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "unknown",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // Save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
        status: "service pending",
        itemNames: cart.map((item) => item.name),
      };
      
      axiosSecure.post("/save-payment", payment).then((res) => {
        console.log(res.data);
        // Handle the response or display a confirmation message
      });
    }
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
      {cardError && <p>{cardError}</p>}
      {transactionId && <p>Payment Successful! Transaction ID: {transactionId}</p>}
    </>
  );
};

export default CheckoutForm;

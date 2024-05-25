import Stripe from 'stripe';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, './../.env') });

const stripe = new Stripe(process.env.STRIPE_API_KEY); 

export const createPaymentIntent = async (amount, currency) => {
  let response = {
    status: '',
    data: '',
  };
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
    });
    response.status = 200;
    response.data = { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    response.status = 500;
    response.data = 'Internal Server Error';
    console.log(error);
  }

  return response;
};


const keys = "sk_test_51MaOSqE6HtvcwmMAEFBEcSwTQIBNvQVzAXJc1cnrFoKIQbIH7i7KfcjxtB0DsRiRECgIaGb30vlq4fVSB6uaHsP400S1cZv15n"
import stripe from 'stripe';
import registeringPayment from '../Schemas/payment.js';




stripe(keys);

export const paymentController =async (req,res) => {
  try{
    console.log(req.body);
      let {  paymentId } = req.body
      const amount="100 USD"
      const payment = await stripe.paymentIntents({
          amount,
          currency: "USD",
          description: "Accu Sign company",
          payment_method: paymentId,
          confirm: true
      })
      payment.create();
      
      res.json({
          message: "Payment successful",
          success: true
      })
  }
  catch(err){
console.log(err);
  }
}


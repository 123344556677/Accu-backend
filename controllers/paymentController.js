import Stripe from 'stripe';
import registeringPayment from '../Schemas/payment.js';
import registeringTrip from '../Schemas/trip.js';


const stripe = new Stripe("sk_test_51MaOSqE6HtvcwmMAEFBEcSwTQIBNvQVzAXJc1cnrFoKIQbIH7i7KfcjxtB0DsRiRECgIaGb30vlq4fVSB6uaHsP400S1cZv15n")




export const paymentController =async (req,res) => {
  try{
    console.log(req.body);
      let {  paymentId,clientId,tripDetails, } = req.body
    
      const payment = await stripe.paymentIntents.create({
          amount:1000,
          currency: "USD",
          description: "Accu Sign company",
          payment_method: paymentId,
          confirm: true
      })
     console.log(payment,"==========>payment")
     if(payment.status==="succeeded"){
        const Payment=new registeringPayment({tripDetails,clientId,paymentId,date:Date.now(),amount:payment?.amount})
        Payment.save();
         res.json({ message: "Payment successful" });
        //  registeringTrip.find({_id:tripDetails.})
     }
      
      
  }
  catch(err){
console.log(err);
  }
}
export const paymentByClientId = async (req, res) => {
    try {
        console.log(req.body, "----------->crew Id")
        const clientId = req.body.clientId;


        registeringPayment.find({ clientId:clientId }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: " Trip exist", data: data })
            }
            else {
                console.log("user not exist")
                res.json({ message: "No trip", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error", err: err });
    }

};
export const getAllPayments = async (req, res) => {
    try {
        const data = await registeringPayment.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}


import express from 'express'
import { createAircraft, deleteAircraft, getAllAircrafts, updateAircraft } from '../controllers/aircraftController.js';
import { register, login, getAllUsers, updateUser ,getUsersById, forgetPassword,forgetLink, getCrewByKey, getClientByKey, deleteUser } from "../controllers/authController.js";
import { addBankDetails, getAllDetails } from '../controllers/bankDetails.js';
import { createClient, deleteClient, getAllClients } from "../controllers/clientController.js";
import { createCrew, deleteCrew, getAllCrews, getCrewByName } from '../controllers/crewController.js';
import { addDocument, getAllDocuments } from '../controllers/documentController.js';
import { getAllPayments, paymentByClientId, paymentController } from '../controllers/paymentController.js';
import { addCrewToTrips,  addingTripExpenses,  addTripWithCrew, createTrip, deleteTrip,
     getAllTrips, getCrewExpense, TripsByClientId,TripsByCrewId,updateTripClientDocumentStatus,updateTripDocumentStatus,updateTripStatus } from '../controllers/tripController.js';


const router = express.Router();
//auth
router.post('/reg', register);
router.post('/log', login);
router.get('/getAllUsers',getAllUsers)
router.post('/userById', getUsersById)
router.post('/forgetPassword', forgetPassword);
router.put('/updateUser', updateUser);
router.post('/forgetLink', forgetLink);
router.get('/crewByKey',getCrewByKey)
router.get('/clientByKey', getClientByKey)
router.post('/deleteUserById', deleteUser);

//client
router.post('/createClient', createClient );
router.get('/getAllClients', getAllClients);
router.post('/deleteClientById',deleteClient );

//crew
router.post('/createCrew', createCrew);
router.get('/getAllCrews', getAllCrews);
router.post('/deleteCrewById', deleteCrew);
router.post('/getCrewByName',getCrewByName)

// bandDetails
router.post('/addBankDetails', addBankDetails );
router.get('/getAllDetails', getAllDetails);

//aircraft
router.post('/addAircraftDetails', createAircraft);
router.get('/getAllAircrafts', getAllAircrafts);
router.post('/deleteAircraftById', deleteAircraft);
router.put('/updateAircraft', updateAircraft);

//trips
router.post('/addTripDetails', createTrip);
router.get('/getAllTrips', getAllTrips);
router.post('/deleteTripById', deleteTrip);
router.post('/getAllTripsByClientId', TripsByClientId);
router.post('/addCrewToTrips', addCrewToTrips);
router.put('/updateTripStatus', updateTripStatus);
router.post('/addTripwithCrew', addTripWithCrew);
router.post('/getAllTripsByCrewId', TripsByCrewId);
router.post('/addTripExpenses', addingTripExpenses);
router.post('/getCrewExpense', getCrewExpense);
router.put('/updateDocumentStatus',updateTripDocumentStatus);
router.put('/updateClientDocumentStatus', updateTripClientDocumentStatus);

//document
router.post('/addDocument', addDocument);
router.get('/getAllDocuments', getAllDocuments);

//strip
router.post('/stripPayment', paymentController);
router.post('/getPaymentByClientId', paymentByClientId);
router.get('/getAllPayments', getAllPayments);

export default router;
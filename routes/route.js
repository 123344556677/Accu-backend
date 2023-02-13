
import express from 'express'
import { createAircraft, deleteAircraft, getAllAircrafts } from '../controllers/aircraftController.js';
import { register, login, getAllUsers, updateUser ,getUsersById, forgetPassword,forgetLink } from "../controllers/authController.js";
import { addBankDetails, getAllDetails } from '../controllers/bankDetails.js';
import { createClient, deleteClient, getAllClients } from "../controllers/clientController.js";
import { createCrew, deleteCrew, getAllCrews, getCrewByName } from '../controllers/crewController.js';
import { addDocument, getAllDocuments } from '../controllers/documentController.js';
import { paymentController } from '../controllers/paymentController.js';
import { addCrewToTrips, createTrip, deleteTrip,
     getAllTrips, TripsByClientId,updateTripStatus } from '../controllers/tripController.js';


const router = express.Router();
//auth
router.post('/reg', register);
router.post('/log', login);
router.get('/getAllUsers',getAllUsers)
router.post('/userById', getUsersById)
router.post('/forgetPassword', forgetPassword);
router.put('/updateUser', updateUser);
router.post('/forgetLink', forgetLink);

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

//trips
router.post('/addTripDetails', createTrip);
router.get('/getAllTrips', getAllTrips);
router.post('/deleteTripById', deleteTrip);
router.post('/getAllTripsByClientId', TripsByClientId);
router.post('/addCrewToTrips', addCrewToTrips);
router.put('/updateTripStatus', updateTripStatus);

//document
router.post('/addDocument', addDocument);
router.get('/getAllDocuments', getAllDocuments);

//strip
router.post('/stripPayment', paymentController);
export default router;
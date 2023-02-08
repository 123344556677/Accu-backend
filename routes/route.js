
import express from 'express'
import { createAircraft, getAllAircrafts } from '../controllers/aircraftController.js';
import { register, login, getAllUsers } from "../controllers/authController.js";
import { addBankDetails, getAllDetails } from '../controllers/bankDetails.js';
import { createClient, getAllClients } from "../controllers/clientController.js";
import { createCrew, getAllCrews } from '../controllers/crewController.js';
const router = express.Router();
//auth
router.post('/reg', register);
router.post('/log', login);
router.get('/getAllUsers',getAllUsers)

//client
router.post('/createClient', createClient );
router.get('/getAllClients', getAllClients);

//crew
router.post('/createCrew', createCrew);
router.get('/getAllCrews', getAllCrews);

// bandDetails
router.post('/addBankDetails', addBankDetails );
router.get('/getAllDetails', getAllDetails);

//aircraft
router.post('/addAircraftDetails', createAircraft);
router.get('/getAllAircrafts', getAllAircrafts);
export default router;
import { register,login,getAllUsers } from "../controllers/authController.js";

import express from 'express'
const router = express.Router();

router.post('/reg', register);
router.post('/log', login);
router.get('/getAllUsers',getAllUsers)
export default router;
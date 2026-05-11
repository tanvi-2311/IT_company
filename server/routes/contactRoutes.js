import express from 'express';
import { submitContactForm, subscribeNewsletter, getAllInquiries } from '../controllers/contactController.js';

const router = express.Router();

// Public routes
router.post('/contacts', submitContactForm);
router.post('/subscribe', subscribeNewsletter);

// Protected/Admin route (Ready for JWT or auth middleware)
router.get('/contacts', getAllInquiries);

export default router;

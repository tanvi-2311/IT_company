import express from 'express';
import { getSubAdmins, createSubAdmin, deleteSubAdmin } from '../controllers/userController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);
router.use(requireAdmin);

router.get('/subadmins', getSubAdmins);
router.post('/subadmins', createSubAdmin);
router.delete('/subadmins/:id', deleteSubAdmin);

export default router;

import express from 'express';
import { getDevelopers, createDeveloper, updateDeveloper, deleteDeveloper, uploadResume, deleteResume } from '../controllers/developerController.js';
import { verifyToken, requirePermission } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET / - Public route (needed for client-facing Hire Dedicated Developers marketplace page)
router.get('/', getDevelopers);

// Apply verifyToken to all mutating routes
router.use(verifyToken);

router.post('/', requirePermission('upload'), createDeveloper); 
router.post('/upload-resume', requirePermission('upload'), uploadResume);
router.put('/:id', requirePermission('edit'), updateDeveloper); 

router.post('/delete-resume', requirePermission('delete'), deleteResume);
router.delete('/:id', requirePermission('delete'), deleteDeveloper);

export default router;

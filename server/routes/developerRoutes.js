import express from 'express';
import { getDevelopers, createDeveloper, updateDeveloper, deleteDeveloper, uploadResume, deleteResume } from '../controllers/developerController.js';

const router = express.Router();

router.get('/', getDevelopers);
router.post('/', createDeveloper);
router.post('/upload-resume', uploadResume);
router.post('/delete-resume', deleteResume);
router.put('/:id', updateDeveloper);
router.delete('/:id', deleteDeveloper);

export default router;

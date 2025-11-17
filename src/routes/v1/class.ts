import { Router } from 'express';
import { createClass, updateClass, deleteClass, getAllClasses, getClassById } from '../../controllers/class/class';

const router = Router();

router.post('/', createClass);
router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;

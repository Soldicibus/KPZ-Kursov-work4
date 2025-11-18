import { Router } from 'express';
import { createClass, updateClass, deleteClass, getAllClasses, getClassById } from '../../controllers/class/class';
import { validatorCreate as validatorCreateClass, validatorEdit as validatorEditClass } from 'middleware/validation/class';

const router = Router();

router.post('/', validatorCreateClass, createClass);
router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.put('/:id', validatorEditClass, updateClass);
router.delete('/:id', deleteClass);

export default router;

import { Router } from 'express';
import { createClass, updateClass, deleteClass, getAllClasses, getClassById } from '../../controllers/class/class';
import { validatorCreate as validatorCreateClass, validatorEdit as validatorEditClass } from 'middleware/validation/class';

const router = Router();

router.post('/', validatorCreateClass, createClass);
router.get('/', getAllClasses);
router.get('/:name', getClassById);
router.put('/:name', validatorEditClass, updateClass);
router.delete('/:name', deleteClass);

export default router;

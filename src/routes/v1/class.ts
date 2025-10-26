import { Router } from 'express';
import create from '../../controllers/class/create';
import list from '../../controllers/class/list';
import show from '../../controllers/class/show';
import update from '../../controllers/class/update';
import destroy from '../../controllers/class/destroy';

const router = Router();

router.post('/', create);
router.get('/', list);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;

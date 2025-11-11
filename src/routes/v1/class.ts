import { Router } from 'express';
import create from '../../controllers/class/backup/create';
import list from '../../controllers/class/backup/list';
import show from '../../controllers/class/backup/show';
import update from '../../controllers/class/backup/update';
import destroy from '../../controllers/class/backup/destroy';

const router = Router();

router.post('/', create);
router.get('/', list);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;

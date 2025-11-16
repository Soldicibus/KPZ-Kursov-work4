import { Router } from "express";
import create from "../../controllers/journal/backup/create";
import list from "../../controllers/journal/backup/list";
import show from "../../controllers/journal/backup/show";
import update from "../../controllers/journal/backup/update";
import destroy from "../../controllers/journal/backup/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

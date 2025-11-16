import { Router } from "express";
import create from "../../controllers/subject/backup/create";
import list from "../../controllers/subject/backup/list";
import show from "../../controllers/subject/backup/show";
import update from "../../controllers/subject/backup/update";
import destroy from "../../controllers/subject/backup/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:name", show);
router.put("/:name", update);
router.delete("/:name", destroy);

export default router;

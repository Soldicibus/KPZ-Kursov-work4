import { Router } from "express";
import create from "../../controllers/teachers/backup/create";
import list from "../../controllers/teachers/backup/list";
import show from "../../controllers/teachers/backup/show";
import update from "../../controllers/teachers/update";
import destroy from "../../controllers/teachers/backup/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

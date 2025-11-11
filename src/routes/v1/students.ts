import { Router } from "express";
import create from "../../controllers/students/backup/create";
import list from "../../controllers/students/backup/list";
import show from "../../controllers/students/backup/show";
import update from "../../controllers/students/backup/update";
import destroy from "../../controllers/students/backup/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

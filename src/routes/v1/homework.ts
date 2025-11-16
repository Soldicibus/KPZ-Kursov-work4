import { Router } from "express";
import create from "../../controllers/homework/backup/create";
import list from "../../controllers/homework/backup/list";
import show from "../../controllers/homework/backup/show";
import update from "../../controllers/homework/backup/update";
import destroy from "../../controllers/homework/backup/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

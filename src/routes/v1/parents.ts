import { Router } from "express";
import create from "../../controllers/parents/backup/create";
import list from "../../controllers/parents/backup/list";
import show from "../../controllers/parents/backup/show";
import update from "../../controllers/parents/update";
import destroy from "../../controllers/parents/backup/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

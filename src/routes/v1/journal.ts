import { Router } from "express";
import create from "../../controllers/journal/create";
import list from "../../controllers/journal/list";
import show from "../../controllers/journal/show";
import update from "../../controllers/journal/update";
import destroy from "../../controllers/journal/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

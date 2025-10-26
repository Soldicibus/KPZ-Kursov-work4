import { Router } from "express";
import create from "../../controllers/teachers/create";
import list from "../../controllers/teachers/list";
import show from "../../controllers/teachers/show";
import update from "../../controllers/teachers/update";
import destroy from "../../controllers/teachers/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

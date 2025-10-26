import { Router } from "express";
import create from "../../controllers/parents/create";
import list from "../../controllers/parents/list";
import show from "../../controllers/parents/show";
import update from "../../controllers/parents/update";
import destroy from "../../controllers/parents/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

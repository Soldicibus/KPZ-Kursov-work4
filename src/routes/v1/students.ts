import { Router } from "express";
import create from "../../controllers/students/create";
import list from "../../controllers/students/list";
import show from "../../controllers/students/show";
import update from "../../controllers/students/update";
import destroy from "../../controllers/students/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

import { Router } from "express";
import create from "../../controllers/homework/create";
import list from "../../controllers/homework/list";
import show from "../../controllers/homework/show";
import update from "../../controllers/homework/update";
import destroy from "../../controllers/homework/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

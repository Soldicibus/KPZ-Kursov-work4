import { Router } from "express";
import create from "../../controllers/subject/create";
import list from "../../controllers/subject/list";
import show from "../../controllers/subject/show";
import update from "../../controllers/subject/update";
import destroy from "../../controllers/subject/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:name", show);
router.put("/:name", update);
router.delete("/:name", destroy);

export default router;

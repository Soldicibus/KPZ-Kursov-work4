import { Router } from "express";
import create from "../../controllers/timetable/create";
import list from "../../controllers/timetable/list";
import show from "../../controllers/timetable/show";
import update from "../../controllers/timetable/update";
import destroy from "../../controllers/timetable/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

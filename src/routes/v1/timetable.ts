import { Router } from "express";
import create from "../../controllers/timetable/backup/create";
import list from "../../controllers/timetable/list";
import show from "../../controllers/timetable/backup/show";
import update from "../../controllers/timetable/backup/update";
import destroy from "../../controllers/timetable/backup/destroy";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;

import { Router } from "express";
import add from "../../controllers/studentParent/add";
import remove from "../../controllers/studentParent/remove";

const router = Router();

router.post("/add", add);       // Assign a parent to a student
router.post("/remove", remove); // Remove a parent from a student P.S. HAHA YOU ORPHAN!

export default router;

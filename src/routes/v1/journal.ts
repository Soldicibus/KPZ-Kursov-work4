import { Router } from "express";
import { createJournal, getJournalById, getAllJournals, updateJournal, deleteJournal } from "../../controllers/journal/journal";

const router = Router();

router.post("/", createJournal);
router.get("/", getAllJournals);
router.get("/:id", getJournalById);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;

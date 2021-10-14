import {getAllNotesRepo} from "../repositories/notesAppRepo.js";
import express from "express";
import {addNewNote, editNote, getNoteById, getStats, removeNote} from "../services/notesAppService.js";
const router = express.Router();
const jsonParser = express.json();

router.get('/', (req, res) => {
    res.json(getAllNotesRepo())
})
router.get('/stats/', async (req, res) => {
    try {
        const stats = await getStats();
        res.json(stats);
    } catch (err) {
        res.status(400).send({ error: err })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const note = await getNoteById(req.params.id);
        res.json(note);
    } catch (err) {
        res.status(400).send({ error: err })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await removeNote(req.params.id);
        res.json({id: req.params.id});
    } catch (err) {
        res.status(400).send({ error: err })
    }
})
router.post('/', jsonParser, async (req, res) => {
    try {
        await addNewNote(req.body.note);
        res.json({req: req.body});
    } catch (err) {
        res.status(400).send({ error: err })
    }
})
router.patch('/:id', jsonParser, async (req, res) => {
    try {
        await editNote(req.params.id, req.body.editedNote);
        res.json({req: req.body.editedNote});
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

export default router;
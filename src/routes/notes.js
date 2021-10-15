import {getAllNotesRepo} from "../repositories/notesAppRepo.js";
import express from "express";
import {addNewNote, editNote, getNoteById, getStats, removeNote} from "../services/notesAppService.js";
import {getResponseShape} from "../helpers/shared.js";
import {StatusCodes} from "http-status-codes";
import createError from "http-errors";
const router = express.Router();
const jsonParser = express.json();


// returns:
// notes: [ { * note * }, ... ]
router.get('/', (req, res) => {
    res.json(getResponseShape({ notes: getAllNotesRepo() } , [], StatusCodes.OK))
})
router.get('/stats/', async (req, res, next) => {
    try {
        const stats = await getStats();
        res.json(getResponseShape({ stats }, [], StatusCodes.OK));
    } catch (err) {
        next(createError(StatusCodes.BAD_REQUEST, err))
    }
})
// returns:
// note: { id: number,
//         isActive: bool
//         name: string
//         created: string
//         category: 'Task' | 'Idea' | 'Random Thought'
//         content: string
//         dates: string }
router.get('/:id', async (req, res, next) => {
    try {
        const note = await getNoteById(req.params.id);
        res.json(getResponseShape({ note }, [], StatusCodes.OK));
    } catch (err) {
        next(createError(StatusCodes.BAD_REQUEST, err))
    }
})
router.delete('/:id', async (req, res, next) => {
    try {
        await removeNote(req.params.id);
        res.json(getResponseShape({}, [], StatusCodes.OK));
    } catch (err) {
        next(createError(StatusCodes.BAD_REQUEST, err))
    }
})

// post data:
// note: { isActive: bool
//         name: string
//         created: string
//         category: 'Task' | 'Idea' | 'Random Thought'
//         content: string
//         dates: string }
router.post('/', jsonParser, async (req, res, next) => {
    try {
        await addNewNote(req.body.note);
        res.json(getResponseShape({}, [], StatusCodes.OK));
    } catch (err) {
        next(createError(StatusCodes.BAD_REQUEST, err))
    }
})

// patch data:
// editedNote: {
//         isActive?: bool
//         name?: string
//         created?: string
//         category?: 'Task' | 'Idea' | 'Random Thought'
//         content?: string
//         dates?: string }
router.patch('/:id', jsonParser, async (req, res, next) => {
    try {
        await editNote(req.params.id, req.body.editedNote);
        res.json(getResponseShape({}, [], StatusCodes.OK));
    } catch (err) {
        next(createError(StatusCodes.BAD_REQUEST, err))
    }
})

export default router;
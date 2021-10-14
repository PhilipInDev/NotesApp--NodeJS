import * as Yup from 'yup';
import {
    addNewNoteRepo,
    editItemRepo,
    getNoteByIdRepo,
    getStatsRepo,
    removeNoteRepo
} from "../repositories/notesAppRepo.js";

const yupId = Yup.number('ID must be a number').integer('ID must be an integer').positive('ID must be a positive number').required('ID is required');
const noteShape = Yup.object().shape({
    isActive: Yup.boolean().required('isActive field is required'),
    name: Yup.string().max(50, 'Name must have less than 50 chars').required('Name field is required'),
    created: Yup.string().required('Created field is required'),
    category: Yup.string().required('Category field is required'),
    content: Yup.string().max(150, 'Content must have less than 150 chars').required('Content field is required'),
    dates: Yup.string().required('Dates field is required')
}).strict(true).noUnknown(true).required();
const noteEditedShape = Yup.object({
    isActive: Yup.boolean(),
    name: Yup.string(),
    category: Yup.string(),
    content: Yup.string(),
    dates: Yup.string()
}).strict(true).noUnknown(true);

export const removeNote = async (id) => {
    try {
        await yupId.validate(+id);
        await removeNoteRepo(+id);
    } catch (err) {
        const error = err.message ? err.message : err;
        return Promise.reject(error);
    }
}
export const getNoteById = async (id) => {
    try {
        await yupId.validate(+id);
        return await getNoteByIdRepo(+id);
    } catch (err) {
        const error = err.message ? err.message : err;
        return Promise.reject(error);
    }
}
export const getStats = async () => {
    try {
        return await getStatsRepo()
    } catch (err) {
        return Promise.reject(err)
    }
}
export const addNewNote = async (note) => {
    try {
        await noteShape.validate(note);
        await addNewNoteRepo(note);
        return Promise.resolve(note);
    } catch (err) {
        const error = err.message ? err.message : err;
        return Promise.reject(error);
    }
}
export const editNote = async (id, editedNote) => {
    try {
        await yupId.validate(+id);
        await noteEditedShape.validate(editedNote);
        await editItemRepo(+id, editedNote);
        return Promise.resolve(editedNote);
    } catch (err) {
        const error = err.message ? err.message : err;
        return Promise.reject(error);
    }
}
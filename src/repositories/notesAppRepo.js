import {customAlphabet} from "nanoid";

const categories = ['Task', 'Random Thought', 'Idea'];
const notesAppRepo = [
    {
        id: 1,
        isActive: true,
        name: 'Radency internship',
        created: '4 October 2021',
        category: 'Task',
        content: '18/10/2021',
        dates: '18/10/2021'
    },
    {
        id: 2,
        isActive: true,
        name: 'Dentist',
        created: '20 April 2021',
        category: 'Random Thought',
        content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
        dates: '3/5/2021, 5/5/2021'
    },
    {
        id: 3,
        isActive: false,
        name: 'Riding a bike',
        created: '20 April 2021',
        category: 'Task',
        content: 'Somehow somewhere one time',
        dates: ''
    },
    {
        id: 4,
        isActive: true,
        name: 'Dating with Natalya',
        created: '5 October 2021',
        category: 'Task',
        content: '15/10/2021',
        dates: '15/10/2021'
    },
    {
        id: 5,
        isActive: true,
        name: 'Shopping List',
        created: '20 April 2021',
        category: 'Task',
        content: 'Potatoes - 1kg, Milk - 1.5l, Snickers - 2',
        dates: ''
    },
    {
        id: 6,
        isActive: true,
        name: 'What if',
        created: '20 April 2021',
        category: 'Random Thought',
        content: '...',
        dates: ''
    },
    {
        id: 7,
        isActive: true,
        name: 'Good idea',
        created: '20 April 2021',
        category: 'Idea',
        content: 'Really good idea',
        dates: ''
    }
];

export const addNewNoteRepo = async (note) => {
    const nanoid = customAlphabet('1234567890', 6)
    try {
        note.id = +nanoid();
        notesAppRepo.push(note);
    } catch (err) {
        return Promise.reject(err);
    }
}
export const removeNoteRepo = async (id) => {
    const index = notesAppRepo.findIndex(note => note.id === id);
    if (index >= 0) {
        notesAppRepo.splice(index, 1);
        return Promise.resolve();
    } else {
        return Promise.reject(`Item with id=${id} doesnt exist`)
    }
}
export const editItemRepo = async (id, editedNote) => {
    const index = notesAppRepo.findIndex(note => note.id === id);
    if (index >= 0) {
        notesAppRepo[index] = { ...notesAppRepo[index], ...editedNote }
    } else {
        return Promise.reject(`Item with id=${id} doesnt exist`)
    }
}
export const getNoteByIdRepo = async (id) => {
    const note = notesAppRepo.find(note => note.id === id);
    if (note !== undefined) {
        return Promise.resolve(note)
    } else {
        return Promise.reject(`Item with id=${id} doesnt exist`)
    }
}
export const getAllNotesRepo = () => {
    return notesAppRepo
}
export const getStatsRepo = async () => {
    let active = 0;
    let archived = 0;
    const aggregatedStats = [];
    try {
        await categories.forEach(cat => {
            notesAppRepo.forEach(note => {
                if (note.category === cat) {
                    if (note.isActive) active++;
                    if (!note.isActive) archived++;
                }
            })
            aggregatedStats.push({
                category: cat,
                active,
                archived
            })
            active = 0;
            archived = 0;
        })
    } catch (err) {
        return Promise.reject(err)
    }
    return aggregatedStats;
}
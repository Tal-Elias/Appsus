import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.title) ||
                    regExp.test(note.info.txt))
            }
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        createdAt: 0,
        type: '',
        isPinned: false,
        style: {
            backgroundColor: 'white'
        },
        info: {
            txt: ''
        }
    }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#FFDAB9'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'assets/img/audi.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#87CEEB'
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: '#E6E6FA'
                }
            }
        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote() {
    const note = getEmptyNote()
    note.id = utilService.makeId()
    return note
}
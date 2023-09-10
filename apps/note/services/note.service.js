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

const colors = ['#87CEEB', '#98FB98', '#E6E6FA', '#FFDAB9', '#FFE4E1', '#C8A2C8']

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
                    backgroundColor: '#87CEEB'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#98FB98'
                },
                info: {
                    url: 'assets/img/dan-gold.jpg',
                    title: 'Bobi and Me'
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#E6E6FA'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            },
            {
                id: 'n104',
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#FFDAB9'
                },
                info: {
                    txt: 'Why did the developer go broke? Because he used up all his cache!'
                }
            },
            {
                id: 'n105',
                type: 'NoteVideo',
                isPinned: true,
                style: {
                    backgroundColor: '#87CEEB'
                },
                info: {
                    url: '7PmXTKwk',
                    title: 'Programming in Progress'
                }
            },
            {
                id: 'n106',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#98FB98'
                },
                info: {
                    title: 'Today\'s Goals',
                    todos: [
                        { txt: 'Drink coffee', doneAt: 187111111 },
                        { txt: 'Procrastinate', doneAt: null },
                        { txt: 'Take a nap', doneAt: null }
                    ]
                }
            },
            {
                id: 'n107',
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#FFE4E1'
                },
                info: {
                    txt: 'Why don’t scientists trust atoms? Because they make up everything!'
                }
            },
            {
                id: 'n108',
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#FFDAB9'
                },
                info: {
                    url: 'https://images.unsplash.com/photo-1627719326016-6029c04d1f48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
                    title: 'Dog Programming'
                }
            },
            {
                id: 'n109',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#C8A2C8'
                },
                info: {
                    title: 'Grocery List',
                    todos: [
                        { txt: 'Buy ice cream', doneAt: null },
                        { txt: 'Forget the milk', doneAt: null },
                        { txt: 'Find the cookies', doneAt: null }
                    ]
                }
            },
            {
                id: 'n110',
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#E6E6FA'
                },
                info: {
                    txt: 'Why did the tomato turn red? Because it saw the salad dressing!'
                }
            },
            {
                id: 'n111',
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#87CEEB'
                },
                info: {
                    url: 'https://media.istockphoto.com/id/863084252/photo/baby-sloth.jpg?s=612x612&w=0&k=20&c=IxyW8FMB06g8wJFyNNoKU7Xl24MxztP2xCEbKeOcU_o=',
                    title: 'Sloth Mode Activated'
                }
            },
            {
                id: 'n112',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#FFE4E1'
                },
                info: {
                    title: 'Weekend Plans',
                    todos: [
                        { txt: 'Sleep in', doneAt: null },
                        { txt: 'Watch movies', doneAt: null },
                        { txt: 'Eat snacks', doneAt: null }
                    ]
                }
            },
            {
                id: 'n113',
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#98FB98'
                },
                info: {
                    txt: 'I told my wife she was drawing her eyebrows too high. She looked surprised!'
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
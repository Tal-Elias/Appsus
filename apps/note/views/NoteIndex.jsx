import { noteService } from "../../note/services/note.service.js"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    const [selectedNote, setSelectedNote] = useState(null)
    const [isEditNote, setIsEditNote] = useState(false)

    useEffect(() => {
        noteService.query()
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }, [])

    function onSelectedNote(note) {
        setIsEditNote(true)
        setSelectedNote(note)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                setIsEditNote(false)
                showSuccessMsg('Note Removed!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing note')
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <NoteAdd />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onSelectedNote={onSelectedNote} />
            {isEditNote && <NoteEdit selectedNote={selectedNote} onRemoveNote={onRemoveNote} />}
        </section>
    )
}

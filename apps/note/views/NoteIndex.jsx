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

    function onChangeColor() {

    }

    function onSaveNote(note) {
        noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
                showSuccessMsg('Note Added!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem adding note')
            })
    }

    function onEditNote(editedNote) {
        noteService.save(editedNote)
            .then(() => {
                const updatedNotes = notes.map(note => (note.id === editedNote.id ? editedNote : note))
                setNotes(updatedNotes)
                setIsEditNote(false)
                showSuccessMsg('Note Edited!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem adding note')
            })
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
                showErrorMsg('Problem removing note')
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <NoteAdd onSaveNote={onSaveNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onSelectedNote={onSelectedNote} />
            {isEditNote && <NoteEdit onEditNote={onEditNote} selectedNote={selectedNote} onRemoveNote={onRemoveNote} />}
        </section>
    )
}

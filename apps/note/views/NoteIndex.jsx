import { noteService } from "../../note/services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [selectedNote, setSelectedNote] = useState(null)
    const [isEditNote, setIsEditNote] = useState(false)
    const [isNoteEditOpen, setIsNoteEditOpen] = useState(false)

    useEffect(() => {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }, [filterBy])

    function onSelectedNote(note) {
        setIsEditNote(true)
        setSelectedNote(note)
        setIsNoteEditOpen(true)
    }

    function onChangeBgColor() {

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
            <div className="note-header">
            <div className="fa note-icon">ICON</div>
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </div>
            <hr />
            <NoteAdd onSaveNote={onSaveNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote}
                onSelectedNote={onSelectedNote} onChangeBgColor={onChangeBgColor} />
            <div className={`note-edit-backdrop ${isNoteEditOpen ?
                'note-edit-backdrop-entered' :
                'note-edit-backdrop-exited'}`}
                onClick={() => setIsNoteEditOpen(false)}>
                {isEditNote && <NoteEdit onEditNote={onEditNote}
                    selectedNote={selectedNote} onRemoveNote={onRemoveNote} />}
            </div>
        </section>
    )
}

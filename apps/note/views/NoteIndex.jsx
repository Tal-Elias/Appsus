import { noteService } from "../../note/services/note.service.js"
import { utilService } from "../../../services/util.service.js"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
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
            .catch(err => console.error('Error geting notes:', err))
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(setNotes)
    }

    function onSelectedNote(note) {
        setIsEditNote(true)
        setSelectedNote(note)
        setIsNoteEditOpen(true)
    }

    function onSaveNote(note) {
        noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
                showSuccessMsg('Note Added!')
            })
            .catch(err => {
                console.error('Error saving note:', err)
                showErrorMsg('Problem adding note')
            })
    }

    function onEditNote(editedNote) {
        console.log('editedNote:', editedNote)
        noteService.save(editedNote)
            .then(() => {
                const updatedNotes = notes.map(note => (note.id === editedNote.id ? editedNote : note))
                setNotes(updatedNotes)
                setIsEditNote(false)
                showSuccessMsg('Note Edited!')
            })
            .catch(err => {
                console.error('Error editing note:', err)
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
                console.error('Error removing note:', err)
                showErrorMsg('Problem removing note')
            })
    }

    function onDuplicateNote(note) {
        const newNote = { ...note, id: null }
        noteService.save(newNote)
            .then(note => {
                setNotes(prevNotes => [...prevNotes, note])
                showSuccessMsg('Note Duplicated')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem duplicating note')
            })
    }

    function onChangeBgColor(note, color) {
        const newNote = { ...note }
        newNote.style = { backgroundColor: color }
        setNotes((prevNotes) =>
            prevNotes.map((note) => note.id === newNote.id ? newNote : note))
        noteService.save(newNote)
            .then(() => {
                console.log('Note background changed!');
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem changing background')
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function togglePinned(note) {
        const newNote = { ...note, isPinned: !note.isPinned }
        noteService.save(newNote).then(loadNotes)
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <NoteAdd onSaveNote={onSaveNote} />
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onSelectedNote={onSelectedNote}
                togglePinned={togglePinned}
                onChangeBgColor={onChangeBgColor}
                onDuplicateNote={onDuplicateNote}
            />
            <div className={`note-edit-backdrop ${isNoteEditOpen ?
                'note-edit-backdrop-entered' :
                'note-edit-backdrop-exited'}`}
                onClick={() => setIsNoteEditOpen(false)}>
                {isEditNote && <NoteEdit
                    onEditNote={onEditNote}
                    selectedNote={selectedNote}
                    onRemoveNote={onRemoveNote}
                    onChangeBgColor={onChangeBgColor}
                    onDuplicateNote={onDuplicateNote}
                    isNoteEditOpen={isNoteEditOpen}
                />}
            </div>
        </section>
    )
}

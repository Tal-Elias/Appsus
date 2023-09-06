import { noteService } from "../../note/services/note.service.js"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }, [])

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
        .then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            // showSuccessMsg('Note Added!')
        })
        .catch(err => {
            console.log('err:', err)
            // showErrorMsg('Problem Removing note')
        })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteAdd />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}

import { NotePreview } from "../cmps/NotePreview.jsx"
import { noteService } from "../../note/services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }, [])

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            {notes.map(note =>
                <div key={note.id}>
                    <NotePreview note={note} />
                </div>)}
        </section>
    )
}

import { NotePreview } from "./NotePreview.jsx";
import { noteService } from "../services/note.service.js";

const { useState } = React

export function NoteEdit({ selectedNote, onRemoveNote }) {

    const [noteToEdit, setNoteToEdit] = useState(selectedNote)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToEdit(prevNoteToEdit => {
            if (field === 'txt') {
                return {
                    ...prevNoteToEdit,
                    info: { ...prevNoteToEdit.info, txt: value }
                }
            }
            return { ...prevNoteToEdit, [field]: value }
        })
    }

    function onEditNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => console.log('added'))
            .catch(err => console.log('err:', err))
    }

    return (
        <div className="note-edit">
            {/* <NotePreview note={selectedNote} onRemoveNote={onRemoveNote} /> */}
            <form onSubmit={onEditNote}>
                <input onChange={handleChange} value={noteToEdit.info.txt} type="text" name="txt" />
            </form>
            <pre>{JSON.stringify(selectedNote, null, 2)}</pre>
            <button onClick={() => onRemoveNote(selectedNote.id)}>X</button>
            {/* TOOL-BAR */}
        </div>
    )
}
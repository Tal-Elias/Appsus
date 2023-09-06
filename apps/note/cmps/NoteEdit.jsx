import { NotePreview } from "./NotePreview.jsx";

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteEdit({ selectedNote, onRemoveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(selectedNote)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToAdd(prevNoteToEdit => {
            if (field === 'txt') {
                return {
                    ...prevNoteToEdit,
                    info: { ...prevNoteToEdit.info, txt: value }
                }
            }
            return { ...prevNoteToEdit, [field]: value }
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd)
            .then(() => console.log('added'))
            .catch(err => console.log('err:', err))
    }

    const { info } = selectedNote

    return (
        <div className="note-edit">
            {/* <NotePreview note={selectedNote} onRemoveNote={onRemoveNote} /> */}
            <form>
            <input onSubmit={onSaveNote} onChange={handleChange} value={info.txt} type="text" name="txt" placeholder={selectedNote.info.txt} />
            </form>
            <pre>{JSON.stringify(selectedNote, null, 2)}</pre>
            <button onClick={() => onRemoveNote(selectedNote.id)}>X</button>
            {/* TOOL-BAR */}
        </div>
    )
}
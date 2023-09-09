import { NotePreview } from "./NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { NoteToolBar } from "./NoteToolBar.jsx"

const { useState } = React

export function NoteEdit({ onEditNote, selectedNote, onRemoveNote, onChangeBgColor }) {

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

    function handleEdit(ev) {
        ev.preventDefault()
        onEditNote(noteToEdit)
    }

    // function onEditNote(ev) {
    //     ev.preventDefault()
    //     noteService.save(noteToEdit)
    //         .then(() => console.log('added'))
    //         .catch(err => console.log('err:', err))
    // }

    console.log('selectedNote:', selectedNote)

    return (
        <div className="note-edit">
            {/* <NotePreview note={selectedNote} onRemoveNote={onRemoveNote} /> */}
            <form onSubmit={(ev) => handleEdit(ev)}>
                <input onChange={handleChange} value={noteToEdit.info.txt} type="text" name="txt" />
            </form>
            {/* <pre>{JSON.stringify(selectedNote, null, 2)}</pre> */}
            {/* <button onClick={() => onRemoveNote(selectedNote.id)}>X</button> */}
            <NoteToolBar note={selectedNote} onRemoveNote={onRemoveNote} onChangeBgColor={onChangeBgColor}/>
            {/* TOOL-BAR */}
        </div>
    )
}
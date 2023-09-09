import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteAdd({ onSaveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [isExpanded, setIsExpanded] = useState(false)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToAdd(prevNoteToEdit => {
            if (field === 'txt') {
                return {
                    ...prevNoteToEdit,
                    info: { ...prevNoteToEdit.info, txt: value },
                    type: 'NoteTxt'
                }
            }
            return { ...prevNoteToEdit, [field]: value }
        })
    }

    function handleAdd(ev) {
        ev.preventDefault()
        onSaveNote(noteToAdd)
        // setIsExpanded(!isExpanded)
    }

    const { info } = noteToAdd

    return (
        <div className="note-add">
            <form onSubmit={(ev) => handleAdd(ev)}>
                <div className="add-input-wrapper">
                    <input
                        // onClick={() => setIsExpanded(!isExpanded)}
                        onChange={handleChange}
                        value={info.txt}
                        type="text"
                        name="txt"
                        placeholder="Take a note..."
                    />
                    {
                        <div className="note-type">
                            <button type="button" className="fa list"></button>
                            <button type="button" className="fa image"></button>
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}
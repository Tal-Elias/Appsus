import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteAdd({ onAddNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

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

    function handleAdd(ev) {
        ev.preventDefault()
        onAddNote(noteToAdd)
    }

    // function onAddNote(ev) {
    //     ev.preventDefault()
    //     noteService.save(noteToAdd)
    //         .then(() => console.log('added'))
    //         .catch(err => console.log('err:', err))
    // }

    const { info } = noteToAdd

    return (
        <div className="note-add">
            <form onSubmit={(ev) => handleAdd(ev)}>
                <input onChange={handleChange} value={info.txt} type="text" name="txt" placeholder="Take a note..." />
            </form>
        </div>
    )
}
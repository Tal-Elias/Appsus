import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteAdd() {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())

    useEffect(() => {

    }, [])

    function onSaveNote(value) {
        ev.preventDefault()
        console.log('value:', value)
        noteService.save(noteToAdd)
            .then(() => console.log('added:', added))
            .catch(err => console.log('err:', err))
    }

    const { info } = noteToAdd

    return (
        <section className="note-add">
            <form>
                <input type="text" name="txt" placeholder="Take a note..."
                    onChange={(ev) => { onSaveNote(ev.target.value) }} />
            </form>
        </section>
    )
}
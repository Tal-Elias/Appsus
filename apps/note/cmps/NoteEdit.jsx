import { NotePreview } from "./NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { NoteToolBar } from "./NoteToolBar.jsx"

const { useState } = React

export function NoteEdit({ onEditNote, selectedNote, onRemoveNote, onChangeBgColor }) {

    const [noteToEdit, setNoteToEdit] = useState(selectedNote)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

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

    return (
        <div className="note-edit" style={selectedNote.style}>
            <DynamicCmp type={selectedNote.type} info={selectedNote.info} />
            <NoteToolBar note={selectedNote} onRemoveNote={onRemoveNote} onChangeBgColor={onChangeBgColor} />
        </div>
    )
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }
}

function NoteTxt({ info }) {
    const { txt } = info
    return (
        <section className="note-txt">
            <div className="txt">{txt}</div>
        </section>
    )
}

function NoteImg({ info }) {
    const { url } = info
    return (
        <img src={url} alt="" />
    )
}

function NoteTodos({ info }) {
    const { todos } = info
    return (
        <ul>
            {
                todos.map(todo => <li key={todo.txt}>{todo.txt}</li>)
            }
        </ul>
    )
}
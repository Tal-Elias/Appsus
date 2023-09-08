import { NoteColorPalette } from "./NoteColorPalette.jsx"
import { NotePreview } from "./NotePreview.jsx"
import { NoteToolBar } from "./NoteToolBar.jsx"

export function NoteList({ notes, onRemoveNote, onSelectedNote, onChangeBgColor }) {

    return (
        <section className="note-list">
            {
                notes.map(note =>
                    <div className="note-preview" key={note.id} onClick={() => onSelectedNote(note)} style={note.style}>
                        <DynamicCmp type={note.type} info={note.info} onSelectedNote={onSelectedNote} />
                        <NoteToolBar note={note} onRemoveNote={onRemoveNote} onChangeBgColor={onChangeBgColor} />
                        <NoteColorPalette note={note} onChangeBgColor={onChangeBgColor} />
                    </div>)
            }
        </section>
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
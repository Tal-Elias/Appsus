import { NotePreview } from "./NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { NoteToolBar } from "./NoteToolBar.jsx"
import { NoteColorPalette } from "./NoteColorPalette.jsx"

const { useState, useEffect } = React

export function NoteEdit({ onEditNote, selectedNote, onRemoveNote, onChangeBgColor }) {

    const [noteToEdit, setNoteToEdit] = useState(selectedNote)
    const [isColorPaletteOpen, setColorPaletteOpen] = useState(false)
    const [answersMap, setAnswersMap] = useState({})

    useEffect(() => {
        
    }, [])

    function onChangeVal(id, val) {

        const answersToSave = { ...answersMap }
        answersToSave[id] = val
        setAnswersMap(answersToSave)
    }

    function handleNoteClick(ev) {
        ev.stopPropagation()
    }

    function toggleColorPalette() {
        if (isColorPaletteOpen) {
            setColorPaletteOpen(false)
        } else {
            setColorPaletteOpen(true)
        }
    }

    if (!noteToEdit) return <div>loading..</div>

    return (
        <div className="note-edit" style={selectedNote.style}
            onClick={handleNoteClick}
        >
            <DynamicCmp type={noteToEdit.type}
                info={noteToEdit.info}
                val={answersMap[noteToEdit.id] || ''}
                onChangeVal={(val) => {
                    onChangeVal(noteToEdit.id, val)
                }}
            />
            <NoteToolBar note={noteToEdit}
                onRemoveNote={onRemoveNote}
                toggleColorPalette={() => toggleColorPalette()}
            />
            {isColorPaletteOpen && (
                <NoteColorPalette note={noteToEdit}
                onChangeBgColor={onChangeBgColor}
                />
            )}
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

function NoteTxt({ info, val = '', onChangeVal }) {
    const { txt } = info
    return (
        <section className="note-txt">
            <input type="text" value={txt} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }} />
        </section>
    )
}

function NoteImg({ info }) {
    const { url } = info
    return (
        <section className="note-img">
            <img src={url} alt="" />
        </section>
    )
}

function NoteTodos({ info }) {
    const { todos } = info
    return (
        <section className="note-todos">
            <ul>
                {
                    todos.map(todo => <li key={todo.txt}>{todo.txt}</li>)
                }
            </ul>
        </section>
    )
}
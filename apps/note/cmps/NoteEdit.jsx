import { NoteToolBar } from "./NoteToolBar.jsx"
import { NoteColorPalette } from "./NoteColorPalette.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteEdit({ onEditNote, selectedNote, onRemoveNote, onChangeBgColor, onDuplicateNote }) {

    const [noteToEdit, setNoteToEdit] = useState(selectedNote)
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false)
    const [answersMap, setAnswersMap] = useState({})

    useEffect(() => {
        setNoteToEdit(selectedNote)
        return () => {
            if (noteToEdit.info !== selectedNote.info) onEditNote(noteToEdit)
        }
    }, [selectedNote])

    function onChangeVal(id, val) {

        const answersToSave = { ...answersMap }
        answersToSave[id] = val
        setAnswersMap(answersToSave)

        let newNote = { ...noteToEdit }
        newNote.info.txt = val
        setNoteToEdit(newNote)
    }

    function handleNoteClick(ev) {
        ev.stopPropagation()
    }

    function toggleColorPalette() {
        if (isColorPaletteOpen) {
            setIsColorPaletteOpen(false)
        } else {
            setIsColorPaletteOpen(true)
        }
    }

    if (!noteToEdit) return <div>loading..</div>

    return (
        <div className="note-edit" style={selectedNote.style}
            onClick={handleNoteClick}
        >
            <DynamicCmp type={noteToEdit.type}
                info={noteToEdit.info}
                val={answersMap[noteToEdit.id] || noteToEdit.info.txt}
                onChangeVal={(val) => {
                    onChangeVal(noteToEdit.id, val, noteToEdit.type)
                }}
            />
            <NoteToolBar note={noteToEdit}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
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
            <form>
                <input type="text" value={val} onChange={(ev) => {
                    onChangeVal(ev.target.value)
                }} />
            </form>
        </section>
    )
}

function NoteImg({ info, val = '', onChangeVal }) {
    const { url } = info
    return (
        <section className="note-img">
            <img src={url} alt="" />
        </section>
    )
}

function NoteTodos({ info, val = '', onChangeVal }) {
    const { todos } = info
    return (
        <section className="note-todos">
            <ul>
                {
                    todos.map(todo => <li key={todo.txt}><input type="checkbox"></input>{todo.txt}</li>)
                }
            </ul>
        </section>
    )
}
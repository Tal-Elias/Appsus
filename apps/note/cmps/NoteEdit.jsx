import { NoteToolBar } from "./NoteToolBar.jsx"
import { NoteColorPalette } from "./NoteColorPalette.jsx"

const { useState, useEffect } = React

export function NoteEdit({
    onEditNote,
    isNoteEditOpen,
    selectedNote,
    onRemoveNote,
    onChangeBgColor,
    onDuplicateNote,
    togglePinned
}) {

    const [noteToEdit, setNoteToEdit] = useState(selectedNote)
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false)
    const [answersMap, setAnswersMap] = useState({})
    const [hasEdits, setHasEdits] = useState(false)

    useEffect(() => {
        setNoteToEdit(selectedNote)
        setHasEdits(false)
    }, [selectedNote])

    useEffect(() => {
        if (hasEdits && !isNoteEditOpen) {
            onEditNote(noteToEdit)
        }
    }, [hasEdits, isNoteEditOpen])

    function onChangeVal(id, val) {
        const answersToSave = { ...answersMap }
        answersToSave[id] = val
        setAnswersMap(answersToSave)

        let newNote = { ...noteToEdit }

        switch (noteToEdit.type) {
            case 'NoteTxt':
                newNote.info.txt = val
                break
            case 'NoteImg':
                newNote.info.url = val
                break
            case 'NoteTodos':
                newNote.info.todos = val
                break
            case 'NoteVideo':
                newNote.info.url = val
                break

            default:
                break
        }

        setNoteToEdit(newNote)
        setHasEdits(true)
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
            <DynamicCmp
                type={noteToEdit.type}
                info={noteToEdit.info}
                val={
                    noteToEdit.type === 'NoteTxt'
                        ? answersMap[noteToEdit.id] || noteToEdit.info.txt
                        : noteToEdit.type === 'NoteImg'
                            ? answersMap[noteToEdit.id] || noteToEdit.info.url
                            : noteToEdit.type === 'NoteTodos'
                                ? answersMap[noteToEdit.id] || noteToEdit.info.todos
                                : null
                }
                onChangeVal={(val) => {
                    onChangeVal(noteToEdit.id, val)
                }}
            />
            <NoteToolBar
                note={noteToEdit}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                toggleColorPalette={() => toggleColorPalette()}
                isNoteEditOpen={isNoteEditOpen}
                togglePinned={togglePinned}
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
        case 'NoteVideo':
            return <NoteVideo {...props} />
    }
}

function NoteTxt({ info, val, onChangeVal }) {
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

function NoteImg({ info, val, onChangeVal }) {
    const { url } = info
    return (
        <section className="note-img">
            <form>
                <input type="text" value={val} onChange={(ev) => {
                    onChangeVal(ev.target.value)
                }} />
            </form>
            <img src={url} alt="" />
        </section>
    )
}

function NoteTodos({ info, val, onChangeVal }) {
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

function NoteVideo({ info, val, onChangeVal }) {
    const { url } = info
    return (
        <section className="note-video">
            <form>
                <input type="text" value={val} onChange={(ev) => {
                    onChangeVal(ev.target.value)
                }} />
            </form>
            <iframe
                title="YouTube Video"
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${url}`}
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </section>
    )
}
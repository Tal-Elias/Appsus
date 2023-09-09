import { NoteColorPalette } from "./NoteColorPalette.jsx"
import { NoteToolBar } from "./NoteToolBar.jsx"
import { NoteTxt } from "./DynamicCmps/NoteTxt.jsx"
import { NoteImg } from "./DynamicCmps/NoteImg.jsx"
import { NoteTodos } from "./DynamicCmps/NoteTodos.jsx"

const { useState, useEffect } = React

function NotePreview(props) {
    switch (props.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }
}

export function NoteList({ notes, onRemoveNote, onSelectedNote, onChangeBgColor, onDuplicateNote, togglePinned }) {

    const [visibleNoteId, setVisibleNoteId] = useState(null)
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false)

    function toggleColorPalette(noteId) {
        if (visibleNoteId === noteId && isColorPaletteOpen) {
            setVisibleNoteId(null)
            setIsColorPaletteOpen(false)
        } else {
            setVisibleNoteId(noteId)
            setIsColorPaletteOpen(true)
        }
    }

    return (
        <section className="note-list">
            {
                notes.map(note =>
                    <div className="note-preview" key={note.id} onClick={() => onSelectedNote(note)} style={note.style}>
                        <NotePreview type={note.type}
                            info={note.info}
                            onSelectedNote={onSelectedNote}
                            togglePinned={togglePinned}
                        />
                        <NoteToolBar note={note}
                            onRemoveNote={onRemoveNote}
                            toggleColorPalette={toggleColorPalette}
                            onDuplicateNote={onDuplicateNote}
                        />
                        {visibleNoteId === note.id && isColorPaletteOpen && (
                            <NoteColorPalette note={note}
                                onChangeBgColor={onChangeBgColor}
                            />
                        )}
                    </div>)
            }
        </section>
    )
}
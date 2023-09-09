import { NoteColorPalette } from "./NoteColorPalette.jsx"
import { NoteToolBar } from "./NoteToolBar.jsx"
import { NoteTxt } from "./DynamicCmps/NoteTxt.jsx"
import { NoteImg } from "./DynamicCmps/NoteImg.jsx"
import { NoteTodos } from "./DynamicCmps/NoteTodos.jsx"
import { NoteVideo } from "./DynamicCmps/NoteVideo.jsx"

const { useState } = React

function NotePreview(props) {
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

export function NoteList({
    notes,
    onRemoveNote,
    onSelectedNote,
    onChangeBgColor,
    onDuplicateNote,
    togglePinned
}) {

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

    const sortedNotes = [...notes].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return 0
    })

    const pinnedNotes = sortedNotes.filter(note => note.isPinned)
    const unpinnedNotes = sortedNotes.filter(note => !note.isPinned)

    return (
        <section className="note-list">
            <section className="pinned-notes-container">
                {pinnedNotes.map(note => (
                    <div className="note-preview"
                        key={note.id}
                        onClick={() =>
                            onSelectedNote(note)} style={note.style}
                    >
                        <NotePreview
                            type={note.type}
                            info={note.info}
                            onSelectedNote={onSelectedNote}
                            togglePinned={togglePinned}
                        />
                        <NoteToolBar
                            note={note}
                            onRemoveNote={onRemoveNote}
                            toggleColorPalette={toggleColorPalette}
                            onDuplicateNote={onDuplicateNote}
                            togglePinned={togglePinned}
                        />
                        {visibleNoteId === note.id && isColorPaletteOpen && (
                            <NoteColorPalette
                                note={note}
                                onChangeBgColor={onChangeBgColor}
                            />
                        )}
                    </div>
                ))}
            </section>

            <section className="unpinned-notes">
                {unpinnedNotes.map(note => (
                    <div className="note-preview"
                        key={note.id}
                        onClick={() => onSelectedNote(note)} style={note.style}
                    >
                        <NotePreview
                            type={note.type}
                            info={note.info}
                            onSelectedNote={onSelectedNote}
                            togglePinned={togglePinned}
                        />
                        <NoteToolBar
                            note={note}
                            onRemoveNote={onRemoveNote}
                            toggleColorPalette={toggleColorPalette}
                            onDuplicateNote={onDuplicateNote}
                            togglePinned={togglePinned}
                        />
                        {visibleNoteId === note.id && isColorPaletteOpen && (
                            <NoteColorPalette
                                note={note}
                                onChangeBgColor={onChangeBgColor}
                            />
                        )}
                    </div>
                ))}
            </section>
        </section>
    )
}
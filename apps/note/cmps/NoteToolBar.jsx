export function NoteToolBar({
    note,
    isNoteEditOpen,
    onRemoveNote,
    toggleColorPalette,
    onDuplicateNote,
    togglePinned
}) {

    function handleToolBarClick(ev) {
        ev.stopPropagation()
    }

    const toolbarClassName = `note-toolbar ${isNoteEditOpen ? 'edit' : ''}`

    return (
        <section className={toolbarClassName} onClick={handleToolBarClick}>
            <button className="fa bg-color" onClick={() => toggleColorPalette(note.id)}></button>
            <button className="fa-notes duplicate" onClick={() => onDuplicateNote(note)}></button>
            <button className="fa-notes image"></button>
            <button className="fa thumbtack" onClick={() => togglePinned(note)}></button>
            <button className="fa-notes remove" onClick={() => onRemoveNote(note.id)}></button>
        </section>
    )
}
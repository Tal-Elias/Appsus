export function NoteToolBar({ note, onRemoveNote, toggleColorPalette }) {

    function handleToolBarClick(ev) {
        ev.stopPropagation();
    }

    return (
        <section className="note-toolbar" onClick={handleToolBarClick}>
            <button className="fa bg-color" onClick={() => toggleColorPalette(note.id)}></button>
            <button className="fa duplicate"></button>
            <button className="fa image"></button>
            <button className="fa remove" onClick={() => onRemoveNote(note.id)}></button>

        </section>
    )
}
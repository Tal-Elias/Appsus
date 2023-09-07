export function NoteToolBar({ note, onRemoveNote }) {
    return (
        <section className="note-toolbar">
            <button className="fa bg-color">
                {/* <select className="color-select">
                    <option value="soft-blue"></option>
                    <option value="pale-green"></option>
                    <option value="lavender"></option>
                    <option value="peach"></option>
                    <option value="misty-rose"></option>
                    <option value="lilac"></option>
                </select> */}
            </button>
            <button className="fa remove" onClick={() => onRemoveNote(note.id)}></button>
        </section>
    )
}
export function NotePreview({ note, onRemoveNote, onSelectedNote }) {

    return (
        <div className="note-preview" onClick={() => onSelectedNote(note)}>
            <pre>{JSON.stringify(note, null, 2)}</pre>
            <button onClick={() => onRemoveNote(note.id)}>X</button>
            {/* TOOL-BAR */}
        </div>
    )
}
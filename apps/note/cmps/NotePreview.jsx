export function NotePreview({ note, onRemoveNote }) {

    return (
        <div className="note-preview">
            <pre>{JSON.stringify(note, null, 2)}</pre>
            <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    )
}
export function NotePreview({ note }) {

    return (
        <div className="note-preview">
            <h2>Note Id: {note.id}</h2>
            <h2>Note Type: {note.type}</h2>
        </div>
    )
}
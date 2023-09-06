export function NoteToolBar({ note, onRemoveNote }) {
    return(
        <button onClick={() => onRemoveNote(note.id)}>X</button>
    )
}
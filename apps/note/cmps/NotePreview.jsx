import { NoteColorPalette } from "./NoteColorPalette.jsx"
import { NoteToolBar } from "./NoteToolBar.jsx"

export function NotePreview({ note, onRemoveNote, onSelectedNote, onChangeBgColor }) {

    return (
        <div onClick={() => onSelectedNote(note)} className="note-preview">
            <div onClick={() => onSelectedNote(note)}>
            <div className="txt">{note.info.txt}</div>
            {/* <NoteColorPalette /> */}
            </div>
            {/* <NoteToolBar note={note} onRemoveNote={onRemoveNote} onChangeBgColor={onChangeBgColor}/> */}
        </div>
    )
}


// return (
//     <div className="note-preview" onClick={() => onSelectedNote(note)}>
//         <div className="txt">{note.info.txt}</div>
//         <NoteToolBar note={note} onRemoveNote={onRemoveNote} />
//         <pre>{JSON.stringify(note, null, 2)}</pre>
//         <button onClick={() => onRemoveNote(note.id)}>X</button>
//     </div>
// )
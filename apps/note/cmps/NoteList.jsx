import { NotePreview } from "./NotePreview.jsx"
import { NoteToolBar } from "./NoteToolBar.jsx"

export function NoteList({ notes, onRemoveNote, onSelectedNote, onChangeBgColor }) {

    return (
        <section className="note-list">
            {notes.map(note =>
                <div className="note-container" key={note.id}>
                    <NotePreview note={note} onSelectedNote={onSelectedNote} />
                    <NoteToolBar note={note} onRemoveNote={onRemoveNote} onChangeBgColor={onChangeBgColor}/>
                </div>)}
        </section>
    )
}

// function DynamicCmp(props) {
//     switch (props.type) {
//         case 'Txt':
//             return <NoteTxt {...props} />
//         case 'Img':
//             return <NoteImg {...props} />
//         case 'Video':
//             return <NoteVideo {...props} />
//         case 'Todos':
//             return <NoteTodos {...props} />
//     }
// }

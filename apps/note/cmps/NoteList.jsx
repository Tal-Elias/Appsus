import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {

    return (
        <section className="note-list">
            {notes.map(note =>
                <div key={note.id}>
                    <NotePreview note={note} onRemoveNote={onRemoveNote} />
                </div>)}
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'Txt':
            return <NoteTxt {...props} />
        case 'Img':
            return <NoteImg {...props} />
        case 'Video':
            return <NoteVideo {...props} />
        case 'Todos':
            return <NoteTodos {...props} />
    }
}

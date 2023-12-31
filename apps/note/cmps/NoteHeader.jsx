import { NoteFilter } from "./NoteFilter.jsx"

export function NoteHeader({ filterBy, onSetFilterBy }) {
    return (
        <div className="note-header">
            {/* <div className="fa note-icon"></div> */}
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        </div>
    )
}

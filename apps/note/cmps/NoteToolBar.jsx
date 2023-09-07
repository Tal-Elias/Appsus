import { NoteColorPalette } from "./NoteColorPalette.jsx"

const { useState, useEffect } = React

export function NoteToolBar({ note, onRemoveNote }) {

    const [isColorPalette, setIsColorPalette] = useState(false)

    return (
        <section className="note-toolbar">
            <button onClick={() => showColorPalette()} className="fa bg-color"></button>
                {/* <select className="color-select">
                    <option value="soft-blue"></option>
                    <option value="pale-green"></option>
                    <option value="lavender"></option>
                    <option value="peach"></option>
                    <option value="misty-rose"></option>
                    <option value="lilac"></option>
                </select> */}
            <button className="fa remove" onClick={() => onRemoveNote(note.id)}></button>
            
        </section>
    )
}
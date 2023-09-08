export function NoteColorPalette({ note, onChangeBgColor }) {
    return (
        <section className="note-color-palette">
            {/* <select className="color-select"> */}
            <div onClick={() => onChangeBgColor(note, 'soft-blue')} value="soft-blue"></div>
            <div onClick={() => onChangeBgColor(note, 'pale-green')} value="pale-green"></div>
            <div onClick={() => onChangeBgColor(note, 'lavender')} value="lavender"></div>
            <div onClick={() => onChangeBgColor(note, 'peach')} value="peach"></div>
            <div onClick={() => onChangeBgColor(note, 'misty-rose')} value="misty-rose"></div>
            <div onClick={() => onChangeBgColor(note, 'lilac')} value="lilac"></div>
            {/* </select> */}
        </section>
    )
}
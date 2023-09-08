export function NoteColorPalette({ note, onChangeBgColor }) {
    console.log('note:', note)

    function handleColorPaletteClick(ev) {
        ev.stopPropagation()
    }

    return (
        <section className="note-color-palette" onClick={handleColorPaletteClick}>
            <div onClick={() => onChangeBgColor(note, '#87CEEB')} value="soft-blue"></div>
            <div onClick={() => onChangeBgColor(note, '#98FB98')} value="pale-green"></div>
            <div onClick={() => onChangeBgColor(note, '#E6E6FA')} value="lavender"></div>
            <div onClick={() => onChangeBgColor(note, '#FFDAB9')} value="peach"></div>
            <div onClick={() => onChangeBgColor(note, '#FFE4E1')} value="misty-rose"></div>
            <div onClick={() => onChangeBgColor(note, '#C8A2C8')} value="lilac"></div>
        </section>
    )
}
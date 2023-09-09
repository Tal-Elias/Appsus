export function NoteColorPalette({ note, onChangeBgColor }) {
    const colors = ['#87CEEB', '#98FB98', '#E6E6FA', '#FFDAB9', '#FFE4E1', '#C8A2C8']

    function handleColorPaletteClick(ev) {
        ev.stopPropagation()
    }

    return (
        <section className="note-color-palette" onClick={handleColorPaletteClick}>
            {
                colors.map(color => (
                    <div
                        key={color}
                        style={{ backgroundColor: color }}
                        onClick={() => onChangeBgColor(note, color)}>
                    </div>
                ))
            }
        </section>
    )
}
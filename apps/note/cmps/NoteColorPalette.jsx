export function NoteColorPalette() {
    return (
        <section className="note-color-palette">
            {/* <select className="color-select"> */}
                <div onClick={()=>console.log('color')} value="soft-blue"></div>
                <div onClick={()=>console.log('color')} value="pale-green"></div>
                <div value="lavender"></div>
                <div value="peach"></div>
                <div value="misty-rose"></div>
                <div value="lilac"></div>
            {/* </select> */}
        </section>
    )
}
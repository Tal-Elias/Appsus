export function NoteImg({ info }) {
    const { url } = info
    return (
        <section className="note-img">
            <img src={url} alt="" />
        </section>
    )
}
export function NoteTxt({ info }) {
    const { txt } = info
    return (
        <section className="note-txt">
            <div className="txt">{txt}</div>
        </section>
    )
}
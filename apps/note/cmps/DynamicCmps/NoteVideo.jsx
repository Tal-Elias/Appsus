export function NoteVideo({ info }) {
    const { url } = info

    return (
        <section className="note-video">
            <iframe
                title="YouTube Video"
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${url}`}
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </section>
    )
}

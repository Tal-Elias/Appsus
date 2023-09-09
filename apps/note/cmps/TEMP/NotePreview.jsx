import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NotePreview({ note, onSelectedNote }) {
    // console.log('note:', note.id)
    // const [note, setNote] = useState(note)

    // useEffect(() => {
    //     noteService.query()
    //         .then(setNote)
    //         .catch(err => console.log('err:', err))
    // }, [])

    if (!note) return <div>loading...</div>

    return (
        <section className="note-preview" style={note.style}>
            <DynamicCmp key={note.id} type={note.type} info={note.info} />
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }
}

function NoteTxt({ info }) {
    const { txt } = info
    return (
        <section className="note-txt">
            <div className="txt">{txt}</div>
        </section>
    )
}

function NoteImg({ info }) {
    const { url } = info
    return (
        <img src={url} alt="" />
    )
}

function NoteTodos({ info }) {
    const { todos } = info
    return (
        <ul>
            {
                todos.map(todo => <li key={todo.txt}>{todo.txt}</li>)
            }
        </ul>
    )
}

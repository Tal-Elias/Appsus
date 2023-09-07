import { noteService } from "../services/note.service.js"
import { NoteTxt } from "./NoteTxt.jsx"

const { useState, useEffect } = React

export function NoteAdd({ onSaveNote }) {

    const [notes, setNotes] = useState(null)
    const [answersMap, setAnswersMap] = useState({})

    useEffect(() => {
        noteService.getById()
            .then(notes => {
                setNotes(notes)
            })
    }, [])

    function onChangeVal(id, val) {

        const answersToSave = { ...answersMap }
        answersToSave[id] = val
        setAnswersMap(answersToSave)
    }


    // const { info } = noteToAdd

    if (!notes) return <div>loading...</div>

    return (
        <section className="notes-app">
            {
                notes.cmps.map((cmp, idx) => <div key={cmp.id}>
                    <DynamicCmp
                        type={cmp.type} info={cmp.info} onSaveNote={onSaveNote} val={answersMap[cmp.id] || ''}
                        onChangeVal={(val) => {
                            onChangeVal(cmp.id, val)
                        }}
                    />
                </div>)
            }
            <hr />
            <pre>
                {JSON.stringify(answersMap, null, 2)}
            </pre>
        </section >
    )
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        // case 'NoteImg':
        //     return <NoteImg {...props} />
        // case 'NoteVideo':
        //     return <NoteVideo {...props} />
        // case 'NoteTodos':
        //     return <NoteTodos {...props} />
    }
}

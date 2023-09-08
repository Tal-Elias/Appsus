import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NotePreview({ note, onSelectedNote }) {
    const [notes, setNotes] = useState(null)
    const [answersMap, setAnswersMap] = useState({})

    useEffect(() => {
        noteService.query()
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }, [])

    function onChangeVal(id, val) {

        const answersToSave = { ...answersMap }
        answersToSave[id] = val
        setAnswersMap(answersToSave)
    }

    if (!notes) return <div></div>

    return (
        <section className="note-app">
            {
                notes.map((cmp, idx) => <div key={cmp.id} >
                    <DynamicCmp
                        type={cmp.type} info={cmp.info} val={answersMap[cmp.id] || ''}
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
    }
}

function NoteTxt({ info, val = '', onChangeVal}) {
    const { label } = info
    return (
        <label>
            {label}
            <input type="text" value={val} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }} />
        </label>
    )
}

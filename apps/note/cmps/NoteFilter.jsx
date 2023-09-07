const { useState, useEffect } = React

const { Link, NavLink } = ReactRouterDOM

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt } = filterByToEdit
    return (
        <section className="note-filter">
            <form onSubmit={onSubmitFilter}>
                <input onChange={handleChange} value={txt} type="text" placeholder="Search" name="txt" />
            </form>
        </section>
    )
}
import { MailSort } from "./MailSort.jsx"

const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy, handleSortChange }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { txt, isRead, isStared } = filterByToEdit

  return (
    <section className='mail-filter'>

      <form onSubmit={onSubmitFilter}>
        <input

          onChange={handleChange}
          type='text'
          placeholder='Search in mail'
          id='txt'
          value={txt}
          name='txt'
        />
        <div className="fa search"></div>
        <div className="filter-inputs">
          <label htmlFor='isRead' className="fa unread"></label>
          <input
            onChange={handleChange}
            type='checkbox'
            id='isRead'
            value={isRead}
            name='isRead'
          />
          <label htmlFor='isStared' className="fa starred"></label>
          <input

            onChange={handleChange}
            type='checkbox'
            id='isStared'
            value={isStared}
            name='isStared'
          />
          <MailSort onSortChange={handleSortChange} />
        </div>
      </form>
    </section>
  )
}

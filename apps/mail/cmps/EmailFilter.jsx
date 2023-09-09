const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({filterBy})

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
    <section className='mail-filter flex column'>
      
      <form onSubmit={onSubmitFilter}>
        <input
         
          onChange={handleChange}
          type='text'
          placeholder='Search in mail'
          id='txt'
          value={txt}
          name='txt'
        />

        <label htmlFor='isRead'>isRead </label>
        <input
          onChange={handleChange}
          type='checkbox'
          id='isRead'
          value={isRead}
          name='isRead'
        />

        <label htmlFor='isStared'>isStared</label>
        <input
         
          onChange={handleChange}
          type='checkbox'
          id='isStared'
          value={isStared}
          name='isStared'
        />
      </form>
    </section>
  )
}

const { useState, useEffect } = React

export function MailSort({ onSortChange }) {
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'sentAt',
    order: 1,
  })

  function handleChange(event){
    const value = event.target.value
    setSortCriteria({ ...sortCriteria, sortBy: value })
  }

  useEffect(() => {
    onSortChange(sortCriteria)
  }, [sortCriteria])

  return (

    <div className='sort-container'>
      <select name='sortBy' value={sortCriteria.sortBy} onChange={handleChange}>
        <option value='sentAt'>date</option>
        <option value='subject'>subject</option>
      </select>

      <button onClick={() => setSortCriteria({ ...sortCriteria, order: sortCriteria.order * -1 })}>
        {sortCriteria.order === 1 ? (
          <i className='fa arrow-up'></i>
        ) : (
          <i className='fa arrow-down'></i>
        )}
      </button>
    </div>
  )
}

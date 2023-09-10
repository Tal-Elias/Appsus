export function NoteTodos({ info }) {
    const { todos } = info
    return (
        <section className="note-todos">
            <ul>
                {
                    todos.map(todo => <li key={todo.txt}>
                        <span style={{ textDecoration: todo.doneAt ? "line-through" : "none" }}>
                            {todo.txt}</span>
                    </li>)
                }
            </ul>
        </section>
    )
}
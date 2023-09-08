export function NoteTodos({ info }) {
    const { todos } = info
    return (
        <section className="note-todos">
            <ul>
                {
                    todos.map(todo => <li key={todo.txt}>{todo.txt}</li>)
                }
            </ul>
        </section>
    )
}
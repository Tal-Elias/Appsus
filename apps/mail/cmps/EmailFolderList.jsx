
export function EmailFolderList(){

return(
    <section  className="email-folder-list">
        <button className="fa inbox"><h5>inbox</h5></button>
        <button className="fa sent"> <h5>sent</h5></button>
        <button className="fa trash"> <h5>trash</h5></button>
        <button className="fa draft"> <h5>draft</h5></button>
    </section>
)
}
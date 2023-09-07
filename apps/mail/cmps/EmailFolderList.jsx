
export function EmailFolderList(){

return(
    <section  className="flex column  email-folder-list">
        <div className="fa inbox"> <h5>inbox</h5></div>
        <div className="fa sent"> <h5>sent</h5></div>
        <div className="fa trash"> <h5>trash</h5></div>
        <div className="fa draft"> <h5>draft</h5></div>
    </section>
)
}
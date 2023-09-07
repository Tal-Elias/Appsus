import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onMailRead }) {
    return (
        <table className="mail-table">

            <thead>

            </thead>
            <tbody>
              
                {mails.map((mail) => (
                 <MailPreview onMailRead={onMailRead} mail={mail} key={mail.id} onRemoveMail={onRemoveMail} />)
                )}
            </tbody>

        </table>



    )
}

import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onMailRead, onSetStarred }) {
    return (
        <ul className="mail-list flex column">
            {mails.map((mail) => (
                <MailPreview onMailRead={onMailRead} mail={mail} key={mail.id}
                    onRemoveMail={onRemoveMail} onSetStarred={onSetStarred} />)
            )}
        </ul>




    )
}

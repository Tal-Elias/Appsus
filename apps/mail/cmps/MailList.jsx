import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onMailRead, onSetStarred }) {
    return (

        <section className="mail-list">
            {
                mails.map((mail) => (
                    <MailPreview
                        mail={mail}
                        key={mail.id}
                        onRemoveMail={onRemoveMail}
                        onMailRead={onMailRead}
                        onSetStarred={onSetStarred} />
                ))
            }
        </section>


    )
}

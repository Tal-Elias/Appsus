import { LongTxt } from "../../../cmps/LongTxt.jsx"

const { useState, useEffect } = React

const { Link, useParams, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onMailRead, onSetStarred }) {
    const params = useParams()
    const navigate = useNavigate()

    const [isMailHover, setIsMailHover] = useState(false)

    const { id, isRead, isStarred, subject, body, sentAt, removedAt, from, to } = mail

    const SentAtDate = (sentAt) => {
        const date = new Date(sentAt)
        const day = date.getDate()
        const month = date.toLocaleString('es-US', { month: 'short' })
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }


    function handleAction(ev, action) {
        ev.preventDefault()
        ev.stopPropagation()
        switch (action) {
            case 'star':
                console.log('clicked on star')
                onSetStarred(id)
                break
            case 'trash':
                onRemoveMail(id)
                break
        }
    }

    function handleOnReadMail(ev, id) {
        onMailRead(id)
        navigate(`/mail/${id}`)

    }
    return (
        <React.Fragment>
            {/* <li> */}

            <article className='mail-preview space-between flex align-center' onClick={(ev) => handleOnReadMail(ev, id)}
                // onMouseEnter={() => setIsMailHover(true)}
                // onMouseLeave={() => setIsMailHover(false)}
            >
                <div onClick={(ev) => { handleAction(ev, 'star') }} className="star">{(mail.isStarred) ? <button className="fa starred"></button> : <button className="fa starred"></button>}</div>
                
                <div >
                    <div className="content space-between flex">
                        <div>
                            <p className="from">{from}</p></div>
                        <div className="subejct"><p>{subject}</p></div>
                        <LongTxt txt={body} />
                    </div>
                </div>
                {(isMailHover) ? (
                    <section className="options">
                        <button title="delete email" onClick={() => { onRemoveMail(mail.id) }} className="fa trash"></button>
                        <button title="mark as read" className="fa unread"></button>
                        <button title="keep as a note" className="fa sent"></button>
                    </section>

                ) : <p>{SentAtDate(sentAt)}</p>
                }

            </article>
            {/* </li> */}
        </React.Fragment>
        // onClick={() => navigate(`/mail/${mail.id}`)}

    )


}
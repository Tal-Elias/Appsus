const { useState, useEffect, Fragment } = React

const { Link, useParams, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail,onSetStarred ,onMailRead }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <li>
                <article  className='mail-preview space-between flex align-center'>
                    <div onClick={()=>{onSetStarred(mail.id)}} className="star">{(mail.isStarred) ? <i className="fa starred"></i> : <i className="fa starred"></i>}</div>

                    {/* <td onClick={()=>onMailRead(mail.id)}/> */}

                        <div><p className="from">{mail.from}</p></div>
                    <div className="content flex space-between ">
                        <div className="subejct"><p>{mail.subject}</p></div>
                        <div className="mail-body"><p>{mail.body}</p></div>
                    </div>
                    <p>{mail.sentAt}</p>
                    <section className="options">
                        <button title="delete email" onClick={()=>{onRemoveMail(mail.id)}} className="fa trash"></button>
                        <button title="mark as read" className="fa unread"></button>
                        <button title="keep as a note" className="fa sent"></button>
                    </section>
                </article>
            </li>
        </React.Fragment>
        // onClick={() => navigate(`/mail/${mail.id}`)}

    )


}
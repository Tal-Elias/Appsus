const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({mail,onRemoveMail,onMailRead}){
    const [isExpanded , setIsExpanded]= useState(false)
    return (
        <React.Fragment>
        <tr className='mail-preview' onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
        <td onClick={()=>onMailRead(mail.id)}/>
        <td>{mail.isRead? 'read':'unread'}</td>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        <td>{mail.sentAt}</td>
        </tr>
        <tr hidden={!isExpanded}>
        <td><button onClick={()=>onRemoveMail(mail.id)}>Delete</button></td>
        <td>
        <button><Link to={`/mail/${mail.id}`}>Details</Link> </button>
        </td>
        </tr>
        </React.Fragment>
    )
}
const { useState, useEffect, Fragment } = React

const { Link,useParams, useNavigate } = ReactRouterDOM

export function MailPreview({mail,onRemoveMail,onMailRead}){
    const [isExpanded , setIsExpanded]= useState(false)
    const params = useParams()
    const navigate = useNavigate()
    return (
      
        // <Link to={`/mail/${mail.id}`}>
        <React.Fragment>
        <tr className='mail-preview' onClick={() => {
            
            navigate(`/mail/${mail.id}`)
        }}>
        {/* <td onClick={()=>onMailRead(mail.id)}/> */}
        <td>{mail.isRead? 'read':'unread'}</td>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        <td>{mail.sentAt}</td>
        </tr>
        </React.Fragment>

    )
}
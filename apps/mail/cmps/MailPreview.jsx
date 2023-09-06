export function MailPreview({mail,onRemoveMail}){
    return (
        <tr className='mail-preview' >
        <td>{mail.isRead? 'read':'unread'}</td>
        <td>{mail.from}</td>
        <td>{mail.subject}</td>
        <td>{mail.sentAt}</td>
        <td><button onClick={()=>onRemoveMail(mail.id)}>Delete</button></td>
        </tr>
    )
}
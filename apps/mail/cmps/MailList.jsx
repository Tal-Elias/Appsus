import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails,onRemoveMail}) {
    return (
      <table className="mail-table">
        <React.Fragment>
        <thead>
            
            <p>filter by date and subject</p>
          
        </thead>
        <tbody>
            {mails.map((mail)=>(
            <MailPreview mail={mail} key={mail.id} onRemoveMail={onRemoveMail}/>)
            )}
        </tbody>
        </React.Fragment>
      </table>
       
      
    
    )
}

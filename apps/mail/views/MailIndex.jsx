import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import {showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'
import { EmailCompose } from "../cmps/EmailCompose.jsx"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isAddingMail, setIsAddingMail] = useState(false)


    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
            .catch((err) => console.log(err))
    }, [])

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`mail Removed! ${mailId}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + mailId)
            })
    }

   function onComposeMail(mail){
    console.log(mail)
   }
    if (!mails) return <div>loading...</div>
    return (
        <section>
            <button onClick={()=>setIsAddingMail(!isAddingMail)}>add mail</button>
            {isAddingMail&& <EmailCompose onComposeMail={onComposeMail}/>}
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>


    )


}


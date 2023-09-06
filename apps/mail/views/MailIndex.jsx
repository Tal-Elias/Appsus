import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import {showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'
import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { MailFilter } from "../cmps/EmailFilter.jsx"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isAddingMail, setIsAddingMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())



    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
            .catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
            .catch((err) => console.log(err))
    }, [filterBy])

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

    function onSetFilterBy(filterBy) {
        
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        console.log(filterBy)
    }   
   
    if (!mails) return <div>loading...</div>
    return (
        <section>
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <button onClick={()=>setIsAddingMail(!isAddingMail)}>add mail</button>
            {isAddingMail&& <EmailCompose />}
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>


    )


}


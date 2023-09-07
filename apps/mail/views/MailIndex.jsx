import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { MailFilter } from "../cmps/EmailFilter.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isAddingMail, setIsAddingMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())




    useEffect(() => {
        mailService.query(filterBy)
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
    function onSentMail(mail){
        mailService.save(mail).then(sentMail=>{
            setMails(prevMails=>[...prevMails,sentMail])
            setIsAddingMail(false)
            showSuccessMsg('Mail have sent!')
        })
    }
    function onMailRead(mailId) {
        mailService.setIsReadById(mailId)
            .then(() => {
                setMails(prevMails => prevMails)
            }).catch(err => {
                console.log(('err', err))
            })
    }

    function onSetFilterBy(filterBy) {

        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!mails) return <div>loading...</div>
    return (
        <section  className="flex " >
            <section className="flex column">

            <section>
            {isAddingMail && <EmailCompose className="email-compose" onSentMail={onSentMail} />}
            <button onClick={() => setIsAddingMail(!isAddingMail)}>add mail</button>
            </section>

            <section  className="flex column">
                <EmailFolderList/>
            </section>
            </section>

            <section>
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <MailList onMailRead={onMailRead} mails={mails} onRemoveMail={onRemoveMail} />
            </section>
        </section>


    )


}


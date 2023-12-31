import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { MailFilter } from "../cmps/EmailFilter.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"
import { MailSort } from "../cmps/MailSort.jsx"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isAddingMail, setIsAddingMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [selectedCategory, setSelectedCategory] = useState('Inbox')

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

    function onSetStarred(mailId) {
        mailService.setStarredById(mailId).
            then((updatedMail) => {
                let updatedMails = mails.map((mail) => (mail.id === mailId ? updatedMail : mail))
                setMails(updatedMails)
                showSuccessMsg('Mail is Starred')
            }).catch((err) => {
                showErrorMsg('Problem with Starring a mail')
            })
    }

    function handleCloseModal() {
        setIsAddingMail(false)
    }

    function onSentMail(mail) {
        let sendingMail = mail
        sendingMail.status = 'sent'
        mailService.save(sendingMail).then(sentMail => {
            setMails(prevMails => [...prevMails, sentMail])
            setIsAddingMail(false)
            showSuccessMsg('Mail have sent!')
        })
    }

    function onSelectedCategory(category) {
        setSelectedCategory(category)
        let currentFilter = filterBy
        currentFilter.status = category
        setFilterBy(currentFilter)
    }

    function onMailRead(mailId) {
        mailService.setIsReadById(mailId).then((updatedMail) => {
            let updatedMails = mails.map((mail) => (mail.id === mailId ? updatedMail : mail))
            setMails(updatedMails)

        }).catch(err => console.log(err))
    }

    function onSetFilterBy(filterBy) {

        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function handleSortChange(sortCriteria) {
        mailService.sortMail(sortCriteria.sortBy, sortCriteria.order).then((sortedMails) => {
            setMails(sortedMails)
        })
    }

    if (!mails) return <div>loading...</div>
    return (
        <section className=" mail-index  " >
            <div className="mail-header">
                {/* <div className="fa note-icon"></div> */}
                <MailFilter
                    filterBy={filterBy}
                    onSetFilterBy={onSetFilterBy}
                    handleSortChange={handleSortChange}
                />
                {/* <MailSort onSortChange={handleSortChange} /> */}
            </div>
            <section className="mail-content flex">
                <section className="side-menu flex column">
                    {isAddingMail && <EmailCompose handleCloseModal={handleCloseModal} onSentMail={onSentMail} />}
                    <button className="compose-button" onClick={() => setIsAddingMail(!isAddingMail)}>Compose</button>
                    <EmailFolderList
                        selectedCategory={selectedCategory}
                        onSelectedCategory={onSelectedCategory}
                    />
                </section>
                <MailList
                    mails={mails}
                    onMailRead={onMailRead}
                    onRemoveMail={onRemoveMail}
                    onSetStarred={onSetStarred}
                />
            </section>
        </section>
    )
}


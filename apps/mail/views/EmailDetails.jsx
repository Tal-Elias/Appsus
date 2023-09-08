import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function EmailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('have loaded')
        loadEmail()
    }, [params.mailId])

    function loadEmail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }

    const onDeleteEmail=(event,mail)=>{
        event.stopPropagation()

        mailService.remove(mail.id).then(()=>{navigate('/mail')})
    }
    function getDateTimeFromTimestamp(timestampInSeconds) {
        const date = new Date(timestampInSeconds * 1000)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')


        const dateTimeObject = {
            date: `${day}-${month}-${year}`,
            time: `${hours}:${minutes}:${seconds}`,
        }

        return dateTimeObject.date;
    }


    function onBack() {
        navigate('/mail')
        // navigate(-1)
    }

    // const dateTime=getDateTimeFromTimestamp(mail.sentAt)
    if (!mail) return <div>Loading...</div>
    const { from, to, subject, body } = mail
    return (
        <section className="mail-details">
            <div className="mail-details-header">
                <div className="mail-tools flex space-between">
                    <i onClick={onBack} className=" fa arrow-left"></i>
                    <i className="fa trash" onClick={(ev)=>onDeleteEmail(ev,mail)}></i>
                   
                   <div className="mail-indexes-arrows">
                <Link to={`/mail/${mail.nextMailId}`}> <i className="fa arrow-next-left"></i></Link>
                <Link to={`/mail/${mail.prevMailId}`}> <i className="fa arrow-next-right"></i></Link>
                 
                   </div>
                </div>
            </div>
            <div className="mail-body ">
                <div className="body-header">
                    <div className="body-header-top flex space-between">
                        <h2 className="subject"> {mail.subject}</h2>
                        <p className="mail-date-time">{getDateTimeFromTimestamp(mail.sentAt)}</p>
                  </div>
                  <div className="body-header-bottom flex">
                        <i className="fa user"></i> 
                        <div className=" flex column">
                            <h3>{mail.from}</h3>
                            <p>{mail.to}</p>
                        </div>
                  </div>
                </div>
                <div className="mail-details-body-message">
                    <p className="mail-body-text">{mail.body}</p>
                </div>
            </div>
    
       
        </section>
    )

}
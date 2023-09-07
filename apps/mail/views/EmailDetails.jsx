import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function EmailDetails(){
    const [mail,setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log('have loaded')
        loadEmail()
    },[params.mailId])
   
    function loadEmail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
        // navigate(-1)
    }
    if (!mail) return <div>Loading...</div>
    const {from , to , subject, body}= mail
    return (
        <section className="mail-details">
            <h1> {mail.subject}</h1>
            <h2>from:{mail.from}</h2>
            <h5>{mail.to}</h5>
            <p>{mail.body}</p>
            <button onClick={onBack} >Back</button>
            <div>
               
            </div>
        </section>
    )

}
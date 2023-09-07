import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails(){
    const [mail,setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        loadEmail()
    },[params.mailId])
   
    function loadEmail() {
        mailService.get(params.mail.id)
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
            <h1> {subject}</h1>
            <h2>from:{from}</h2>
            <h5>{to}</h5>
            <p>{body}</p>
            <button onClick={onBack} >Back</button>
            <div>
               
            </div>
        </section>
    )

}
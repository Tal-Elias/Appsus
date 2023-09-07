import { mailService } from "../services/mail.service.js"
const { useState}=React
export function EmailCompose({onSentMail,handleCloseModal}){
    const [mailToAdd,setMailToAdd]=useState(mailService.getEmptyMail())

    function onSaveMail(ev) {
        ev.preventDefault()
        onSentMail(mailToAdd)
    }

    function handleChange( {target} ) {
       
        const field = target.name
        let value = target.value
    
        // if (field === 'categories' || field === 'authors') value = [value]
    
        switch (target.type) {
          case 'number':
          case 'range':
            value = +value || ''
            break
    
          case 'checkbox':
            value = target.checked
            break
    
          default:
            break
        }
    
        setMailToAdd(prevMailToAdd => ({ ...prevMailToAdd, [field]: value }))
      }
      const {to,subject,body}=mailToAdd
    return(
        <section className='email-compose-wrapper'>
           <React.Fragment>

          <div className="email-compose-header flex space-between ">
           <h3>New Message</h3>  
           <button onClick={()=>handleCloseModal()} >X</button>  
          </div>

            <div className="email-compose">
            <form onSubmit={(ev)=>onSaveMail(ev)}>
            <input  type='text' placeholder='to' value={to} name='to' onChange={handleChange}/>
            <input className="subject" type='text' placeholder='subject' value={subject} name='subject' onChange={handleChange}/>
            <input type='textarea'  placeholder='new message' value={body} name='body' onChange={handleChange}/>
            <button>send mail</button>
            </form>
            </div>

            </React.Fragment>

        </section>
    )

}
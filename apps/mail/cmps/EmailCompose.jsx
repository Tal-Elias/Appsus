import { mailService } from "../services/mail.service.js"
const { useState}=React
export function EmailCompose(){
    const [mailToAdd,setMailToAdd]=useState(mailService.getEmptyMail())

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(mailToAdd)
            .then(() => console.log('added'))
            .catch(err => console.log('err:', err))

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
        <section className='email-compose'>
           <React.Fragment>
            <form onSubmit={onSaveMail}>
            <input type='text' placeholder='to' value={to} name='to' onChange={handleChange}/>
            <input type='text' placeholder='subject' value={subject} name='subject' onChange={handleChange}/>
            <input type='textarea' placeholder='new message' value={body} name='body' onChange={handleChange}/>
            <button>send mail</button>
            </form>
            </React.Fragment>

        </section>
    )

}
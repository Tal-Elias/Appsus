const { useState}=React
export function EmailCompose(onComposeMail){
    const [mail,setMail]=('')


    function handleChange({ target }) {
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
    
        setMail(prevMailToAdd => ({ ...prevMailToAdd, [field]: value }))
      }
    return(
        <section className='email-compose'>
           <React.Fragment>
            <form onSubmit={()=>onComposeMail(mail)}>
            <input type='text' placeholder='to'  onChange={handleChange}/>
            <input type='text' placeholder='subject' onChange={handleChange}/>
            <input type='textarea' placeholder='new message' onChange={handleChange}/>
            <button>send mail</button>
            </form>
            </React.Fragment>

        </section>
    )

}
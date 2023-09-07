// mail service
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { MailsData } from './mailsData.js'
import { storageService } from '../../../services/storage.service.js'
const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: '', 
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
   }
_createMails()
export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    setIsReadById

}

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
    .then(mails=>{
       
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            mails = mails.filter(mail => regExp.test(mail.body)||regExp.test(mail.subject))
          }
          console.log(mails)
          if (filterBy.isRead) {
            mails = mails.filter(mail => mail.isRead)
          }
          if (filterBy.isRead) {
            mails = mails.filter(mail => mail.isRead)
          }
          return mails
    })

}
function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}

function setIsReadById(mailId){
    let mail= get(mailId).then((mail)=>{
       mail.isRead= !mail.isRead
        
       
    }).catch(err=>console.log(err))
   
}       

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter(){
    return{
        status:'',
        txt: '',
        isRead:null,
        isStared:null,
        lables:[]
    }
}
// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.title = filterBy.title
//     if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
//     if (filterBy.publishedDate !== undefined)
//       gFilterBy.publishedDate = filterBy.publishedDate
//     return gFilterBy
//   }

function getNextMailId(mailId) {
    return asyncStorageService.query(MAIL_KEY).then(mails => {
        var idx = mails.findIndex(book => book.id === bookId)
        if (idx === books.length - 1) idx = -1
        return books[idx + 1].id
    })
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = MailsData.getMails()
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}


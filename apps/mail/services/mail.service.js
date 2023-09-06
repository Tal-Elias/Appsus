// mail service
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { MailsData } from './mailsData.js'
import { storageService } from '../../../services/storage.service.js'
const MAIL_KEY = 'mailDB'

_createMails()
export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    
}

function query(){
    return  asyncStorageService.query(MAIL_KEY)
}
function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
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

function getNextMailId(mailId) {
    return asyncStorageService.query(MAIL_KEY).then(mails => {
      var idx = mails.findIndex(book => book.id === bookId)
      if (idx === books.length - 1) idx = -1
      return books[idx + 1].id
    })
  }

function getEmptyMail() {
    return {
        id: '',
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
    console.log('my demo mails',mails)
    if (!mails || !mails.length) {
     mails= MailsData.getMails()
     storageService.saveToStorage(MAIL_KEY,mails)
    }
}


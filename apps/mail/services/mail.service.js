// mail service
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { MailsData } from './mailsData.js'
import { storageService } from '../../../services/storage.service.js'
const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
function defaultCriteria() {
    return {
        status: '',
        txt: '',
        isRead: null,
        isStarred: null,
        lables: []
    }
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    setIsReadById,
    setStarredById,
    sortMail

}

function query(filterBy = defaultCriteria()) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter((mail) =>
                    regExp.test(mail.body) || regExp.test(mail.subject) ||
                    regExp.test(mail.from) || regExp.test(mail.to)
                )
            }

            if (filterBy.status) {
                mails = mails.filter(mail => mail.status===filterBy.status)
            }
          
            if (filterBy.isStarred) {
               
                mails = mails.filter(mail => mail.isStarred)
            }

            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead)
            }
            return mails
        })

}

function sortMail(sortBy, change) {
    return query().then((mails) => {
      if (sortBy === 'sentAt') {
        mails.sort((mail1, mail2) => (mail1[sortBy] - mail2[sortBy]) * change)
      }
      if (sortBy === 'subject') {
        mails.sort((mail1, mail2) => {
          const a = mail1[sortBy].toLowerCase()
          const b = mail2[sortBy].toLowerCase()
          return a.localeCompare(b) * change
        })
      }
      return mails
    })
  }

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevEmailId(mail)
            return mail
        })
}

function setIsReadById(mailId) {
  return get(mailId).then((mail) => {
        mail.isRead = !mail.isRead
        return save(mail)
    }).catch(err => console.log(err))

}

function setStarredById(mailId) {
    return get(mailId)
        .then((mail) => {
            mail.isStarred = !mail.isStarred
            return save(mail)
        }).catch(err => console.log('err', err))
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

function getDefaultFilter() {
    return {
        status: '',
        txt: '',
        isRead: null,
        isStared: null,
        lables: []
    }
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStarred: null,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function _setNextPrevEmailId(mail) {
    return asyncStorageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = MailsData.getMails()
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}


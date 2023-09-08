const mailDB=[
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt : Date.now(),
        removedAt : null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        subject: 'Final Sale up to 80% Discount',
        body: 'Dont miss out our sale of the year check in the website',
        isRead: false,
        sentAt : Date.now(),
        removedAt : null,
        from: 'sale@clothing.com',
        to: 'user@appsus.com'
        },
        {
            id: 'e103',
            subject: 'your Recipt for the Shawarma',
            body: 'We you would like you to enjoy our shwarma once more',
            isRead: false,
            sentAt : Date.now(),
            removedAt : null,
            from: 'shawarma@amba.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e104',
            subject: 'check out new course in javascript',
            body: 'enhence your skills in javascript in this course',
            isRead: false,
            sentAt : Date.now(),
            removedAt : null,
            from: 'course@mistercourse.com',
            to: 'user@appsus.com'
            },
            {
                id: 'e105',
                subject: 'Facebook Post',
                body: 'your post have been really popular',
                isRead: false,
                sentAt : Date.now(),
                removedAt : null,
                from: 'info@facebook.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e106',
                subject: 'NETFLIX-your new series have arrived',
                body: 'Come and checkout the lately series about the someone who does something and eat alot of stuff when he code all day',
                isRead: false,
                sentAt : Date.now(),
                removedAt : null,
                from: 'info@netflix.com',
                to: 'user@appsus.com'
                }

]

export const MailsData = {
    getMails,
  }
  
  function getMails() {
    return mailDB
  }
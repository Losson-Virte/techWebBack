/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert people array
db.getCollection('users').insertMany([
    {
        "pseudo": "user1",
        "password": "qwerty",
        "mail": "mail@mail.com",
    },
    {
        "pseudo": "user2",
        "password": "soleil",
        "mail": "mailer@gmail.com",
    },
    {
        "pseudo": "Michel",
        "password": "1234",
        "mail": "mymail@webmail.com",
    },
    {
        "pseudo": "admin",
        "password": "admin",
        "mail": "protect@security.com",
    }
    ]);

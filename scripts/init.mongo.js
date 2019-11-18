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
        "photo": "https://randomuser.me/portraits/women/59.jpg",
    },
    {
        "pseudo": "user2",
        "password": "soleil",
        "mail": "mailer@gmail.com",
        "photo": "https://randomuser.me/portraits/women/59.jpg",
    },
    {
        "pseudo": "Michel",
        "password": "1234",
        "mail": "mymail@webmail.com",
        "photo": "https://randomuser.me/portraits/women/59.jpg",
    },
    {
        "pseudo": "admin",
        "password": "admin",
        "mail": "protect@security.com",
        "photo": "https://randomuser.me/portraits/women/59.jpg",
    }
    ]);

// Insert component array
db.getCollection('composants').insertMany([
    {
        "type": "GPU",
        "name": "RTX 2080",
        "price": 2000,
    },
    {
        "type": "GPU",
        "name": "GeForce Titan",
        "price": 1080,
    },
    {
        "type": "GPU",
        "name": "AMD Cheap",
        "price": 200,
    },
    {
        "type": "Processor",
        "name": "I9 9000",
        "price": 1500,
    },
    {
        "type": "CPU",
        "name": "I7 8000",
        "price": 1000,
    },
    {
        "type": "CPU",
        "name": "Intel Cheap",
        "price": 100,
    },
    {
        "type": "MotherBoard",
        "name": "Aorus Xtreme",
        "price": 1000,
    },
    {
        "type": "MotherBoard",
        "name": "Asus X299",
        "price": 700,
    },
    {
        "type": "MotherBoard",
        "name": "MSI Cheap",
        "price": 50,
    },
]);


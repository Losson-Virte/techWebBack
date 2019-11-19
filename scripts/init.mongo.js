/**
 * This script is to insert initial data inside the collection user and composant of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert user array
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
        "photo": "https://randomuser.me/portraits/women/58.jpg",
    },
    {
        "pseudo": "Michel",
        "password": "1234",
        "mail": "mymail@webmail.com",
        "photo": "https://randomuser.me/portraits/men/57.jpg",
    },
    {
        "pseudo": "admin",
        "password": "admin",
        "mail": "protect@security.com",
        "photo": "https://randomuser.me/portraits/men/59.jpg",
    },
    {
        "pseudo": "laylea",
        "password": "iLikeButterfiles",
        "mail": "laylea@gmail.com",
        "photo": "https://cdn.discordapp.com/icons/168142950490963968/9ceb2bddc8ea1caa00a2d285cbb0a7c4.jpg",
    },
    {
        "pseudo": "lloyd",
        "password": "Irving",
        "mail": "infinity@gmail.com",
        "photo": "https://cdn.discordapp.com/avatars/161257739367088128/ee9a626fe5c4dfa30384dffd8295bf78.jpg",
    },
    {
        "pseudo": "Ayaya",
        "password": "1234",
        "mail": "ayaya@AYAYA.com",
        "photo": "https://cdn.discordapp.com/emojis/318713508948606976.png",
    },
    {
        "pseudo": "JeanJaques",
        "password": "jjGlasses",
        "mail": "jj.postman@op.gg",
        "photo": "https://cdn.discordapp.com/emojis/318713500648210433.png",
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
        "type": "CPU",
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

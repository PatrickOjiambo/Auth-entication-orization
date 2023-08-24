const mysql = require("mysql2");

const connection = mysql.createPool({
    host: process.env.HOSTNAME,
    password: process.env.PASSWORD,
    connectionLimit: 5,
    user: process.env.TOBECHOOSEDLATER,
  });

  const promiseConnection = connection.promise();

const createTables = [
    `
    CREATE TABLE IF NOT EXISTS artists (
        artist_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        artistName VARCHAR(40) NOT NULL,
        phoneNumber VARCHAR(25) NOT NULL,
        userId INT,
        FOREIGN KEY (userId) REFERENCES users(userId)
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS fans (
        fan_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        userId INT,
        artist_id INT,
        FOREIGN KEY (userId) REFERENCES users(userId),
        FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
        message VARCHAR(256),
        amount INT
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS users (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(40)
    );
    `
];

Promise.all(createTables.map(query=>
    promiseConnection.query(query)
    .then(()=>{console.log("Tables created successfully")})
    .catch(error=>{
        console.log("Error", error);
    })
    )).then(()=>{
        console.log("All tables created successfully")
    })
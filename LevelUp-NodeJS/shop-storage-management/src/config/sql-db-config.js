import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const db = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_DATABASE,
})

db.connect((error) => {
    if(error){
        console.error(`[ERROR ON DB CONECTION]: ${error}`)
        return
    }

    console.log(`MySQL connected by ${db.threadId}`)
})

export default db
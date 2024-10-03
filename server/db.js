import pg from 'pg';
import 'dotenv/config';
const {Pool} = pg;


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
})


export {pool};
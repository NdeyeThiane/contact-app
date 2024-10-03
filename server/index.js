import express from "express";
import {pool} from "./db.js"
import cors from 'cors'
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


//get all contacts
app.get('/contacts', async(req,res) =>{
    try {
        const contacts = await pool.query("SELECT * FROM contacts");
        res.json(contacts.rows);
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/contacts/:contactid', async(req, res)=>{
    try {
        const {contactid} = req.params;
        const contact = await pool.query("SELECT firstname, lastname, phonenumber, notes FROM contacts WHERE contactid = $1", [contactid]);
        res.json(contact.rows[0])
    } catch (error) {
        
    }
})


//add a contact
app.post('/contacts', async(req, res) =>{
    try {
        const {firstname, lastname, phonenumber, notes} = req.body;
        const add = await pool.query("INSERT INTO contacts(firstname, lastname, phonenumber, notes) VALUES($1, $2, $3, $4) RETURNING *", [firstname, lastname, phonenumber, notes]);
        res.send("added a new contact");
        
    } catch (error) {
        console.log(error.message)
    }

});



// edit contact
app.put('/contacts/:contactid', async(req, res) =>{
    try {
        const {contactid} = req.params;
        console.log(contactid)
        const {firstname, lastname, phonenumber, notes} = req.body;
        const edit = await pool.query("UPDATE contacts SET firstname=$1, lastname=$2, phonenumber=$3, notes=$4 WHERE contactid=$5", [firstname, lastname, phonenumber, notes, contactid]);
        res.send(`update contact ${contactid}`)
    } catch (error) {
        console.log(error.message);
    }
});


//delete a contact
app.delete('/contacts/:contactid', async(req, res)=>{
   try {
    const {contactid} = req.params;
    const del = await pool.query("DELETE FROM contacts WHERE contactid = $1", [contactid]);
    res.json(`Delete contact ${contactid}`);
   } catch (error) {
    console.log(error.message);
    
   }
})



app.listen(port, () => console.log(`server start at http://localhost:${port}`))

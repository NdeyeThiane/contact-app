import React, { useEffect, useState } from 'react'

export const Contacts = () => {
    const [contacts, setContacts] = useState([])

    const getContacts = async() =>{
        try {
            const response = await fetch("http://localhost:3000/contacts");
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleClick = async(id)=>{
        try {
            const response = await fetch(`http://localhost:3000/contacts/${id}`,
                {
                    method: "DELETE",
                    headers: {"Content-type": "Application/json"},
                    body: JSON.stringify()
                }
            )
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
        getContacts()
        handleClick()
    }, [])
  return (
    <div>
        <h2>Contacts</h2>
        {
            contacts.map((contact) =>{
                return(
                <div key={contact.contactid}>
                    <a href='#' id={contact.contactid}>{contact.firstname} {contact.lastname}</a>
                </div>
                )
            })
        }
        <br />
         <button onClick={handleClick}>Delete</button>
    </div>

  )
}





// [{"contactid":1,"firstname":"jane","lastname":"doe","phonenumber":"123-456-6789","notes":"hello","userid":null},
//     {"contactid":6,"firstname":"john","lastname":"doe","phonenumber":"64573892976","notes":"hello","userid":null},
//     {"contactid":14,"firstname":"Sarah","lastname":"Lee","phonenumber":"555 123-4567","notes":"Loves hiking and photography","userid":null},
//     {"contactid":4,"firstname":"Emil","lastname":"Thomp","phonenumber":"555-456-7880","notes":"enjoys traveling","userid":null}]


import React from 'react';
import{ useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Loader from "./loader"; 

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch(process.env.REACT_APP_GET_ALL_NOTES,
    {method :"GET",
     headers: {token : window.localStorage.getItem("Token")},
    })
      .then(res => res.json())
      .then((data) => {
        setNotes(data.items);
        setLoading(false);
      })
    }, [loading]);
    
  function addNote(newNote) {
    setLoading(true);    
    fetch(process.env.REACT_APP_SAVE_NOTE, {
      method: "POST", headers: { token: window.localStorage.getItem("Token"),"Content-Type": "application/json" }, body: JSON.stringify(newNote)
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data) setLoading(false);
      })
  }

  function deleteNote(id) {
    setLoading(true);
    let url = `${process.env.REACT_APP_DELETE_NOTE}/${id}`;
    fetch(url, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data) setLoading(false);

      });
  } 
  
  return (
    <div>
      <CreateArea onAdd={addNote} />
      {loading ? <Loader /> : <>  {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.key}
            id={noteItem.key}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            />
        );
      })}</>}

      </div>
      );
      
}

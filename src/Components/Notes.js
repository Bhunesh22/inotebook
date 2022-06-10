
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
import Addnote from './Addnote';
import Noteitem from './Noteitem';
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
   
  }
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})

  const handleClick = (e)=>{
    
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    ; props.showAlert("Updated successfully", 'success')
   
}

const onchange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <>
      <Addnote showAlert={props.showAlert} />
    
      <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

  
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="row g-3">
   
   <div className=" col-12">
     <label htmlFor="title" className="form-label">Title</label>
     <input type="text" className="form-control form-control-lg" id="etitle" value={note.etitle} name='etitle' onChange={onchange} />
     </div>
   <div className=" col-12">
     <label htmlFor="description" className="form-label">Description</label>
     <input type="text" className="form-control form-control-lg" id="edescription" name='edescription' value={note.edescription} onChange={onchange}  />
     </div>
   <div className=" col-12">
     <label htmlFor="tag" className="form-label">Tag</label>
     <input type="text" className="form-control form-control-lg" id="etag" value={note.etag} name='etag' onChange={onchange}  />
     </div>
   
 </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 className='text-center'>Your Notes</h2>
        <p className='text-center' >
        {notes.length===0 && 'No notes to display'}
        </p>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes
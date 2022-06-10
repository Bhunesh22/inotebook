import React, { useContext, useState }  from 'react'
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        // after using preventDffault when we click handelClick it will not reload our page 
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert(" Added Successfully", 'success')
    }

    const onchange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-2 " >
    <div className="w-75 mx-auto  p-4 ">

    <h2 className='my-2 text-center'>Add Note</h2>
    <form className="row g-3">
   
  <div className=" col-12">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control form-control-lg" id="title" name='title' onChange={onchange} value={note.title} />
    </div>
  <div className=" col-12">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control form-control-lg" id="description" name='description' onChange={onchange} value={note.description} />
    </div>
  <div className=" col-12">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control form-control-lg" id="tag" name='tag' onChange={onchange} value={note.tag}/>
    </div>
  
  <div className="col-12">
    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-dark " onClick={handleClick}>Add Note</button>
  </div>
</form>
    </div>
    </div>
  )
}

export default Addnote
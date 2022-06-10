import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {

const [credentials, setCredentials] = useState({name:"" ,email:"", password:""})
let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const responce = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await responce.json()
          console.log(json);
          if (json.success){
              // save the auth token and redirect(after press login move to home page direct)
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showAlert('Account Created Successfully', 'success')
            }
            else{
                props.showAlert('Invalid Credentials', 'danger')
            }
          
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container my-4 " >
    <div className="w-50 mx-auto shadow p-4 ">

    <h2 className='mb-4 text-center'>Create account to use iNotebook</h2>
    <form className="row g-3" onSubmit={handleSubmit} >
   
  <div className=" col-12">
    <label htmlFor="name" className="form-label">name</label>
    <input type="text" className="form-control form-control-lg" id="name" name='name' onChange={onChange}  />
    </div>
  <div className=" col-12">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control form-control-lg" id="email" name='email' onChange={onChange}  />
    </div>
  <div className=" col-12">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="text" className="form-control form-control-lg" id="password" name='password' onChange={onChange} minLength={5} required />
    </div>
  <div className=" col-12">
    <label htmlFor="cpassword" className="form-label">Comfrim Password</label>
    <input type="text" className="form-control form-control-lg" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
    </div>
  
  <div className="col-12">
    <button  type="submit" className="btn btn-dark my-2" >Submit</button>
  </div>
</form>
    </div>
    </div>
  )
}

export default SignUp
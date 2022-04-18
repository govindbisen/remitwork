import './login.css'
import React,{useState} from 'react'

export default function Login() {
    const initialValues = { email:"",password:""}
    const [formErrors, setformErrors] = useState({})

    const [formValues, setFormValues] = useState(initialValues);
    const onHandleChange = (e)=>{
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value})
        console.log(formValues)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setformErrors(validate(formValues)) ;
        
    }

    const validate = (values)=>{ 
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        const errors = {};
        if(!values.email){
            errors.email = "email is required"
        }else if(!regex.test(values.email)){
            errors.email = "please enter valid email."

        }
        if(!values.password){
            errors.password = "password is required"
        }
        return errors;
    }

  return (
    <>
    {/* {JSON.stringify(formValues)} */}
    <form onSubmit={handleSubmit}>
    <div>
   <label>email</label> 
    <input name="email" type="email" value={formValues.email} onChange={onHandleChange} />
    </div>
    <p className='error'>
    {formErrors.email}

    </p>
    
    <div>
    <label>password</label>
    <input name="password" type="password" value={formValues.password} onChange={onHandleChange}/>
    </div>
    <p className='error'> {formErrors.password} </p>
    <button>Submit</button>
   </form>

    </>
  )
}

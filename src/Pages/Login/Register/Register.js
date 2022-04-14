import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../Login/SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
const Register = () => {
    const[agree,setAgree]=useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate=useNavigate();

    const navigateLogin=()=>{
        navigate("/login");
    }

    if(loading || updating){
        return <Loading></Loading>
      }
    
    if(user){
        console.log('User Detected !',user);  
    }


    const handleRegister = async(event)=>{
        event.preventDefault();
        const name=(event.target.name.value);
        const email=(event.target.email.value);
        const password=(event.target.password.value);
    //  const agree=(event.target.terms.checked);

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName:name });
        console.log('Updated profile');   
        navigate("/home");
    }
    return (
        <div className='register-form'>
            <h2 style={{textAlign:"center"}}>Please Register </h2>
            <form onSubmit={handleRegister}>
            <input type="text" name="name" id="" placeholder='Your Name' required />
            <input type="email" name="email" id="" placeholder='Your Email Address' required />
            <input type="password" name="password" id="" placeholder='Password' required />
            <input onClick={()=>{setAgree(!agree)}} type="checkbox" name="terms" id="terms" />
      {/*   <label className={agree ? "ps-2 text-success" : "ps-2 text-danger"}
            htmlFor="terms">Accept Genius Car terms and condition</label>       */}
            <label className={`ps-2 ${agree ? "text-success" : "text-danger"}`}
            htmlFor="terms">Accept Genius Car terms and condition</label>
            <input className='w-50 mx-auto btn btn-primary mt-3' type="submit" value="Register" disabled={!agree} />
            <p>Already have an account? <Link to="/login" onClick={navigateLogin} className='text-primary pe-auto text-decoration-none '>Please Login</Link></p>
            <SocialLogin></SocialLogin>
            </form>
        </div>
    );
}

export default Register;
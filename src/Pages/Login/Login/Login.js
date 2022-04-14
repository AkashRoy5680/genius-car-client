import { sendPasswordResetEmail } from "firebase/auth";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "./SocialLogin/SocialLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  let errorElement;

  let from = location.state?.from?.pathname || "/";

  const [signInWithEmailAndPassword, 
    user, 
    loading, 
    error
  ] = useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth); 
  
  if(loading || sending){
    return <Loading></Loading>
  }

  if (user) {
    //navigate(from, { replace: true });
    navigate("/home");
  }

  if (error) {
    errorElement = (<p className="text-danger">Error: {error?.message}</p>);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(email, password);
  };

  const navigateRegister = (event) => {
    navigate("/register");
  };

    const resetPassword=async()=>{
    const email = emailRef.current.value;
    if(email){
      await sendPasswordResetEmail(email);
      toast('Sent email');
    }
    else{
      toast("please provide your email-address")
    }
  }

  return (
    <div>
      <h3 className="text-primary text-center mt-2">Plesase log in</h3>
      <Form onSubmit={handleSubmit} className="container w-50 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary w-50 d-block mx-auto mb-2" type="submit">
          Login
        </Button>
        {errorElement}
      <p> New to Genius Car?
  <Link to="/register" onClick={navigateRegister} className="text-primary pe-auto text-decoration-none "> Please Register</Link>
      </p>

      <p>Forget Password?<button onClick={resetPassword} className='text-info pe-auto text-decoration-none btn btn-link'>Reset Password</button></p>
        <SocialLogin></SocialLogin>
        <ToastContainer />
      </Form>
      
    </div>
  );
};

export default Login;

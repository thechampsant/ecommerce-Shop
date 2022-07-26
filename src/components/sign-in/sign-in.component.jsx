import React from "react";
import { useContext, useState } from "react";

import { UserContext } from "../../contexts/user.context";
import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {signInWithGoogle, createUserDocumentFromAuth, signInUserWithEmailAndPassword}  from "../../firebase/firebase.util";


const defaultFields = {
    email : '',
    password : ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFields)
    const { setCurrentUser } = useContext(UserContext);
    const {email, password} = formFields
    const handleSumbit = async event => {
        event.preventDefault()
        

        try{
            await signInUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res.user);
                setCurrentUser(res.user)
            })
            .catch((error) => {
                switch(error.code){
                    case 'auth/wrong-password' :
                        alert('wrong password for the email');
                        break;
                    case 'auth/user-not-found' :
                        alert('user does not exists');
                        break;
                    default :
                        alert(error.code);
                }
            })
            resetFormField();
        }catch(err){
           console.log(err);
        }
    }

    const resetFormField = () => {
        setFormFields(defaultFields)
    }

    const handleChange = event =>{
       const {value, name} = event.target
       setFormFields({...formFields, [name]: value}) //dynamically setting the values for both email and password []
    }

    const handleSignIn = async () => {
        await signInWithGoogle()
        .then((res) => {
            createUserDocumentFromAuth(res.user)
        })
        .catch((err) => console.log(err))
        
    }
   
    return (
        <div className="sign-in">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSumbit}>
                <FormInput 
                name="email" 
                type="email" 
                handleChange={handleChange}
                value={email} 
                label="Email"
                required/>
                <FormInput 
                name="password" 
                type="password" 
                handleChange={handleChange}
                label="Password"
                value={password} 
                required/>
                <CustomButton type="submit">
                    Sign In {' '}
                </CustomButton>
                <CustomButton onClick = {handleSignIn}>
                    {' '}
                    Sign in with Google{' '}
                </CustomButton>
            </form>
        </div>
    )
  
}

export default SignIn
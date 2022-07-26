import React from "react";

import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {signInWithGoogle, createUserDocumentFromAuth, signInUserWithEmailAndPassword}  from "../../firebase/firebase.util";

export default class SignIn extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: '', 
            password: ''
        }
    }
    handleSumbit = async event => {
        event.preventDefault()
        const {email, password} = this.state;
        try{
            await signInUserWithEmailAndPassword(email, password)
            .then((res) => console.log(res))
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
            this.resetFormField();
        }catch(err){
           console.log(err);
        }
    }

    resetFormField = () => {
        this.setState({email: '', password: ''})
    }

    handleChange = event =>{
        const {value, name} = event.target
        this.setState({[name]: value}) //dynamically setting the values for both email and password []
    }

    handleSignIn = async () => {
        await signInWithGoogle()
        .then((res) => {
            createUserDocumentFromAuth(res.user)
        })
        .catch((err) => console.log(err))
        
    }
    render() {
        return (
            <div className="sign-in">
                <h2>Already have an account?</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSumbit}>
                    <FormInput 
                    name="email" 
                    type="email" 
                    handleChange={this.handleChange}
                    value={this.state.email} 
                    label="Email"
                    required/>
                    <FormInput 
                    name="password" 
                    type="password" 
                    handleChange={this.handleChange}
                    label="Password"
                    value={this.state.password} 
                    required/>
                    <CustomButton type="submit">
                        Sign In {' '}
                    </CustomButton>
                    <CustomButton onClick = {this.handleSignIn}>
                        {' '}
                        Sign in with Google{' '}
                    </CustomButton>
                </form>
            </div>
        )
    }
}
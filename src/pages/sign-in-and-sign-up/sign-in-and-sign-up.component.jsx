import React from "react";

import './sign-in-and-sign-up.styles.scss'
import SignIn from "../../components/sign-in/sign-in.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignInAndSignUpPage = () => (
    <div className="SignInAndSignUp">
        <SignIn className="signIn"/>
        <SignUpForm className="signUp"/>
    </div>
)

export default SignInAndSignUpPage
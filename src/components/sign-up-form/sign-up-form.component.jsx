import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const defaultFormFields = {
    displayName : '',
    email : '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormField] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }

    const hadndleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }        

        try {
            await createAuthUserWithEmailAndPassword(email, password)
            .then(async (res) => {
                await createUserDocumentFromAuth(res.user,{displayName})
                .then(() => console.log('success'))
                .catch((err) => console.log('error creating user '+ err))
                resetFormFields();
            })
            .catch((err) => console.log('error creating the user ' + err))
        
        } catch(err) {
            console.log(err);
        }

    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormField({...formFields, [name]: value});
    }

    return (
        <div className="sign-up">
            <h2>
                Sign up with your Email and Password
            </h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={hadndleSubmit}>
                <FormInput label="Display Name" type="text"  required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="Email" type="email"  required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password"  required onChange={handleChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password"  required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>
    )
}

export default SignUpForm;
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {

        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            
            const response = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            console.log(response);
            resetFormFields();

        } catch(error) {

            switch(error.code) {
                case 'auth/wrong-password': 
                    alert('incorrect password for email');
                break;

                case 'auth/user-not-found':
                    alert('There is no user for that email');
                break;

                default: console.log(error);
            }
        
            if (error.code === "auth/wrong-password") {
                alert('Incorrect password for email');
            }
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }


    return (

        <div className='sign-in-container'>

            <h2>Already have an account?</h2>

            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>


                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                value={password} 
                />

                <div className="buttons-container">

                    <Button buttonType={''} type="submit">Sign In</Button>

                    <Button onClick={signInWithGooglePopup} buttonType='google' type="button">Google Sign In</Button>

                </div>

            </form>
            
        </div>
    )
}

export default SignInForm;
/*
 Button Types:

 Default (black w/white text)

 Inverted

 Google Sign-in
*/
import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...otherProps}) => {
    <button 
        className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
        {...otherProps}
    >
        Sign Up Button
    </button>
}

export default Button;
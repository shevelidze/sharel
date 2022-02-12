import Input from '../components/Input'
import styles from '../styles/Auth.module.css'
import Button from '../components/Button'
import react from "react"
import { PasswordStrengthLevel, getPropsForLevel } from "../components/PasswordStrengthLevel";

export default class SignUp extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordLevelProps: {},
            userDataSubmitIsClickable: true,
            verificationCodeSubmitIsClickable: true
        };

        this.passwordInputsValues = {};
        this.inputs = {};

        this.onUserDataSubmitClick = () => {
            this.setState({
                userDataSubmitIsClickable: false
            });

            let invalidValueInputs = new Set();
            for (let element of Object.values(this.inputs)) {
                if (!(element.value.length > 0)) {
                    invalidValueInputs.add(element);
                }
            }

            if (!this.state.passwordLevelProps.passwordsAreRight) {
                invalidValueInputs.add(this.inputs.password1);
                invalidValueInputs.add(this.inputs.password2);
            }

            for (let invalidValueInput of invalidValueInputs) {
                invalidValueInput.blink(2);
            }

            this.setState({
                userDataSubmitIsClickable: true
            });
        };

        this.onVerificationCodeSubmitClick = event => {
        };
    }
    addInput(inputName) {
        return (element) => {
            this.inputs[inputName] = element;
        }
    }
    getPasswordChangeHandler(inputName) {
        return (event) => {
            this.passwordInputsValues[inputName] = event.target.value;
            this.setState({
                passwordLevelProps: getPropsForLevel(
                    this.passwordInputsValues.password1,
                    this.passwordInputsValues.password2
                )
            });
        };
    }
    render() {
        let pageViewComponents = [(
            <div id={styles.root} key='0'>
                <div id={styles['title-wrapper']}>
                    <div>
                        <svg onClick={this.props.onBackClick} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="white" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>
                        <div>Sign up</div>
                    </div>
                </div>
                <div id={styles['main-block']}>
                    <div className={styles.section}>
                        <Input placeholder={'First name*'} ref={this.addInput('firstName')} />
                        <Input placeholder={'Last name*'} ref={this.addInput('lastName')} />
                    </div>
                    <div className={styles.section}>
                        <Input placeholder={'Email*'} ref={this.addInput('email')} />
                    </div>
                    <div className={styles.section}>
                        <Input placeholder={'Password*'} onChange={this.getPasswordChangeHandler('password1')} ref={this.addInput('password1')} />
                        <Input placeholder={'Verify password*'} onChange={this.getPasswordChangeHandler('password2')} ref={this.addInput('password2')} />
                        <PasswordStrengthLevel {...this.state.passwordLevelProps} />
                    </div>
                    <Button text={'Sign up'} onClick={this.onUserDataSubmitClick} isClickable={this.state.userDataSubmitIsClickable} />
                </div>
            </div >
        ),
        (
            <div id={styles.root} key='1' className={styles['slide-in']}>
                <div id={styles['title-wrapper']}>Verify email</div>
                <div id={styles['main-block']}>
                    <div className={styles.section}>
                        <div className={styles.text}>Code was sent to your email (<b></b>).</div>
                        <Input
                            placeholder={'Verification code'}
                        />
                    </div>
                    <Button
                        text={'Submit'}
                        onClick={this.onVerificationCodeSubmitClick}
                        isClickable={this.state.verificationCodeSubmitIsClickable}
                    />
                </div>
            </div>
        )];

        return (
            <div id={styles.wrapper}>
                {
                    pageViewComponents[0]
                }
            </div>
        )
    }
}

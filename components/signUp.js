import Input from '../components/Input'
import styles from '../styles/Auth.module.css'
import Button from '../components/Button'
import react from "react"
import { PasswordStrengthLevel, getPropsForLevel } from "../components/PasswordStrengthLevel";
import { apiFetch } from '../lib/apiFetch';

export default class SignUp extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordLevelProps: {},
            userDataSubmitIsClickable: true,
            verificationCodeSubmitIsClickable: true,
            currentComponentIndex: 0,
            verifyComponentEmail: null,
            emailMessageText: null
        };

        this.passwordInputsValues = {};
        this.inputs = {};

        this.onUserDataSubmitClick = async () => {
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

            if (invalidValueInputs.size === 0) {
                let response = await apiFetch(
                    '/sign_up',
                    {
                        firstName: this.inputs.firstName.value,
                        lastName: this.inputs.lastName.value,
                        email: this.inputs.email.value,
                        password: this.inputs.password1.value
                    },
                    false
                );
                if (response.ok) {
                    this.setState({
                        currentComponentIndex: 1,
                        verifyComponentEmail: this.inputs.email.value
                    });
                } else if (response.status === 400) {
                    let bodyObject = await response.json();
                    if ((bodyObject.errors?.indexOf('emailHasTaken')) !== -1) {
                        this.setState({
                            emailMessageText: 'Account with this email has already registered. Try to log in.'
                        });
                    }
                }
            }

            this.setState({
                userDataSubmitIsClickable: true
            });
        };

        this.onVerificationCodeSubmitClick = async () => {
            this.setState({
                verificationCodeSubmitIsClickable: false
            });
            let response = await apiFetch(
                '/verify_email',
                {
                    email: this.state.verifyComponentEmail,
                    verificationCodeFromEmail: this.inputs.verificationCode.value
                },
                false
            )
            if (response.ok) {
                this.props.goToSignIn();
            } else {
                this.inputs.verificationCode.blink(2);
            }
            this.setState({
                verificationCodeSubmitIsClickable: true
            });
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
                        <Input
                            placeholder={'Email*'}
                            ref={this.addInput('email')}
                            messageText={this.state.emailMessageText}
                        />
                    </div>
                    <div className={styles.section}>
                        <Input
                            placeholder={'Password*'}
                            onChange={this.getPasswordChangeHandler('password1')}
                            ref={this.addInput('password1')}
                            type={'password'}
                        />
                        <Input
                            placeholder={'Verify password*'}
                            onChange={this.getPasswordChangeHandler('password2')}
                            ref={this.addInput('password2')}
                            type={'password'}
                        />
                        <PasswordStrengthLevel {...this.state.passwordLevelProps} />
                    </div>
                    <Button text={'Sign up'} onClick={this.onUserDataSubmitClick} isClickable={this.state.userDataSubmitIsClickable} />
                </div>
            </div >
        ),
        (
            <div id={styles.root} key='1' className={styles['slide-in']}>
                <div id={styles['title-wrapper']}>
                    <div>
                        <svg onClick={this.props.onBackClick} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="white" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>
                        <div>Verify email</div>
                    </div>
                </div>
                <div id={styles['main-block']}>
                    <div className={styles.section}>
                        <div className={styles.text}>Code was sent to your email (<b>{this.state.verifyComponentEmail}</b>).</div>
                        <Input
                            placeholder={'Verification code'}
                            ref={this.addInput('verificationCode')}
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
                {pageViewComponents[this.state.currentComponentIndex]}
            </div>
        )
    }
}

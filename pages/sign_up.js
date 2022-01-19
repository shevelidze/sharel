import Input from '../components/Input'
import styles from '../styles/Auth.module.css'
import Button from '../components/Button'
import react from "react"
import PasswordStrengthLevel from "../components/PasswordStrengthLevel";

export default class SignIn extends react.Component {
    constructor() {
        super();
        this.passwordStrengthLevel = null;
        this.state = {
            currentViewComponentIndex: 0,
            password: '',
            passwordStrengthLevelText: null,
            inputsMessages: {
                email: null,
                verificationCode: null
            },
            signUpButtonIsClickable: true,
            submitVerifyCodeButtonIsClickable: true
        };
        this.inputsValues = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordVeriification: '',
        };
        this.inputsRefs = {
            firstName: react.createRef(),
            lastName: react.createRef(),
            email: react.createRef(),
            password: react.createRef(),
            passwordVeriification: react.createRef(),
        };
        this.verificationCodeInputData = {
            value: '',
            ref: react.createRef()
        }
        this.passwordStrengthLevelRef = react.createRef();
    }
    handleVerificationCodeInputChange(event) {
        this.verificationCodeInputData.value = event.target.value;
        this.setState({ inputsMessages: { verificationCode: null } });
    }
    handleInputChange(name, event) {
        this.inputsValues[name] = event.target.value;
        this.setState({ inputsMessages: { [name]: null } });
    }
    handlePasswordChange(event) {
        this.inputsValues.password = event.target.value;
        this.handlePasswordsChange();
    };
    handlePasswordVerificationChange(event) {
        this.inputsValues.passwordVeriification = event.target.value;
        this.handlePasswordsChange();
    };
    handlePasswordsChange() {
        if (
            this.inputsValues.password.length > 0 &&
            this.inputsValues.passwordVeriification.length > 0
        ) {
            if (this.inputsValues.password === this.inputsValues.passwordVeriification) {
                this.setState({
                    password: this.inputsValues.password,
                    passwordStrengthLevelText: null
                });
                return true;
            }
            else {
                this.setState({
                    passwordStrengthLevelText: 'Passwords don\'t match'
                })
            }
        }
        else {
            this.setState({
                password: '',
                passwordStrengthLevelText: null
            });
            return true;
        }
        return false;
    }
    async blinkPasswordsInputsIfNotTheSame() {
        if (this.handlePasswordsChange()) return;
        await new Promise((resolve) => { setTimeout(resolve, 500) });
        this.inputsRefs.passwordVeriification.current.blink(3);
        this.inputsRefs.password.current.blink(3);
    }
    changeComponent(viewComponentIndex) {
        this.setState({
            currentViewComponentIndex: viewComponentIndex
        });
    }
    async handleSubmitButtonClick() {
        this.setState({
            signUpButtonIsClickable: false
        });
        let refsToInputsWithWrongValue = new Set();
        for (let inputName in this.inputsRefs) {
            if (this.inputsValues[inputName].length == 0) {
                refsToInputsWithWrongValue.add(this.inputsRefs[inputName]);
            }
        }
        if (!this.handlePasswordsChange() || this.passwordStrengthLevelRef.current.level < 0.5) {
            refsToInputsWithWrongValue.add(this.inputsRefs.password);
            refsToInputsWithWrongValue.add(this.inputsRefs.passwordVeriification);
        }

        if (refsToInputsWithWrongValue.size > 0) {
            for (let inputRef of refsToInputsWithWrongValue) {
                inputRef.current.blink(3);
            }
        } else {
            let requestBodyObject = {
                firstName: this.inputsValues.firstName,
                lastName: this.inputsValues.lastName,
                email: this.inputsValues.email,
                password: this.inputsValues.password,
            };
            let response = await fetch(
                '/api/sign_up',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method: 'POST',
                    body: JSON.stringify(requestBodyObject)
                }
            );
            if (response.ok) {
                this.changeComponent(1);
            } else if (response.status === 400) {
                let responseJSON = await response.json();
                let messagesChanges = {}
                for (let inputKey of Object.keys(responseJSON)) {
                    messagesChanges[inputKey] = responseJSON[inputKey];
                    this.inputsRefs[inputKey].current.blink(3);
                }
                this.setState({ inputsMessages: messagesChanges });
            }
            this.setState({
                signUpButtonIsClickable: true
            });
        }
    }
    async handleVerifySubmitButtonClick() {
        if (this.verificationCodeInputData.value.length === 0) {
            this.verificationCodeInputData.ref.current.blink(3);
        } else {
            this.setState({
                submitVerifyCodeButtonIsClickable: false
            });
            let requestBodyObject = {
                email: this.inputsValues.email,
                verificationCodeFromEmail: this.verificationCodeInputData.value
            };
            let response = await fetch(
                '/api/verify_email',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    method: 'POST',
                    body: JSON.stringify(requestBodyObject)
                }
            );
            if (response.ok) {
                console.log('Ok! You successfully signed up!');
            }
            else if (response.status === 400) {
                this.setState({
                    inputsMessages: {
                        verificationCode: 'Wrong verification code. Try again or resend code.'
                    }
                });
                this.verificationCodeInputData.ref.current.blink(3);
            }
            this.setState({
                submitVerifyCodeButtonIsClickable: true
            });
        }
    }
    render() {
        let pageViewComponents = [(
            <div id={styles.root} key='first'>
                <div id={styles['title-wrapper']}>Sign up</div>
                <div id={styles['main-block']}>
                    <div className={styles.section}>
                        <Input
                            placeholder={'First name*'}
                            ref={this.inputsRefs.firstName}
                            inputParams={{ onChange: this.handleInputChange.bind(this, 'firstName') }}
                        />
                        <Input
                            placeholder={'Last name*'}
                            ref={this.inputsRefs.lastName}
                            inputParams={{ onChange: this.handleInputChange.bind(this, 'lastName') }}
                        />
                    </div>
                    <div className={styles.section}>
                        <Input
                            placeholder={'Email*'}
                            ref={this.inputsRefs.email}
                            inputParams={{ onChange: this.handleInputChange.bind(this, 'email') }}
                            messageText={this.state.inputsMessages.email}
                        />
                    </div>
                    <div className={styles.section}>
                        <Input
                            placeholder={'Password*'}
                            inputParams={{
                                onChange: this.handlePasswordChange.bind(this),
                            }}
                            type='password'
                            ref={this.inputsRefs.password}
                        >
                        </Input>
                        <Input
                            placeholder={'Verify password*'}
                            inputParams={{
                                onInput: (this.handlePasswordVerificationChange.bind(this)),
                            }}
                            type='password'
                            ref={this.inputsRefs.passwordVeriification}
                        >
                        </Input>
                        <PasswordStrengthLevel
                            ref={this.passwordStrengthLevelRef}
                            password={this.state.password}
                            text={this.state.passwordStrengthLevelText}
                        ></PasswordStrengthLevel>
                    </div>
                    <Button text={'Sign up'} onClick={this.handleSubmitButtonClick.bind(this)} isClickable={this.state.signUpButtonIsClickable}></Button>
                </div>
            </div >
        ),
        (
            <div id={styles.root} key='second' className={styles['slide-in']}>
                <div id={styles['title-wrapper']}>Verify email</div>
                <div id={styles['main-block']}>
                    <div className={styles.section}>
                        <div className={styles.text}>Code was sent to your email (<b>{this.inputsValues.email}</b>).</div>
                        <Input
                            ref={this.verificationCodeInputData.ref}
                            messageText={this.state.inputsMessages.verificationCode}
                            placeholder={'Verification code'}
                            inputParams={{
                                onInput: this.handleVerificationCodeInputChange.bind(this),
                            }}
                        />
                    </div>
                    <Button
                        text={'Submit'}
                        onClick={this.handleVerifySubmitButtonClick.bind(this)}
                        isClickable={this.state.submitVerifyCodeButtonIsClickable}
                    ></Button>
                </div>
            </div>
        )];

        return (
            <div id={styles.wrapper}>
                {
                    pageViewComponents[this.state.currentViewComponentIndex]
                }
            </div>
        )
    }
}
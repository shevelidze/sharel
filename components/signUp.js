import Input from '../components/Input'
import styles from '../styles/Auth.module.css'
import Button from '../components/Button'
import react from "react"
import { PasswordStrengthLevel, getPropsForLevel } from "../components/PasswordStrengthLevel";

export default class SignUp extends react.Component {
    constructor(props) {
        super(props);
        this.inputsValues = {};
        this.state = {
            passwordLevelProps: {}
        };
    }
    getInputChangeHandler(inputName) {
        return (event) => {
            this.inputsValues[inputName] = event.target.value;
            if (inputName.slice(0, -1) === 'password') {
                this.setState({
                    passwordLevelProps: getPropsForLevel(this.inputsValues.password1, this.inputsValues.password2)
                });
            }
        };
    }
    render() {
        let pageViewComponents = [(
            <div id={styles.root} key='first'>
                <div id={styles['title-wrapper']}>
                    <div>
                        <svg onClick={this.props.onBackClick} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="white" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>
                        <div>Sign up</div>
                    </div>
                </div>
                <div id={styles['main-block']}>
                    <div className={styles.section}>
                        <Input placeholder={'First name*'} onChange={this.getInputChangeHandler('firstName')} />
                        <Input placeholder={'Last name*'} onChange={this.getInputChangeHandler('lastName')} />
                    </div>
                    <div className={styles.section}>
                        <Input placeholder={'Email*'} onChange={this.getInputChangeHandler('email')} />
                    </div>
                    <div className={styles.section}>
                        <Input placeholder={'Password*'} onChange={this.getInputChangeHandler('password1')} />
                        <Input placeholder={'Verify password*'} onChange={this.getInputChangeHandler('password2')} />
                        <PasswordStrengthLevel {...this.state.passwordLevelProps} />
                    </div>
                    <Button text={'Sign up'} />
                </div>
            </div >
        ),
        (
            <div id={styles.root} key='second' className={styles['slide-in']}>
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
                    ></Button>
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

import Input from '../components/Input'
import styles from '../styles/Auth.module.css'
import Button from '../components/Button'
import react from "react"
import PasswordStrengthLevel from "../components/PasswordStrengthLevel";

export default class SignIn extends react.Component {
    constructor(props) {
        super(props);
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
                        <Input
                            placeholder={'First name*'}
                        />
                        <Input
                            placeholder={'Last name*'}
                        />
                    </div>
                    <div className={styles.section}>
                        <Input
                            placeholder={'Email*'}
                        />
                    </div>
                    <div className={styles.section}>
                        <Input
                            placeholder={'Password*'}
                        >
                        </Input>
                        <Input
                            placeholder={'Verify password*'}
                        >
                        </Input>
                        <PasswordStrengthLevel password='hello'></PasswordStrengthLevel>
                    </div>
                    <Button text={'Sign up'} ></Button>
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
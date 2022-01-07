import Input from "../components/Input"
import styles from '../styles/Auth.module.css'
import Button from "../components/Button"
import react from "react"
import PasswordStrengthLevel from "../components/PasswordStrengthLevel";

export default class SignIn extends react.Component {
    constructor() {
        super();
        this.state = {
            currentViewComponentIndex: 0,
            password: ''
        }
    }
    onPasswordInput(event) {
        console.log(event.target.value);
        this.setState({
            password: event.target.value
        })
    }
    changeComponent(component) {
        this.setState({
            currentComponent: component
        });
    }
    render() {
        let pageViewComponents = [(
            <div id={styles.root}>
                <div id={styles['title-wrapper']}>Sign up</div>
                <div id={styles['main-block']}>
                    <div className={styles.section}>
                        <Input placeholder={'First name*'}></Input>
                        <Input placeholder={'Last name*'}></Input>
                    </div>
                    <div className={styles.section}>
                        <Input placeholder={'Email*'}></Input>
                    </div>
                    <div className={styles.section}>
                        <Input placeholder={'Password*'}></Input>
                        <Input placeholder={'Verify password*'} inputParams={{ onInput: (this.onPasswordInput.bind(this)) }}></Input>
                        <PasswordStrengthLevel password={this.state.password}></PasswordStrengthLevel>
                    </div>
                    <Button text={'Sign up'} onClick={this.changeComponent.bind(this, this.emailVerificationComponent)}></Button>
                </div>
            </div>
        ),
        (
            <div id={styles.root}>
                <div id={styles['title-wrapper']}>Verify email</div>
                <div id={styles['main-block']}>
                    <Input placeholder={'Verfication code'}></Input>
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
import Input from "../components/Input"
import styles from '../styles/Auth.module.css'
import Button from "../components/Button"

export default function SignIn(props) {
    return (
        <div id={styles.root}>
            <div id={styles['title-wrapper']}>
                <div>
                    <svg onClick={props.onBackClick} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="white" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg>
                    <div>Sign in</div>
                </div>
            </div>
            <div id={styles['main-block']}>
                <div className={styles['section']}>
                    <Input placeholder='Email'></Input>
                    <Input placeholder='Password' type='password'></Input>
                </div>
                <Button text='Sign in'></Button>
            </div>
        </div>
    )
}

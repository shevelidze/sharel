import Input from "../components/Input"
import styles from '../styles/Auth.module.css'
import Button from "../components/Button"

export default function SignIn() {
    return (
        <div id={styles.root}>
            <div id={styles['title-wrapper']}>
                <div>Sign in</div>
            </div>
            <div id={styles['main-block']}>
                <div className={styles['section']}>
                    <Input placeholder='Email'></Input>
                    <Input placeholder='Password' type='password' buttonProps={{text: 'hello'}}></Input>
                </div>
                <Button text='Sign in'></Button>
            </div>
        </div>
    )
}
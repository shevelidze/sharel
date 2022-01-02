import styles from '../styles/Auth.module.css'
import Input from '../components/Input'

export default function SignUp()
{
    return (
        <div id={styles.root}>
            <div id={styles['title-wrapper']}>Sign up</div>
            <div id={styles['main-block']}>
                <Input></Input>
            </div>
        </div>
    )
}
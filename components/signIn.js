import { useRef, useState } from 'react';
import Input from '../components/Input';
import styles from '../styles/Auth.module.css';
import Button from '../components/Button';
import { apiFetch } from '../lib/apiFetch';

async function signIn(emailInputRef, passwordInputRef, setMessageText) {
    let response = await apiFetch(
        '/sign_in',
        {
            password: passwordInputRef.current.value,
            email: emailInputRef.current.value,
        },
        false
    );
    const responseBodyObject = await response.json();
    if (response.ok) {
        localStorage.setItem(
            'JWTAccessToken',
            responseBodyObject.JWTAccessToken
        );
        location.assign('/home');
    } else {
        setMessageText(responseBodyObject.message);
        emailInputRef.current.blink(2);
        passwordInputRef.current.blink(2);
    }
}

export default function SignIn(props) {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [emailMessageText, setEmailMessageText] = useState('');
    return (
        <div id={styles.root}>
            <div id={styles['title-wrapper']}>
                <div>
                    <svg
                        onClick={props.onBackClick}
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        fill="white"
                        clipRule="evenodd"
                    >
                        <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
                    </svg>
                    <div>Sign in</div>
                </div>
            </div>
            <div id={styles['main-block']}>
                <div className={styles['section']}>
                    <Input
                        placeholder="Email"
                        ref={emailInputRef}
                        messageText={emailMessageText}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        ref={passwordInputRef}
                    ></Input>
                </div>
                <Button
                    text="Sign in"
                    onClick={signIn.bind(
                        null,
                        emailInputRef,
                        passwordInputRef,
                        setEmailMessageText
                    )}
                />
            </div>
        </div>
    );
}

import React from 'react';
import styles from '../styles/UserIndicator.module.css';
import { apiFetch } from '../lib/apiFetch';

export default function UserIndicator(props) {
    const [user, setUser] = React.useState(null);
    React.useEffect(async () => {
        setUser(await (await apiFetch('/profile/get')).json());
    }, []);
    return (
        <div className={styles.user}>
            <div>{user && user.firstName + ' ' + user.lastName}</div>
            <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 1.81132C11.7455 1.81132 1.81132 11.7455 1.81132 24C1.81132 31.0098 5.06185 37.2604 10.1378 41.3267L23.5472 13.5849L37.2024 41.8353C42.6548 37.7926 46.1887 31.309 46.1887 24C46.1887 11.7455 36.2545 1.81132 24 1.81132ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                    fill="white"
                />
                <path
                    d="M33.5095 20.8302C33.5095 26.3322 29.0492 30.7924 23.5472 30.7924C18.0452 30.7924 13.585 26.3322 13.585 20.8302C13.585 15.3282 18.0452 10.8679 23.5472 10.8679C29.0492 10.8679 33.5095 15.3282 33.5095 20.8302Z"
                    fill="white"
                />
            </svg>
        </div>
    );
}

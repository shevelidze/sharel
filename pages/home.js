import react from 'react';
import Button from '../components/Button';
import { apiFetch } from '../lib/apiFetch';
import styles from '../styles/Home.module.css';
import HomeHeader from '../components/HomeHeader';
import React from 'react';

// async function testFetch(router) {
//     apiFetch('/profile/get', {}, true, router);
//     apiFetch('/profile/get_sessions', {}, true, router);
//     apiFetch(
//         '/profile/close_session',
//         { accessTokenHash: '123' },
//         true,
//         router
//     );
// }

export default function Home(props) {
    return (
        <div id={styles.root}>
            <HomeHeader />
            <div>Content</div>
        </div>
    );
}

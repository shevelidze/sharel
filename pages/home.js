import react from 'react';
import Button from '../components/Button';
import { apiFetch } from '../lib/apiFetch';
import { useRouter } from 'next/router';

async function testFetch(router) {
    apiFetch('/profile/get', {}, true, router);
    apiFetch('/profile/get_sessions', {}, true, router);
    apiFetch(
        '/profile/close_session',
        { accessTokenHash: '123' },
        true,
        router
    );
}

export default function Home(props) {
    const router = useRouter();
    return (
        <div>
            <Button onClick={testFetch.bind(null, router)} text="Test fetch!" />
        </div>
    );
}

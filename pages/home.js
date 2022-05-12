import react from 'react';
import Button from '../components/Button';
import { apiFetch } from '../lib/apiFetch';
import { useRouter } from 'next/router';

function testFetch(router) {
    apiFetch('/test_token', {}, true, router);
}

export default function Home(props) {
    const router = useRouter();
    return (
        <div>
            <Button onClick={testFetch.bind(null, router)} text="Test fetch!" />
        </div>
    );
}

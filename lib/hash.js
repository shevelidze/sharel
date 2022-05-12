import crypto from 'crypto';

export default function getHash(data) {
    return crypto.createHash('sha256').update(data).digest('base64');
}

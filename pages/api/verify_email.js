import { verifyUser } from "../../lib/newUnverifiedUsers";

export default function handler(req, res) {
    try {
        if (!verifyUser(req.body)) {
            res.status(400);
            res.json({ message: 'Wrong verification code.' });
        } else {
            res.end();
        }
    } catch {
        res.status(400);
        res.json({ message: 'User with this email not found.' });
    };
}
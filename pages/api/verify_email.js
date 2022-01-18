import { verifyUser } from "../../lib/newUnverifiedUsers";

export default function handler(req, res) {
    if (!verifyUser(req.body)) {
        res.status(400);
    }
    res.end();
}
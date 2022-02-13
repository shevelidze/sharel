import { verifyUser } from "../../lib/newUnverifiedUsers";
import validateData from "../../lib/requestDataValidator";

export default validateData(
    (request, response) => {
        try {
            if (!verifyUser(request.body)) {
                response.status(400);
                response.json({ message: 'Wrong verification code.' });
            } else {
                response.end();
            }
        } catch {
            response.status(400);
            response.json({ message: 'User with this email not found.' });
        };
    },
    {
        properties: {
            email: { type: 'string' },
            verificationCodeFromEmail: { type: 'string' }
        }
    }
)
import prisma from '../../lib/prisma'
import validate from '../../lib/validator'
import crypto from 'crypto'

export default validate(
    'POST',
    {
        properties: {
            password: {
                type: 'string'
            },
            email: {
                type: 'string'
            }
        }
    },
    async (request, response) => {
        let passwordHash = crypto.createHash('sha256').update(request.body.password).digest('base64');
        let userData = await prisma.users.findFirst({
            where: {
                password_hash: passwordHash,
                email: request.body.email
            }
        });
        console.log(userData);
        response.json(userData);
    });
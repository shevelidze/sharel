import prisma from '../../lib/prisma'
import crypto from 'crypto'
import { addUser } from '../../lib/newUnverifiedUsers';
import validateData from '../../lib/requestDataValidator';

export default validateData(
  {
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    }
  },
  'POST',
  async function handler(req, res) {
    console.log(req.body);
    let usersWithRequestedEmail = await prisma.users.findFirst({
      select: {
        id: true
      },
      where: {
        email: req.body.email
      }
    });
    if (usersWithRequestedEmail !== null) {
      res.status(400);
      res.json({
        message: 'User with this email already exists.',
        errors: ['emailHasTaken']
      });
    } else {
      addUser({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password_hash: crypto.createHash('sha256').update(req.body.password).digest('base64')
      });
      res.end();
    };
  }
)
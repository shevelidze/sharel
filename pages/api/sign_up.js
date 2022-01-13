import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  console.log(await prisma.users.create({ data: req.body }));
  res.status(200).json(await prisma.users.findMany());
}

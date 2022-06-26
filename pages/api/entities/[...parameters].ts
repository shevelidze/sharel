import { NextApiHandler } from "next";

const entities: NextApiHandler = (req, res) => {
  console.log(req.query);
  res.end();
}

export default entities;
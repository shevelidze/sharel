import { NextApiHandler } from "next";
import EasyRest from '@shevelidze/easyrest';

const entities: NextApiHandler = (req, res) => {
  console.log(req.query);
  res.end();
}

export default entities;
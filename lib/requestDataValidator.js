import Ajv from 'ajv/dist/jtd'

const ajv = new Ajv()
export default function validateData(handler, schema) {
    let ajvParse = ajv.compile(schema);
    return (req, res) => {
        if (req.method !== 'POST') {
            res.status(405);
            res.json({
                message: 'This method not allowed here. Try POST.'
            });
            return;
        }
        let parsedContentType = null;
        if (req.headers['content-type']) {
            parsedContentType = req.headers['content-type'].split(';')[0].replace(' ', '');
        }
        if (parsedContentType !== 'application/json') {
            res.status(400);
            res.json({
                message: 'Only json is allowed. Try check your Content-type.'
            });
            return;
        }
        if (ajvParse(req.body)) {
            handler(req, res);
        } else {
            res.status(400);
            res.json({
                'message': 'Invalid json.',
                'errors': ajvParse.errors.map((error) => `/${error.instancePath}: ${error.message}`)
            })
        }
    }
}
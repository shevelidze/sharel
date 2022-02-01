import Ajv from 'ajv/dist/jtd'

const ajv = new Ajv()
export default function validateData(handler, methods, schema) {
    if (methods.join === undefined) {
        methods = [methods];
    }
    let ajvParse = ajv.compile(schema);
    let unallowedMethodErrorMessage = `This method not allowed here. Try ${methods.join(', ')}.`;
    return (req, res) => {
        if (methods.indexOf(req.method)) {
            res.status(405);
            res.json({
                message: unallowedMethodErrorMessage
            });
            return;
        }
        let parsedContentType = req.headers['content-type'].split(';')[0].replace(' ', '');
        if (parsedContentType !== 'application/json') {
            res.status(400);
            res.json({
                message: 'Only json is allowed.'
            });
            return;
        }
        if (ajvParse(req.body)) {
            handler(req, res);
        } else {
            res.status(400);
            res.json({
                'message': 'Invalid json.',
                'errors': ajvParse.errors.map((error) => `${error.instancePath}: ${error.message}`)
            })
        }
    }
}
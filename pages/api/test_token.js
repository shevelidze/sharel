import validateJWTToken from '../../lib/requestJWTValidator';

export default validateJWTToken((req, res) => {
    res.end();
});

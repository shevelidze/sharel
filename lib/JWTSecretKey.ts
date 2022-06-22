let modifiableJWTSecretKey: string;

if (process.env.NODE_ENV === 'development') {
  modifiableJWTSecretKey = 'DEVELOPMENT_SECRET_KEY';
}
else if (typeof process.env.JWT_SECRET_KEY === 'string') {
  modifiableJWTSecretKey = process.env.JWT_SECRET_KEY;
}
else {
  throw new Error('Failed to load JWT_SECRET_KEY. Please, check your environment.');
}

const JWTSecretKey = modifiableJWTSecretKey;

export default JWTSecretKey;
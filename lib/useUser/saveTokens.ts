import { TokensPair } from '../generateUserTokensPair';
import jwt from 'jsonwebtoken';

export default function saveTokens(tokens: TokensPair) {
  localStorage.setItem('userAccessToken', tokens.access);
  localStorage.setItem('userRefreshToken', tokens.refresh);

  const decodedRefreshToken = jwt.decode(tokens.refresh);

  if (
    decodedRefreshToken === null ||
    typeof decodedRefreshToken === 'string' ||
    decodedRefreshToken.exp === undefined
  ) {
    throw new Error('Falied to decode refresh token.');
  }

  const expityDate = new Date(decodedRefreshToken.exp * 1000);
  console.log(expityDate);

  document.cookie = `is_authorized=true; Expires=${expityDate.toUTCString()}`;
}

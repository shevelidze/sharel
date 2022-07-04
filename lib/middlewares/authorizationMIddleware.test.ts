import { getTokenFromAuthorization } from './authorizationMiddleware';

describe('Token validation', () => {
  test('get token from authorization header', () => {
    expect(getTokenFromAuthorization('Bearer MySuperToken')).toBe(
      'MySuperToken'
    );
    expect(getTokenFromAuthorization('Bearer ')).toBe('');
    expect(getTokenFromAuthorization('fdsjfdshfaffadsfds')).toBeUndefined();
  });
});

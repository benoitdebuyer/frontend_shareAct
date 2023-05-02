import {  exportedForTesting } from './screens/SignInScreen';
const { calculateAge } = exportedForTesting;
const API_URL = 'https://shareact-backend.vercel.app';

describe('Test sur la fonction calculateAge de SignInScreen.tsx : ', () => {
  it('doit calculer l âge correctement', () => {
    const testDate = new Date('1990-01-01');
    expect(calculateAge(testDate)).toBe(33);
  });
});

test('Test inscription avec la route signup', async () => {
  const response = await fetch('https://shareact-backend.vercel.app/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: 'John',
      username: 'john123',
      email: 'john@gmail.com',
      password: 'secret',
      age: '1990-01-01T00:00:00.000Z',
      gender: 'male',
      image: 'https://example.com/image.jpg'
    }),
  });
  const data = await response.json();
  expect(response.status).toEqual(200);
  expect(data.result).toBe(true);
  expect(data.token).toBeDefined();
});
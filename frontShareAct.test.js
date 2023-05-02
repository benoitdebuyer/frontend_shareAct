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
  const userData = {
    firstname: 'Camille',
    username: 'Trinity0077',
    email: 'kam@trinity0077.com',
    password: '1234supercode',
    age: '1986-02-02',
    gender: 'Femme'
  };

  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();
  expect(response.status).toEqual(200);
  expect(data.result).toBe(true);
  expect(data.token).toBeDefined();
});
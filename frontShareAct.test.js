import {  exportedForTesting } from './screens/SignInScreen';
const { calculateAge } = exportedForTesting;


describe('Test sur la fonction calculateAge de SignInScreen.tsx : ', () => {
  it('doit calculer l âge correctement', () => {
    const testDate = new Date('1990-01-01');
    expect(calculateAge(testDate)).toBe(33);
  });
});

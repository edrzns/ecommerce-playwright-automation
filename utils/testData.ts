import { faker } from '@faker-js/faker';

export function generateUniqueEmail(): string {
  return faker.internet.email({ provider: 'test.com' });
}

export function generateTestUser() {
  return {
    name: faker.person.fullName(),
    email: generateUniqueEmail(),
    password: 'Test123!',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number(),
  };
}

export function generateAccountDetails(user: ReturnType<typeof generateTestUser>) {
  return {
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1] || 'User',
    address: user.address,
    country: 'Canada',
    state: user.state,
    city: user.city,
    zipcode: user.zipcode,
    mobile: user.mobile,
  };
}

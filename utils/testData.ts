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

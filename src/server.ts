import { faker } from '@faker-js/faker';
import { CustomerRepository } from './modules/customer.ts/customer.repository';
import { Customer } from './modules/customer.ts/interfaces';

export function createCustomers() {
  const customerRepository = new CustomerRepository();

  setInterval(() => {
    const numberOfCustomers = faker.number.int({ min: 1, max: 10 });
    const customers = createFakeCustomers(numberOfCustomers);
    customerRepository.createMany(customers).then(res => {
      console.log(`Created ${res.length} customers`);
    });
  }, 200);
}

function createFakeCustomers(numberOfCustomers: number): Customer[] {
  const customers: Customer[] = new Array(numberOfCustomers);

  for (let i = 0; i < numberOfCustomers; i++) {
    customers[i] = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      address: {
        line1: faker.location.streetAddress(),
        line2: faker.location.secondaryAddress(),
        postcode: faker.location.zipCode(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
      },
    };
  }

  return customers;
}

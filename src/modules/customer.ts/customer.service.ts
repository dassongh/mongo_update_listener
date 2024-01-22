import { randomBytes } from 'crypto';

import { faker } from '@faker-js/faker';

import { CustomerRepository } from './customer.repository';
import { Customer, ModelUpdate } from './interfaces';

import { CustomerAnonymizedRepository } from '../customer-anonymized/customer-anonymized.repository';

export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private customerAnonymizedRepository: CustomerAnonymizedRepository,
  ) {}

  createFakeCustomers(numberOfCustomers: number): Promise<Customer[]> {
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

    return this.customerRepository.createMany(customers);
  }

  createAnonymizedCustomer(customerUpdateModel: ModelUpdate) {
    const customer = customerUpdateModel.fullDocument;
    const emailSuffix = customer.email.split('@')[1];
    const anonymizedCustomer = {
      _id: customer._id,
      firstName: randomBytes(4).toString('hex'),
      lastName: randomBytes(4).toString('hex'),
      email: `${randomBytes(4).toString('hex')}@${emailSuffix}`,
      address: {
        line1: randomBytes(4).toString('hex'),
        line2: randomBytes(4).toString('hex'),
        postcode: randomBytes(4).toString('hex'),
        city: customer.address.city,
        state: customer.address.state,
        country: customer.address.country,
      },
    };

    return this.customerAnonymizedRepository.create(anonymizedCustomer);
  }
}

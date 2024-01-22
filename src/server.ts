import { faker } from '@faker-js/faker';

import CustomerModel from './modules/customer.ts/customer.model';

import { CustomerService } from './modules/customer.ts/customer.service';

import { CustomerAnonymizedRepository } from './modules/customer-anonymized/customer-anonymized.repository';
import { CustomerRepository } from './modules/customer.ts/customer.repository';

const customerService = new CustomerService(new CustomerRepository(), new CustomerAnonymizedRepository());

export function createCustomers() {
  setInterval(() => {
    const numberOfCustomers = faker.number.int({ min: 1, max: 10 });
    customerService.createFakeCustomers(numberOfCustomers).then(res => {
      console.log(`Created ${res.length} customers`);
    });
  }, 200);
}

export function initListener() {
  CustomerModel.watch().on('change', customerService.createAnonymizedCustomer.bind(customerService));
}

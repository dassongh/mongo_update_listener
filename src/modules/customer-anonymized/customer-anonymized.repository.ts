import CustomerAnonymizedModel from './customer-anonymized.model';

import { Repository } from '../../common/repository';
import { Customer } from '../customer.ts/interfaces';

export class CustomerAnonymizedRepository extends Repository<Customer> {
  constructor() {
    super(CustomerAnonymizedModel);
  }
}

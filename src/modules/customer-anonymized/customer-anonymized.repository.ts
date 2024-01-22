import { Repository } from '../../common/repository';
import { Customer } from '../customer.ts/interfaces';
import CustomerAnonymizedModel from './customer-anonymized.model';

export class CustomerAnonymizedRepository extends Repository<Customer> {
  constructor() {
    super(CustomerAnonymizedModel);
  }
}

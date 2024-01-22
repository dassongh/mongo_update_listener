import { Repository } from '../../common/repository';
import CustomerModel from './customer.model';
import { Customer } from './interfaces';

export class CustomerRepository extends Repository<Customer> {
  constructor() {
    super(CustomerModel);
  }
}

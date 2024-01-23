import { CustomerAnonymizedRepository } from '../customer-anonymized/customer-anonymized.repository';
import { Customer } from '../customer.ts/interfaces';

export class CustomerAnonymizedService {
  constructor(private customerAnonymizedRepository: CustomerAnonymizedRepository) {}

  public async getCustomers({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<{ customers: Customer[]; count: number }> {
    const { 0: customers, 1: count } = await Promise.all([
      this.customerAnonymizedRepository.getPaginated({}, {}, limit, offset),
      this.customerAnonymizedRepository.count({}),
    ]);

    return { customers, count };
  }
}

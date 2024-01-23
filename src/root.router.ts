import { Router } from 'express';

import { CustomerAnonymizedRepository } from './modules/customer-anonymized/customer-anonymized.repository';
import { CustomerAnonymizedService } from './modules/customer-anonymized/customer-anonymized.service';

export default class RootRouter {
  public router: Router;
  private customerAnonymizedService: CustomerAnonymizedService;

  constructor() {
    this.customerAnonymizedService = new CustomerAnonymizedService(new CustomerAnonymizedRepository());
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get('/customer-anonymized', (req, res) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = limit * (page - 1);

      this.customerAnonymizedService
        .getCustomers({ limit, offset })
        .then(({ customers, count }) => {
          res.json({
            pagination: { page, limit, count },
            customers,
          });
        })
        .catch(err => res.json({ error: err.message, status: 500 }));
    });
    this.router.get('/version', (req, res) => res.json({ version: 1 }));
    this.router.get('/health', (req, res) => res.json({ status: 'ok' }));
  }
}

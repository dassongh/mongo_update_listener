import { Router } from 'express';

export default class RootRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get('/version', (req, res) => res.json({ version: 1 }));
    this.router.get('/health', (req, res) => res.json({ status: 'ok' }));
  }
}

import { Customer } from './';

export interface ModelUpdate {
  _id: {
    _data: string;
  };
  operationType: string;
  clusterTime: {
    t: number;
    i: number;
  };
  wallTime: string;
  fullDocument: Customer;
  ns: {
    db: string;
    coll: string;
  };
  documentKey: {
    _id: string;
  };
}

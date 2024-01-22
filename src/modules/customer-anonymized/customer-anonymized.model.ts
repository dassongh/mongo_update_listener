import { Schema, model } from 'mongoose';
import { customer } from '../customer.ts/customer.model';
import { Customer } from '../customer.ts/interfaces';

const customerSchema = new Schema<Customer>(customer, { versionKey: false, timestamps: true });

export default model<Customer>('CustomerAnonymized', customerSchema);

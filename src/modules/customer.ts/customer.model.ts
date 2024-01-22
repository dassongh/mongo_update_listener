import { Schema, model } from 'mongoose';
import { Customer } from './interfaces';

export const customer = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
};

const customerSchema = new Schema<Customer>(customer, { versionKey: false, timestamps: true });

export default model<Customer>('Customer', customerSchema);

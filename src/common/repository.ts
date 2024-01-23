import { FilterQuery, Model, ProjectionFields, SortOrder } from 'mongoose';
import { DBError } from '../utils/customError';
import { ModelType } from './interfaces';

export class Repository<T extends ModelType> {
  constructor(private model: Model<T>) {}

  getPaginated(
    filter: FilterQuery<T>,
    projection: ProjectionFields<T>,
    limit: number,
    offset: number,
    sort?: string | { [key: string]: SortOrder } | [string, SortOrder][] | null | undefined,
  ) {
    return this.model
      .find(filter, projection)
      .sort(sort)
      .limit(limit)
      .skip(offset)
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  get(filter: FilterQuery<T>, projection: ProjectionFields<T>) {
    return this.model
      .find(filter, projection)
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  getOne(filter: FilterQuery<T>, projection: ProjectionFields<T>, populate) {
    return this.model
      .findOne(filter, projection)
      .populate(populate)
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  getById(id, projection: ProjectionFields<T>, populate) {
    return this.model
      .findOne({ _id: id }, projection)
      .populate(populate)
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  create(payload) {
    return this.model.create(payload).catch(error => {
      throw new DBError(error);
    });
  }

  createMany(payload: T[]) {
    return this.model.insertMany(payload).catch(error => {
      throw new DBError(error);
    });
  }

  updateMany(filter: FilterQuery<T>, update) {
    return this.model.updateMany(filter, update).catch(error => {
      throw new DBError(error);
    });
  }

  updateOne(filter: FilterQuery<T>, update) {
    return this.model.updateOne(filter, update).catch(error => {
      throw new DBError(error);
    });
  }

  findOneAndUpdate(filter: FilterQuery<T>, update) {
    return this.model
      .findOneAndUpdate(filter, update, { new: true })
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  deleteOne(filter: FilterQuery<T>) {
    return this.model.deleteOne(filter).catch(error => {
      throw new DBError(error);
    });
  }

  deleteMany(filter: FilterQuery<T>) {
    return this.model.deleteMany(filter).catch(error => {
      throw new DBError(error);
    });
  }

  count(filter: FilterQuery<T>) {
    return this.model.countDocuments(filter).catch(error => {
      throw new DBError(error);
    });
  }
}

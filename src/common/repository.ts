import { FilterQuery, Model, PopulateOptions, ProjectionFields, SortOrder } from 'mongoose';
import { DBError } from '../utils/customError';
import { ModelType } from './interfaces';

export class Repository<T extends ModelType> {
  constructor(private model: Model<T>) {}

  getPaginated(
    filter: FilterQuery<T>,
    projection: ProjectionFields<T>,
    limit: number,
    offset: number,
    sort: string | { [key: string]: SortOrder } | [string, SortOrder][] | null | undefined,
    populate: PopulateOptions,
  ) {
    return this.model
      .find(filter, projection)
      .sort(sort)
      .limit(limit)
      .skip(offset)
      .populate(populate)
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  get(filter, projection) {
    return this.model
      .find(filter, projection)
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  getOne(filter, projection, populate) {
    return this.model
      .findOne(filter, projection)
      .populate(populate)
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  getById(id, projection, populate) {
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

  updateMany(filter, update) {
    return this.model.updateMany(filter, update).catch(error => {
      throw new DBError(error);
    });
  }

  updateOne(filter, update) {
    return this.model.updateOne(filter, update).catch(error => {
      throw new DBError(error);
    });
  }

  findOneAndUpdate(filter, update) {
    return this.model
      .findOneAndUpdate(filter, update, { new: true })
      .lean()
      .catch(error => {
        throw new DBError(error);
      });
  }

  deleteOne(filter) {
    return this.model.deleteOne(filter).catch(error => {
      throw new DBError(error);
    });
  }

  deleteMany(filter) {
    return this.model.deleteMany(filter).catch(error => {
      throw new DBError(error);
    });
  }

  count(filter) {
    return this.model.countDocuments(filter).catch(error => {
      throw new DBError(error);
    });
  }
}

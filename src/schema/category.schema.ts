import FluentSchema from 'fluent-json-schema';
import { User } from './auth.schema';

export declare type Category = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  counter: number;
  ownerId: number;
  owner: Partial<User>;
};
export type CategoryDto = {
  counter: number;
  latitude: number;
  longitude: number;
  ownerId: number;
  title: string;
};
export const IdParameter = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'category id',
      },
    },
  },
};

export const CreateCategorySchema = FluentSchema.object()
  .prop('latitude', FluentSchema.number().required().minimum(0))
  .prop('longitude', FluentSchema.number().required().minimum(0))
  .prop('title', FluentSchema.string().required())
  .prop('counter', FluentSchema.number().required().minimum(0))
  .valueOf();

export const UpdateCategorySchema = FluentSchema.object()
  .prop('latitude', FluentSchema.number().minimum(0))
  .prop('longitude', FluentSchema.number().minimum(0))
  .prop('title', FluentSchema.string())
  .prop('counter', FluentSchema.number().minimum(0))
  .valueOf();

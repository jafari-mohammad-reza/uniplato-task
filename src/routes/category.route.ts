import { FastifyInstance, FastifySchema } from 'fastify';
import { CreateCategorySchema, IdParameter, UpdateCategorySchema } from '../schema/category.schema';
import {
  CreateCategoryHandler,
  DeleteCategoryHandler,
  GetAllCategoriesHandler,
  GetCategoryHandler,
  UpdateCategoryHandler,
} from '../handlers';

export async function CategoryRoute(server: FastifyInstance) {
  const CategorySchema = {
    tags: ['Category'],
    consumes: ['application/x-www-form-urlencoded'],
  };
  server.route({
    url: '/category',
    method: 'GET',
    handler: GetAllCategoriesHandler,
    schema: {
      ...CategorySchema,
    } as FastifySchema,
  });
  server.route({
    url: '/category/:id',
    method: 'GET',
    handler: GetCategoryHandler,
    schema: {
      ...CategorySchema,
      ...IdParameter,
    },
  });
  server.route({
    url: '/category',
    method: 'POST',
    handler: CreateCategoryHandler,
    schema: {
      ...CategorySchema,
      body: CreateCategorySchema,
    } as FastifySchema,
  });
  server.route({
    url: '/category/:id',
    method: 'PUT',
    handler: UpdateCategoryHandler,
    schema: {
      ...CategorySchema,
      ...IdParameter,
      body: UpdateCategorySchema,
    },
  });
  server.route({
    url: '/category/:id',
    method: 'DELETE',
    handler: DeleteCategoryHandler,
    schema: {
      ...CategorySchema,
      ...IdParameter,
    },
  });
}

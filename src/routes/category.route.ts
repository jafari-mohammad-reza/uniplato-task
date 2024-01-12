import { FastifyInstance } from 'fastify';
import { CreateCategorySchema, IdParameter, UpdateCategorySchema } from '../schema/category.schema';
import {
  CreateCategoryHandler,
  DeleteCategoryHandler,
  GetAllCategoriesHandler,
  GetCategoryHandler,
  UpdateCategoryHandler,
} from '../handlers';
import { AuthorizationMiddleware } from '../middlewares';

export async function CategoryRoute(server: FastifyInstance) {
  const CategorySchema = {
    tags: ['Category'],
    consumes: ['application/x-www-form-urlencoded'],
  };

  server.register(
    async (categoryRoute) => {
      categoryRoute.addHook('preHandler', AuthorizationMiddleware);

      categoryRoute.get('/', { schema: { ...CategorySchema } }, GetAllCategoriesHandler);

      categoryRoute.get(
        '/:id',
        { schema: { ...CategorySchema, ...IdParameter } },
        GetCategoryHandler,
      );

      categoryRoute.post(
        '/',
        { schema: { ...CategorySchema, body: CreateCategorySchema } },
        CreateCategoryHandler,
      );

      categoryRoute.put(
        '/:id',
        { schema: { ...CategorySchema, ...IdParameter, body: UpdateCategorySchema } },
        UpdateCategoryHandler,
      );

      categoryRoute.delete(
        '/:id',
        { schema: { ...CategorySchema, ...IdParameter } },
        DeleteCategoryHandler,
      );
    },
    { prefix: '/category' },
  );
}

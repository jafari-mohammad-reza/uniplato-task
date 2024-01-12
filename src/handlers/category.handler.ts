import { FastifyReply, FastifyRequest } from 'fastify';
import { IdParam } from '../schema';
import { CategoryDto } from '../schema/category.schema';
import {
  CreateCategory,
  DeleteCategory,
  GetAllCategories,
  GetOneCategory,
  UpdateCategory,
} from '../services';

export async function GetAllCategoriesHandler(req: FastifyRequest, rep: FastifyReply) {
  const categories = await GetAllCategories();
  return rep.status(200).send({
    categories,
  });
}

export async function GetCategoryHandler(
  req: FastifyRequest<{ Params: IdParam }>,
  rep: FastifyReply,
) {
  const { id } = req.params;
  const category = await GetOneCategory(id);
  return rep.status(200).send({
    category,
  });
}

export async function CreateCategoryHandler(
  req: FastifyRequest<{ Body: CategoryDto; Headers: { userid: number } }>,
  rep: FastifyReply,
) {
  const dto = { ...req.body, ownerId: req.headers.userid };
  console.log('dto :>> ', dto);
  const createdCategory = await CreateCategory(dto);
  return rep.status(201).send({
    createdCategory,
  });
}
export async function UpdateCategoryHandler(
  req: FastifyRequest<{ Params: IdParam; Body: CategoryDto }>,
  rep: FastifyReply,
) {
  const { id } = req.params;
  const dto = { ...req.body };
  delete dto.ownerId;
  console.log('dto :>> ', dto);
  await UpdateCategory(id, dto);
  return rep.status(200).send({
    msg: 'category got updated',
  });
}
export async function DeleteCategoryHandler(
  req: FastifyRequest<{ Params: IdParam }>,
  rep: FastifyReply,
) {
  const { id } = req.params;
  await DeleteCategory(id);
  return rep.status(200).send({
    msg: 'category got removed',
  });
}

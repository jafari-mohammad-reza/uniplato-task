import { FastifyReply, FastifyRequest } from 'fastify';
import { IdParam } from 'schema';

export async function GetAllCategoriesHandler(req: FastifyRequest, rep: FastifyReply) {
  rep.send({
    msg: 'categories',
  });
}

export async function GetCategoryHandler(
  req: FastifyRequest<{ Params: IdParam }>,
  rep: FastifyReply,
) {
  const { id } = req.params;
  rep.send({
    msg: 'categories',
  });
}

export async function CreateCategoryHandler(req: FastifyRequest, rep: FastifyReply) {
  rep.send({
    msg: 'categories',
  });
}
export async function UpdateCategoryHandler(
  req: FastifyRequest<{ Params: IdParam }>,
  rep: FastifyReply,
) {
  const { id } = req.params;
  rep.send({
    msg: 'categories',
  });
}
export async function DeleteCategoryHandler(
  req: FastifyRequest<{ Params: IdParam }>,
  rep: FastifyReply,
) {
  const { id } = req.params;
  rep.send({
    msg: 'categories',
  });
}

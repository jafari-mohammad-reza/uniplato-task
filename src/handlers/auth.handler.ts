import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginRequestBody } from '../schema';
import { Login, Register } from '../services';

export async function LoginHandler(
  req: FastifyRequest<{ Body: LoginRequestBody }>,
  rep: FastifyReply,
) {
  const { email, password } = req.body;
  const token = await Login(email, password);
  return rep.send({
    token,
  });
}
export async function RegisterHandler(
  req: FastifyRequest<{ Body: LoginRequestBody }>,
  rep: FastifyReply,
) {
  const { email, password } = req.body;
  await Register(email, password);
  return rep.send({
    msg: 'registered successfully',
  });
}

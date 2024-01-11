import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginRequestBody } from '../schema';
import { Login } from '../services';

export async function LoginHandler(
  req: FastifyRequest<{ Body: LoginRequestBody }>,
  rep: FastifyReply,
) {
  const { email, password } = req.body;
  const token = await Login(email, password);
  // TODO: send token
  return rep.send({
    token,
  });
}
export async function RegisterHandler(req: FastifyRequest, rep: FastifyReply) {}

import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { DecodeToken, ERRORS, isJwtExpired, prisma } from '../helper';

export async function AuthorizationMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization;

  if (!token) {
    throw ERRORS.unauthorized;
  }
  const jwtToken = token.split('Bearer')[1];

  if (!jwtToken) {
    throw ERRORS.unauthorized;
  }
  const payload = DecodeToken(jwtToken.trim());

  if (!payload) {
    throw ERRORS.unauthorized;
  }
  if (isJwtExpired(payload.exp)) {
    throw ERRORS.unauthorized;
  }
  const existUser = await prisma.user.findFirst({ where: { id: payload.id } });
  if (!existUser) {
    throw ERRORS.unauthorized;
  }
  req.headers.userid = payload.id;
}

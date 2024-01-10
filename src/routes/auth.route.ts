import { FastifyInstance } from 'fastify';
import { LoginHandler, RegisterHandler } from 'handlers';
import FluentSchema from 'fluent-json-schema';

export async function AuthRoute(server: FastifyInstance) {
  const emailSchema = {
    body: FluentSchema.object()
      .prop('email', FluentSchema.string().format('email').required())
      .prop('password', FluentSchema.string().required().minLength(8).maxLength(16))
      .valueOf(),
    consumes: ['application/x-www-form-urlencoded'],
    tags: ['Auth'],
  };
  server.route({
    url: '/auth/login',
    method: 'POST',
    handler: LoginHandler,
    ...emailSchema,
  });
  server.route({
    url: '/auth/register',
    method: 'POST',
    handler: RegisterHandler,
    ...emailSchema,
  });
}

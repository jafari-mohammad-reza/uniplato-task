import { FastifyInstance } from 'fastify';

export async function CookieConf(server: FastifyInstance) {
  await server.register(require('@fastify/cookie'), {
    secret: 'my-secret',
    hook: 'onRequest',
    parseOptions: {},
  });
}

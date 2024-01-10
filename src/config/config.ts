import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';

export async function EnvConfig(fastify: FastifyInstance) {
  const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
      PORT: {
        type: 'string',
        default: 4000,
      },
    },
  };

  const options = {
    confKey: 'config',
    schema: schema,
    data: process.env,
  };

  await fastify.register(fastifyEnv, options);
  console.log('Env got configured');
}

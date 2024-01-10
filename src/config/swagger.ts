import { FastifyInstance } from 'fastify';
import FastifySwagger from '@fastify/swagger';
import { log } from 'console';
export async function SwaggerConf(fastify: FastifyInstance) {
  await fastify.register(FastifySwagger, {
    swagger: {
      info: {
        title: 'Uniplato Task',
        description: 'Uniplato Task swagger API',
        version: '1.0.0',
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'category', description: 'Category related end-points' },
      ],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  });
  console.log('Swagger got configured');
}

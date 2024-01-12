import { FastifyInstance } from 'fastify';
import FastifySwagger, { SwaggerOptions } from '@fastify/swagger';
import FastifySwaggerUi from '@fastify/swagger-ui';
import { log } from 'console';
export async function SwaggerConf(fastify: FastifyInstance) {
  const swaggerOptions: SwaggerOptions = {
    swagger: {
      info: {
        title: 'Uniplato Task',
        description: 'Uniplato Task swagger API',
        version: '1.0.0',
      },
      host: 'localhost:4000',
      schemes: ['http'],
      consumes: ['application/x-www-form-urlencoded'],
      produces: ['application/x-www-form-urlencoded'],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'authorization',
          in: 'header',
        },
      },
      security: [{ apiKey: [] }],
    },
  };

  const swaggerUiOptions: any = {
    routePrefix: '/docs',
    exposeRoute: true,
  };
  await fastify.register(FastifySwagger, swaggerOptions);
  await fastify.register(FastifySwaggerUi, swaggerUiOptions);
  console.log('Swagger got configured');
}

import Fastify from 'fastify';
import { CookieConf, EnvConfig, SwaggerConf } from './config';
import pino from 'pino';
import { AuthRoute, CategoryRoute } from './routes';
import formBody from '@fastify/formbody';
declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
    };
  }
}
async function InitServer() {
  const logger = pino({ level: 'info' });
  const server = Fastify({ logger: process.env.NODE_ENV === 'development' && logger });

  try {
    await EnvConfig(server);
    await SwaggerConf(server);
    await CookieConf(server);
    await server.register(formBody);
    AuthRoute(server);
    CategoryRoute(server);
    const port = parseInt(server.config.PORT, 10);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on ${port}`);
    process.on('unhandledRejection', (error) => {
      logger.error(error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Error during server initialization:', error);
    process.exit(1);
  }
}

InitServer();

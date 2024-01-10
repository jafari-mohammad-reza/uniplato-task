import Fastify from 'fastify';
import { EnvConfig, SwaggerConf } from './config';
import pino from 'pino';
import { AuthRoute } from 'routes';
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
    await AuthRoute(server);
    const port = parseInt(server.config.PORT, 10);
    await server.listen({ port });
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

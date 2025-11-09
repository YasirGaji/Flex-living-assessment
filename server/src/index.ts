import dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import { registerRoutes } from './routes';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const prisma = new PrismaClient();


fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(sensible);

fastify.register(registerRoutes);

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : error.message;

  reply.status(statusCode).send({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  });
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || '0.0.0.0';

    fastify.decorate('prisma', prisma);

    await fastify.listen({ port, host });
    fastify.log.info(`Server running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err, 'Server startup failed.');
    await prisma.$disconnect(); 
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  try {
    await fastify.close();
    await prisma.$disconnect();
    fastify.log.info('Server closed gracefully');
    process.exit(0);
  } catch (err) {
    fastify.log.error('Error during graceful shutdown');
    process.exit(1);
  }
});

start();
import { FastifyReply } from 'fastify';
import { ERROR500 } from './constants';

export const ERRORS = {
  invalidToken: new Error('Token is invalid.'),
  userExists: new Error('User already exists'),
  categoryExists: new Error('category already exists'),
  categoryNotExists: new Error('category not exists'),
  userNotExists: new Error('User not exists'),
  createFailed: new Error('failed in entity creation'),
  userCredError: new Error('Invalid credential'),
  tokenError: new Error('Invalid Token'),
  unauthorized: new Error('Unauthorized please login again'),
};

export function handleServerError(reply: FastifyReply, error: any) {
  return reply.status(ERROR500.statusCode).send(ERROR500);
}

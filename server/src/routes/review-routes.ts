import { FastifyInstance } from 'fastify';
import { 
    normalizeHostawayDataController, 
    getReviewsController,
    updateApprovalController 
} from '../controllers/ReviewController';

export async function reviewRoutes(fastify: FastifyInstance) {
  fastify.get('/hostaway', normalizeHostawayDataController);

  fastify.get('/', getReviewsController);

  fastify.post('/approval', updateApprovalController);
}
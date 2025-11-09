import { FastifyReply, FastifyRequest } from 'fastify';
import {
  normalizeAndPersistReviews,
  getAllNormalizedReviews,
} from '../services/ReviewService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UpdateApprovalBody {
  reviewId: number;
  isApproved: boolean;
}

/**
 * Executes the data ingestion, normalization, and persistence flow.
 * Required: Runs only once or when fresh data is needed.
 */
export async function normalizeHostawayDataController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await normalizeAndPersistReviews();

    const reviews = await getAllNormalizedReviews();

    return reply.send({
      success: true,
      message: 'Hostaway reviews processed and normalized successfully.',
      data: reviews,
      count: reviews.length,
    });
  } catch (error) {
    request.log.error(error, 'Error during Hostaway normalization');
    throw reply.internalServerError('Failed to process review data.');
  }
}

/**
 * Fetches the currently stored normalized reviews (used by the Dashboard).
 */
export async function getReviewsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const reviews = await getAllNormalizedReviews();

    return reply.send({
      success: true,
      data: reviews,
      count: reviews.length,
    });
  } catch (error) {
    request.log.error(error, 'Error fetching reviews');
    throw reply.internalServerError('Failed to retrieve normalized reviews.');
  }
}

/**
 * Updates the manager's approval status for a specific review.
 */
export async function updateApprovalController(
  request: FastifyRequest<{ Body: UpdateApprovalBody }>,
  reply: FastifyReply
) {
  const { reviewId, isApproved } = request.body;

  if (typeof reviewId !== 'number' || typeof isApproved !== 'boolean') {
    throw reply.badRequest('Invalid reviewId or isApproved format.');
  }

  try {
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { isApproved },
      select: {
        externalId: true,
        isApproved: true,
        listing: { select: { name: true } },
      },
    });

    return reply.send({
      success: true,
      message: `Review ${updatedReview.externalId} approval status set to ${isApproved}.`,
      data: updatedReview,
    });
  } catch (error) {
    request.log.error(error, `Error updating approval for review ${reviewId}`);

    if ((error as any).code === 'P2025') {
      throw reply.notFound(`Review with ID ${reviewId} not found.`);
    }
    throw reply.internalServerError('Failed to update review approval status.');
  }
}

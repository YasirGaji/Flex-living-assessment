import { PrismaClient } from '@prisma/client';
import { RawHostawayReview, NormalizedReview, NormalizedCategory } from '../types/review';
import mockData from '../data/mock-hostaway-data.json';

const prisma = new PrismaClient();

/**
 * Calculates a single normalized overall rating (1-10 scale) 
 * by averaging the category ratings, or using the main rating if available.
 * @param review The raw Hostaway review object.
 * @returns A normalized rating between 1.0 and 10.0.
 */
function calculateOverallRating(review: RawHostawayReview): number {
    const validCategoryRatings = review.reviewCategory
        .map(cat => cat.rating)
        .filter((rating): rating is number => rating !== null && rating > 0);

    if (validCategoryRatings.length > 0) {
        const sum = validCategoryRatings.reduce((a, b) => a + b, 0);
        return parseFloat((sum / validCategoryRatings.length).toFixed(1));
    }

    if (review.rating !== null && review.rating > 0) {

        const assumedMaxRating = 10; 
        const normalized = (review.rating / assumedMaxRating) * 10;
        return parseFloat(normalized.toFixed(1));
    }
    
    return 5.0; 
}

/**
 * Transforms a single raw Hostaway review object into our standardized NormalizedReview type.
 * @param rawReview The raw review data.
 * @returns The normalized review object.
 */
export function normalizeReview(rawReview: RawHostawayReview): NormalizedReview {
    const text = rawReview.publicReview || `(No public review text provided for ID ${rawReview.id})`;
    const guestName = rawReview.guestName || 'Anonymous Guest';

    const categoryRatings: NormalizedCategory[] = rawReview.reviewCategory
        .filter((cat): cat is { category: string, rating: number } => cat.rating !== null && cat.rating > 0)
        .map(cat => ({
            category: cat.category,
            rating: cat.rating 
        }));

    const overallRating = calculateOverallRating(rawReview);

    return {
        id: rawReview.id,
        listingName: rawReview.listingName,
        channel: 'Hostaway',
        reviewType: rawReview.type,
        overallRating: overallRating,
        text: text,
        guestName: guestName,
        submittedAt: new Date(rawReview.submittedAt.replace(' ', 'T')), 
        categoryRatings: categoryRatings,
    };
}

/**
 * Fetches mock data, normalizes it, and ensures the reviews and their listings 
 * exist in the PostgreSQL database (upsert logic).
 * * @returns The normalized reviews from the database.
 */
export async function normalizeAndPersistReviews(): Promise<NormalizedReview[]> {
    const rawReviews: RawHostawayReview[] = mockData as RawHostawayReview[];
    const normalizedReviews: NormalizedReview[] = rawReviews.map(normalizeReview);

    console.log(`[Normalization] Processing ${normalizedReviews.length} reviews.`);

    for (const review of normalizedReviews) {
        const listing = await prisma.listing.upsert({
            where: { name: review.listingName },
            update: {}, 
            create: { 
                name: review.listingName,
            }
        });
        
        await prisma.review.upsert({
            where: { id: review.id },
            update: {
       
                overallRating: review.overallRating,
                text: review.text,
                submittedAt: review.submittedAt,
            },
            create: {
                id: review.id,
                listingId: listing.id,
                channel: review.channel,
                reviewType: review.reviewType,
                overallRating: review.overallRating,
                text: review.text,
                guestName: review.guestName,
                submittedAt: review.submittedAt,
                categoryRatings: review.categoryRatings as any, 
                isApproved: false, 
            }
        });
    }

    const uniqueListingNames = Array.from(new Set(normalizedReviews.map(r => r.listingName)));
    for (const name of uniqueListingNames) {
        const aggregates = await prisma.review.aggregate({
            _avg: { overallRating: true },
            _count: true,
            where: { listing: { name } }
        });

        await prisma.listing.update({
            where: { name },
            data: {
                averageRating: aggregates._avg.overallRating,
                totalReviews: aggregates._count,
            }
        });
    }
    
    const persistedReviews = await prisma.review.findMany({
      include: { listing: true }
    });

    console.log(`[Normalization] Persisted ${persistedReviews.length} reviews.`);

    return normalizedReviews;
}

/**
 * Controller/API helper function to fetch ALL normalized reviews.
 */
export async function getAllNormalizedReviews() {
    return prisma.review.findMany({
        orderBy: { submittedAt: 'desc' },
        select: {
            id: true,
            externalId: true,
            channel: true,
            reviewType: true,
            overallRating: true,
            text: true,
            guestName: true,
            submittedAt: true,
            categoryRatings: true,
            isApproved: true,
            listing: {
                select: { id: true, name: true }
            }
        }
    });
}
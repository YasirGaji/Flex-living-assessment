import { subDays } from 'date-fns';
import type { NormalizedReview } from '../types/review';

export const MOCK_FEATURED_REVIEWS: NormalizedReview[] = [
    {
        id: 1001,
        externalId: 'f7c8a6e9-b5d4-4a1c-9f0e-d3a2b1c4e7f0',
        listingId: 'listing-a',
        listingName: '7C L5 D - 45 West Side Lofts',
        channel: 'Hostaway',
        reviewType: 'guest-to-host',
        overallRating: 9.8,
        text: 'We rented a serviced apartment in London from The Flex for a project that lasted over 6 months. They were very easy to work with and extended multiple times on short notice. Fantastic experience!',
        guestName: 'Francesca, Senior Manager',
        submittedAt: subDays(new Date(), 90).toISOString(),
        categoryRatings: [{ category: 'service', rating: 10 }],
        isApproved: true,
        listing: { id: 'listing-a', name: '7C L5 D - 45 West Side Lofts' }
    },
    {
        id: 1002,
        externalId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        listingId: 'listing-b',
        listingName: '2B N1 A - 29 Shoreditch Heights',
        channel: 'Airbnb',
        reviewType: 'guest-to-host',
        overallRating: 9.5,
        text: 'The apartment was spotless, and the communication was seamless. A true home away from home. The kitchen amenities were top-notch.',
        guestName: 'Jessica B.',
        submittedAt: subDays(new Date(), 45).toISOString(),
        categoryRatings: [{ category: 'cleanliness', rating: 9 }],
        isApproved: true,
        listing: { id: 'listing-b', name: '2B N1 A - 29 Shoreditch Heights' }
    },
    {
        id: 1003,
        externalId: 'b9d8c7a6-f5e4-3210-9876-543210fedcba',
        listingId: 'listing-c',
        listingName: '4A S3 B - 12 Soho Grand Residence',
        channel: 'Booking.com',
        reviewType: 'guest-to-host',
        overallRating: 8.9,
        text: 'Great value for the price and the location was superb. Minor issue with the heating system which was resolved within the hour. Excellent response time.',
        guestName: 'Oliver D.',
        submittedAt: subDays(new Date(), 10).toISOString(),
        categoryRatings: [{ category: 'maintenance', rating: 7 }],
        isApproved: true,
        listing: { id: 'listing-c', name: '4A S3 B - 12 Soho Grand Residence' }
    }
];
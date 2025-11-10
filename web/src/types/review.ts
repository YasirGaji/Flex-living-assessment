import type { ReactNode } from 'react';

export interface Listing {
  approvalRate: ReactNode;
  id: string;
  name: string;
  averageRating: number | null;
  totalReviews: number;
}

export interface NormalizedCategory {
  category: string;
  rating: number;
}

export interface NormalizedReview {
  id: number;
  externalId: string;
  listingId: string;
  channel: 'Hostaway' | 'Google' | string;
  reviewType: string;
  overallRating: number;
  text: string;
  guestName: string;
  submittedAt: string;
  isApproved: boolean;
  categoryRatings: NormalizedCategory[];
  listing: Pick<Listing, 'id' | 'name'>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface ApprovalUpdateBody {
  reviewId: number;
  isApproved: boolean;
}

export interface ReviewQueryParams {
  listingId?: string;
  minRating?: number;
  maxRating?: number;
  category?: string;
  channel?: string;
  isApproved?: boolean;
  sortBy?: 'overallRating' | 'submittedAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface RawHostawayCategory {
  category: string;
  rating: number | null;
}

export interface RawHostawayReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host' | string;
  status: 'published' | 'pending' | string;
  rating: number | null; 
  publicReview: string | null;
  reviewCategory: RawHostawayCategory[];
  submittedAt: string; 
  guestName: string;
  listingName: string;
}


export interface NormalizedCategory {
    category: string;
    rating: number;
}

export interface NormalizedReview {
  id: number; 
  listingName: string;
  
  channel: 'Hostaway' | 'Google' | string;
  reviewType: string;
  overallRating: number; 
  text: string;
  guestName: string;
  submittedAt: Date;
  
  categoryRatings: NormalizedCategory[];
}
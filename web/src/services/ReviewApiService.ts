/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import type { ApiResponse, ApprovalUpdateBody, NormalizedReview } from '../types/review';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ReviewApiService = {
  /**
   * Fetches all normalized reviews.
   * NOTE: In a production system, this would accept filter/pagination params.
   */
  getAllReviews: async (): Promise<ApiResponse<NormalizedReview[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<NormalizedReview[]>>('/api/reviews');
      return response.data;
    } catch (error) {
      console.error('API Error: Failed to fetch reviews.', error);
      throw new Error('Failed to retrieve review data from the server.');
    }
  },

  /**
   * Fetches only approved reviews (for the public display page).
   */
  getApprovedReviews: async (listingId: string): Promise<NormalizedReview[]> => {
    try {
   
      const response = await apiClient.get<ApiResponse<NormalizedReview[]>>('/api/reviews');
      
      const approved = response.data.data.filter(
        r => r.isApproved && r.listing.id === listingId
      );

      return approved;

    } catch (error) {
      console.error('API Error: Failed to fetch approved reviews.', error);
      throw new Error('Failed to retrieve approved review data.');
    }
  },

  /**
   * Updates the manager's approval status.
   */
  updateApprovalStatus: async (body: ApprovalUpdateBody): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.post<ApiResponse<any>>('/api/reviews/approval', body);
      return response.data;
    } catch (error) {
      console.error('API Error: Failed to update approval status.', error);
      throw new Error('Failed to update review approval status.');
    }
  },
};
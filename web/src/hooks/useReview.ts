import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewApiService } from '../services/ReviewApiService';
import type { ApprovalUpdateBody, NormalizedReview } from '../types/review';
import { useToast } from '@chakra-ui/toast';

const REVIEWS_QUERY_KEY = 'normalizedReviews';

export function useReviews() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const reviewsQuery = useQuery<NormalizedReview[]>({
    queryKey: [REVIEWS_QUERY_KEY],
    queryFn: async () => {
      const response = await ReviewApiService.getAllReviews();
      return response.data;
    },
    select: (data) => {
     
      return data;
    },
  });

  const updateApprovalMutation = useMutation({
    mutationFn: (body: ApprovalUpdateBody) => ReviewApiService.updateApprovalStatus(body),
    
    onMutate: async (newApprovalStatus) => {
      await queryClient.cancelQueries({ queryKey: [REVIEWS_QUERY_KEY] });
      
      const previousReviews = queryClient.getQueryData<NormalizedReview[]>([REVIEWS_QUERY_KEY]);
      
      if (previousReviews) {
        queryClient.setQueryData<NormalizedReview[]>(
          [REVIEWS_QUERY_KEY], 
          (old) => 
            old ? old.map(review => 
              review.id === newApprovalStatus.reviewId 
                ? { ...review, isApproved: newApprovalStatus.isApproved } 
                : review
            ) : []
        );
      }
      
      return { previousReviews };
    },
    
    onError: (err, _newApprovalStatus, context) => {
      if (context?.previousReviews) {
        queryClient.setQueryData([REVIEWS_QUERY_KEY], context.previousReviews);
      }
      toast({
        title: 'Update failed.',
        description: `Could not update review status: ${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY_KEY] });
    },
    
    onSuccess: () => {
      toast({
        title: 'Review Updated.',
        description: 'Approval status successfully changed.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  });

  return {
    reviews: reviewsQuery.data,
    isLoading: reviewsQuery.isLoading,
    error: reviewsQuery.error,
    updateApprovalStatus: updateApprovalMutation.mutate,
  };
}
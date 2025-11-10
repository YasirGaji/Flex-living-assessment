import { Box, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import type { NormalizedReview } from '../../types/review';

interface RatingChartProps {
  reviews: NormalizedReview[];
}

function calculateDistribution(
  reviews: NormalizedReview[]
): Record<number, number> {
  const distribution: Record<number, number> = {};
  for (let i = 1; i <= 10; i++) {
    distribution[i] = 0;
  }
  reviews.forEach((review) => {
    const rating = Math.round(review.overallRating);
    if (rating >= 1 && rating <= 10) {
      distribution[rating]++;
    }
  });
  return distribution;
}

const RatingChart = ({ reviews }: RatingChartProps) => {
  const distribution = calculateDistribution(reviews);
  const total = reviews.length;

  if (total === 0) {
    return (
      <Box p={6} bg="white" boxShadow="md" rounded="lg">
        <Text>No data to visualize.</Text>
      </Box>
    );
  }

  return (
    <Box p={6} bg="white" boxShadow="md" rounded="lg">
      <Heading size="md" mb={4} color="gray.700">
        Rating Distribution (1-10)
      </Heading>
      <VStack gap={2} align="stretch">
        {Array.from({ length: 10 }, (_, i) => 10 - i).map((rating) => {
          // Iterate 10 down to 1
          const count = distribution[rating] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return (
            <HStack key={rating} gap={4}>
              <Text fontWeight="bold" w="20px">
                {rating}
              </Text>
              {/* <Progress 
                value={percentage} 
                size="sm" 
                flex="1" 
                colorScheme={rating >= 8 ? 'teal' : rating >= 5 ? 'orange' : 'red'}
              /> */}

              <Box flex="1" aria-hidden>
                <Box h="8px" bg="gray.100" rounded="md" overflow="hidden">
                  <Box
                    as="span"
                    display="block"
                    h="100%"
                    w={`${percentage}%`}
                    bg={
                      rating >= 8
                        ? 'teal.400'
                        : rating >= 5
                        ? 'orange.400'
                        : 'red.400'
                    }
                    transition="width 150ms ease"
                  />
                </Box>
              </Box>
              <Text w="40px" textAlign="right" fontSize="sm">
                {count} ({percentage.toFixed(0)}%)
              </Text>
            </HStack>
          );
        })}
      </VStack>
      <Text fontSize="sm" color="gray.500" mt={4}>
        Visualization helps spot trend changes over time.
      </Text>
    </Box>
  );
};

export default RatingChart;

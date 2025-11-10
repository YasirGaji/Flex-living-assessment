import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Alert,
  Flex,
  Container,
  VStack,
} from '@chakra-ui/react';
import ApprovedReviewCard from '../DisplayPage/ApprovedReviewCard'; 
import { MOCK_FEATURED_REVIEWS } from '../../data/mock-featured-reviews';

const FLEX_PRIMARY = '#284E4C';

/**
 * MOCK HOOK: Simulates fetching and filtering the top approved reviews.
 * In production, this would use @tanstack/react-query to call the API.
 */
const useFeaturedReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Returns mock data, simulating successful fetching of approved, top reviews.
  return {
    data: MOCK_FEATURED_REVIEWS,
    isLoading,
    error: null,
  };
};

const FeaturedReviewSection = () => {
  const { data: reviews, isLoading, error } = useFeaturedReviews();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py={16}>
        <Spinner color={FLEX_PRIMARY} size="md" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl">
        <Alert.Root status="error">
          <Alert.Indicator /> Failed to load featured reviews.
        </Alert.Root>
      </Container>
    );
  }

  return (
    <Box
      py={16}
      borderTop="1px solid"
      borderColor="gray.100"
    >
      <Container maxW="100%">
        <VStack gap={6} align="center" textAlign="center" mb={10}>
          <Heading as="h2" size="xl" color={FLEX_PRIMARY}>
            What Our Clients Think
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="700px">
            Hear from the clients we work with. Discover why our flexible
            corporate rental solutions help them simplify relocations.
          </Text>
        </VStack>

        {reviews && reviews.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: reviews.length > 1 ? reviews.length : 1 }}
            gap={8}
          >
            {reviews.map((review) => (
              <ApprovedReviewCard key={review.externalId} review={review} />
            ))}
          </SimpleGrid>
        ) : (
          <Flex justify="center" p={8}>
            <Text color="gray.500" fontSize="lg">
              No reviews are currently selected by the manager to be featured.
            </Text>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedReviewSection;

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ReviewApiService } from '../services/ReviewApiService';
import ApprovedReviewCard from '../components/DisplayPage/ApprovedReviewCard.tsx';
import { IoArrowBack } from 'react-icons/io5';

const useApprovedReviews = (listingId: string) => {
  return useQuery({
    queryKey: ['approvedReviews', listingId],
    queryFn: () => ReviewApiService.getApprovedReviews(listingId),
    enabled: !!listingId,
  });
};

const PropertyDetail = () => {
  const { listingId } = useParams<{ listingId: string }>();

  const mockListingName = '2B N1 A - 29 Shoreditch Heights';

  const id = listingId || 'mock-id';

  const { data: reviews, isLoading, error } = useApprovedReviews(id);

  return (
    <Box bg="white" minH="100vh">
      <Box bg="gray.900" color="white" p={4} shadow="md">
        <Container maxW="container.xl">
          <RouterLink to="/dashboard">
            <Text color="flexPrimary.500" display="flex" alignItems="center">
              <Icon as={IoArrowBack} boxSize={5} />
              Back to Dashboard
            </Text>
          </RouterLink>
        </Container>
      </Box>

      <Container maxW="container.xl" py={10}>
        <VStack align="start" gap={4} mb={8}>
          <Heading as="h1" size="2xl" color="gray.800">
            {mockListingName}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Luxury 2 Bedroom Apartment in the heart of London.
          </Text>
          <Box
            w="full"
            h="200px"
            bg="gray.100"
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Box>
        </VStack>

        <hr />

        <Box mt={10} id="reviews-section">
          <Heading as="h2" size="xl" mb={6} color="gray.800">
            What Our Guests Say ⭐️
          </Heading>

          {isLoading && <Spinner color="flexPrimary.500" size="md" />}

          {error && (
            <Alert.Root status="error">
              <Alert.Indicator /> Failed to load reviews: {error.message}
            </Alert.Root>
          )}

          {reviews && reviews.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
              {reviews.map((review) => (
                <ApprovedReviewCard key={review.externalId} review={review} />
              ))}
            </SimpleGrid>
          ) : (
            !isLoading && (
              <Text color="gray.500">
                This property currently has no reviews approved for public
                display.
              </Text>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PropertyDetail;

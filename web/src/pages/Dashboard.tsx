import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Spinner,
  Alert,
  SimpleGrid,
} from '@chakra-ui/react';
import Scorecard from '../components/Dashboard/Scorecard';
import ReviewTable from '../components/Dashboard/ReviewTable';
import RatingChart from '../components/Dashboard/RatingChart';
import { useReviews } from '../hooks/useReview';

const Dashboard = () => {
  const { reviews, isLoading, error } = useReviews();

  if (isLoading) {
    return (
      <Container maxW="container.xl" pt={10} centerContent>
        <VStack gap={4}>
          <Spinner size="xl" color="flexPrimary.500" />
          <Text>Loading normalized review data...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" pt={10}>
        <Alert.Root status="error">
          <Alert.Indicator />
          Failed to load dashboard data. Check API server
          (http://localhost:3001) and console logs.
          <Text fontSize="sm" ml={2} color="gray.700">
            Error: {error.message}
          </Text>
        </Alert.Root>
      </Container>
    );
  }

  return (
    <Box  bg="#FFF9E9" minH="100vh">
      <Container  maxW="container.xl" p={0}>
        <Heading as="h1" size="xl" mb={2} color="gray.800">
          Reviews Dashboard 📈
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={8}>
          Analyze property performance across {reviews?.length || 0} reviews.
        </Text>

        <hr />

        <Scorecard reviews={reviews || []} />

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} my={8}>
          <Box gridColumn={{ base: 'span 1', lg: 'span 2' }}>
            <ReviewTable reviews={reviews || []} />
          </Box>

          <VStack gap={8} align="stretch">
            <RatingChart reviews={reviews || []} />

            <Box p={4} bg="white" boxShadow="md" rounded="lg">
              <Heading size="md" mb={2}>
                Quick Filters
              </Heading>
              <Text>
                Filters (Rating, Category, Date) will be implemented here.
              </Text>
            </Box>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Dashboard;

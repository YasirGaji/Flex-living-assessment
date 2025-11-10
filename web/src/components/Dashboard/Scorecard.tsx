import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatHelpText,
  Flex,
  VStack,
} from '@chakra-ui/react';
import type { Listing, NormalizedReview } from '../../types/review';

interface ScorecardProps {
  reviews: NormalizedReview[];
}

function calculateAggregates(reviews: NormalizedReview[]): Listing[] {
  if (reviews.length === 0) return [];

  const listingMap = new Map<
    string,
    { totalRating: number; count: number; approvedCount: number; name: string }
  >();

  reviews.forEach((review) => {
    const key = review.listing.id;
    if (!listingMap.has(key)) {
      listingMap.set(key, {
        totalRating: 0,
        count: 0,
        approvedCount: 0,
        name: review.listing.name,
      });
    }
    const data = listingMap.get(key)!;

    data.totalRating += review.overallRating;
    data.count += 1;
    if (review.isApproved) {
      data.approvedCount += 1;
    }
  });

  return Array.from(listingMap.entries()).map(([id, data]) => ({
    id,
    name: data.name,
    averageRating: parseFloat((data.totalRating / data.count).toFixed(2)),
    totalReviews: data.count,
    approvalRate: parseFloat(
      ((data.approvedCount / data.count) * 100).toFixed(1)
    ),
  }));
}

const Scorecard = ({ reviews }: ScorecardProps) => {
  const listingPerformance = calculateAggregates(reviews);

  if (listingPerformance.length === 0) {
    return <Text color="gray.500">No review data available for scoring.</Text>;
  }

  const overallReviews = reviews.length;
  const overallAvgRating = parseFloat(
    (
      reviews.reduce((sum, r) => sum + r.overallRating, 0) / overallReviews
    ).toFixed(2)
  );
  const overallApprovedRate = parseFloat(
    (
      (reviews.filter((r) => r.isApproved).length / overallReviews) *
      100
    ).toFixed(1)
  );

  const lowestListing = [...listingPerformance]
    .filter((l) => l.averageRating != null)
    .sort((a, b) => (a.averageRating ?? 0) - (b.averageRating ?? 0))[0];

  return (
    <Box mb={8}>
      <Heading size="md" mt={8} mb={4} color="gray.700">
        Overall Performance Snapshot
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <Stat.Root
          p={5}
          shadow="md"
          border="1px"
          borderColor="gray.100"
          rounded="lg"
          bg="white"
        >
          <StatLabel>Average Rating (All Properties)</StatLabel>
          <Stat.ValueText fontSize="3xl" color="flexPrimary.700">
            {overallAvgRating} / 10
          </Stat.ValueText>
          <StatHelpText>{overallReviews} Total Reviews</StatHelpText>
        </Stat.Root>

        <Stat.Root
          p={5}
          shadow="md"
          border="1px"
          borderColor="gray.100"
          rounded="lg"
          bg="white"
        >
          <StatLabel>Public Approval Rate</StatLabel>
          <Stat.ValueText
            fontSize="3xl"
            color={overallApprovedRate > 75 ? 'green.500' : 'orange.500'}
          >
            {overallApprovedRate}%
          </Stat.ValueText>
          <StatHelpText>Reviews currently selected for display.</StatHelpText>
        </Stat.Root>

        {listingPerformance.length > 1 && (
          <Stat.Root
            p={5}
            shadow="md"
            border="1px"
            borderColor="gray.100"
            rounded="lg"
            bg="white"
          >
            <StatLabel>Lowest Rated Property</StatLabel>
            <Stat.ValueText fontSize="xl" color="red.500">
              {lowestListing?.name ?? 'N/A'}
            </Stat.ValueText>
            <StatHelpText>
              Avg: {listingPerformance[0].averageRating}
            </StatHelpText>
          </Stat.Root>
        )}
      </SimpleGrid>

      <Heading size="sm" mt={8} mb={4} color="gray.700">
        Per-Property Breakdown
      </Heading>
      <SimpleGrid
        columns={{
          base: 1,
          md: listingPerformance.length > 2 ? 3 : listingPerformance.length,
        }}
        gap={4}
      >
        {listingPerformance.map((listing) => (
          <Flex
            key={listing.id}
            p={4}
            borderWidth="1px"
            rounded="lg"
            align="center"
            justify="space-between"
            bg="white"
          >
            <VStack align="start" gap={0}>
              <Text fontWeight="bold" fontSize="md">
                {listing.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {listing.totalReviews} reviews
              </Text>
            </VStack>
            <Stat.Root>
              <Stat.ValueText fontSize="xl" color="flexPrimary.500">
                {listing.averageRating}
              </Stat.ValueText>
              <StatHelpText>Approved: {listing.approvalRate}%</StatHelpText>
            </Stat.Root>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Scorecard;

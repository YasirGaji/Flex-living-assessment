import { Box, Text, Flex, Badge, VStack, Icon } from '@chakra-ui/react';
import { IoStar } from 'react-icons/io5';
import { format } from 'date-fns';
import type { NormalizedReview } from '../../types/review';

interface ApprovedReviewCardProps {
  review: NormalizedReview;
}

const ApprovedReviewCard = ({ review }: ApprovedReviewCardProps) => {
  return (
    <Box
      p={6}
      borderWidth="1px"
      rounded="xl"
      bg="gray.50"
      borderColor="gray.200"
      _hover={{ shadow: 'lg' }}
      transition="all 0.2s"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Flex alignItems="center" gap={2}>
          <Icon as={IoStar} color="flexPrimary.500" />
          <Text fontWeight="bold" fontSize="lg">
            {review.overallRating}/10
          </Text>
        </Flex>
        <Badge
          colorScheme="green"
          variant="solid"
          textTransform="capitalize"
          fontSize="xs"
        >
          {review.channel}
        </Badge>
      </Flex>

      <VStack align="start" gap={3}>
        <Text fontSize="md" fontStyle="italic" color="gray.800">
          "{review.text}"
        </Text>

        <Flex
          w="full"
          justifyContent="space-between"
          pt={2}
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <Text fontWeight="medium" color="gray.700">
            {review.guestName}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {format(new Date(review.submittedAt), 'MMMM yyyy')}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ApprovedReviewCard;

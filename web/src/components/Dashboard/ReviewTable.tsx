import { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Table,
  InputGroup,
  Input,
  Switch,
  Badge,
  Flex,
  Text,
  Tooltip,
  VStack,
  Select,
  Icon,
  createListCollection,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import type { NormalizedReview } from '../../types/review';
import { useReviews } from '../../hooks/useReview';
import { IoSearchCircleOutline, IoStar } from 'react-icons/io5';

interface ReviewTableProps {
  reviews: NormalizedReview[];
}

const ReviewTable = ({ reviews }: ReviewTableProps) => {
  const { updateApprovalStatus } = useReviews();
  const [searchTerm, setSearchTerm] = useState('');
  const [listingFilter, setListingFilter] = useState('');

  const uniqueListings = useMemo(() => {
    const names = Array.from(new Set(reviews.map((r) => r.listing.name)));
    return names.sort();
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    let filtered = reviews;
    if (listingFilter) {
      filtered = filtered.filter((r) => r.listing.name === listingFilter);
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.guestName?.toLowerCase().includes(lowerSearch) ||
          r.text.toLowerCase().includes(lowerSearch)
      );
    }
    return filtered.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  }, [reviews, listingFilter, searchTerm]);

  const handleApprovalChange = (reviewId: number, isApproved: boolean) => {
    updateApprovalStatus({ reviewId, isApproved });
  };

  const listingsCollection = createListCollection({
    items: [
      { label: 'All Properties', value: '' },
      ...uniqueListings.map((name) => ({ label: name, value: name })),
    ],
  });

  return (
    <Box p={6} bg="white" boxShadow="xl" rounded="lg">
      <Heading size="lg" mb={6} color="gray.700">
        Review Curation & Detail
      </Heading>

      <Flex mb={4} gap={4}>
        <InputGroup
          zIndex={{ _focusWithin: '1' }}
          endElement={<Icon as={IoSearchCircleOutline} />}
        >
          <Input
            placeholder="Search guest or review text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {/* Select Component */}

        <Select.Root
          collection={listingsCollection}
          maxW="300px"
          value={listingFilter ? [listingFilter] : ['']}
          onValueChange={(e) => setListingFilter(e.value[0])}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Filter by Property" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {listingsCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Flex>

      <Text mb={4} color="gray.600">
        {filteredReviews.length} reviews displayed.
      </Text>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg="gray.50">
            <Table.ColumnHeader>Approved</Table.ColumnHeader>
            <Table.ColumnHeader>Rating</Table.ColumnHeader>
            <Table.ColumnHeader>Listing</Table.ColumnHeader>
            <Table.ColumnHeader>Guest/Date</Table.ColumnHeader>
            <Table.ColumnHeader>Key Issues</Table.ColumnHeader>
            <Table.ColumnHeader>Review Text</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredReviews.map((review) => (
            <Table.Row key={review.id} _hover={{ bg: 'gray.50' }}>
              <Table.Cell>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Switch.Root
                      colorScheme="teal"
                      checked={review.isApproved}
                      onCheckedChange={(details: { checked: boolean }) =>
                        handleApprovalChange(review.id, details.checked)
                      }
                    >
                      <Switch.Control />
                      <Switch.HiddenInput />
                    </Switch.Root>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Tooltip.Arrow />
                    {review.isApproved
                      ? 'Approved for Public Site'
                      : 'Hidden from Public Site'}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Table.Cell>

              <Table.Cell>
                <Flex align="center" gap={1}>
                  <Icon
                    as={IoStar}
                    color={
                      review.overallRating >= 8
                        ? 'green.400'
                        : review.overallRating >= 5
                        ? 'orange.400'
                        : 'red.400'
                    }
                    mr={1}
                  />
                  <Text fontWeight="bold">{review.overallRating}</Text>
                </Flex>
              </Table.Cell>

              <Table.Cell>
                <Text
                  fontSize="sm"
                  maxW="200px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {review.listing.name}
                </Text>
              </Table.Cell>

              <Table.Cell>
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium">{review.guestName}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {format(new Date(review.submittedAt), 'MMM d, yyyy')}
                  </Text>
                </VStack>
              </Table.Cell>

              <Table.Cell>
                {review.categoryRatings
                  .filter((cat) => cat.rating <= 7)
                  .slice(0, 2)
                  .map((cat) => (
                    <Badge
                      key={cat.category}
                      colorScheme="red"
                      mr={1}
                      mt={1}
                      textTransform="capitalize"
                    >
                      {cat.category.replace('_', ' ')} ({cat.rating})
                    </Badge>
                  ))}
                {review.categoryRatings.length === 0 && (
                  <Text color="gray.500">N/A</Text>
                )}
              </Table.Cell>

              <Table.Cell>
                <Text
                  maxW="300px"
                  fontSize="sm"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {review.text}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ReviewTable;

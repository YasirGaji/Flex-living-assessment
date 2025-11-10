import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Button,
  Icon,
  Link,
} from '@chakra-ui/react';
import { IoArrowForward } from 'react-icons/io5';
import FeaturedReviewSection from '../components/Home/FeaturedReviewSection';

const FLEX_PRIMARY = '#284E4C';
const FLEX_PRIMARY_DARK = '#1A3534';
const FLEX_BG_SUBTLE = '#FFFDF6';

const Home = () => {
  const mockListingId = '11f0ff40-7d01-423d-9ce4-25fa7dee7bda';

  return (
    <Container maxW="container.xl" pt={20} pb={10}>
      <Box textAlign="center" pb={10}>
        <Heading as="h1" size="4xl" mb={4} color="gray.700">
          Corporate Housing
        </Heading>
        <Text fontSize="lg" color="gray.600">
          The Flex partners with over 150 companies worldwide to deliver
          corporate housing solutions...
        </Text>
      </Box>

      <FeaturedReviewSection />

      <VStack
        gap={6}
        align="center"
        textAlign="center"
        p={10}
        bg={FLEX_BG_SUBTLE}
        rounded="xl"
        shadow="lg"
      >
        <Heading as="h1" size="3xl" color={FLEX_PRIMARY}>
          Book Beautiful Stays
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="600px">
          Join the movement redefining global living. Experience effortless,
          borderless, and intelligent renting.
        </Text>

        <Link href={`/property/${mockListingId}`}>
          <Button
            size="lg"
            bg={FLEX_PRIMARY}
            color="white"
            _hover={{ bg: FLEX_PRIMARY_DARK }}
          >
            View A Sample Property
            <Icon as={IoArrowForward} ml={2} />
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default Home;

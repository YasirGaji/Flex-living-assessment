import {
  Box,
  Flex,
  Text,
  VStack,
  Grid,
  Heading,
  Input,
  Button,
  SimpleGrid,
  HStack,
  Icon,
  Container,
} from '@chakra-ui/react';
import {
  IoMail,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
} from 'react-icons/io5';

const FLEX_PRIMARY_DARK = '#1A3534';
const FLEX_LIGHT_TEXT = '#E8EDEA';

const Footer = () => {
  return (
    <Box bg={FLEX_PRIMARY_DARK} color={FLEX_LIGHT_TEXT} py={16} mt={16}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 3fr' }}
          gap={16}
          maxW="container.xl"
          mx="auto"
          px={8}
        >
          {/* Left Section: Join The Flex */}
          <VStack align="start" gap={4}>
            <Heading as="h4" size="md" color="white" mb={2}>
              Join The Flex
            </Heading>
            <Text fontSize="sm" color={FLEX_LIGHT_TEXT}>
              Sign up now and stay up to date on our latest news and exclusive
              deals including 5% off your first stay!
            </Text>

            <VStack as="form" width="full" gap={3} align="start" mt={4}>
              <SimpleGrid columns={2} gap={3} w="full">
                <Input
                  placeholder="First name"
                  bg="transparent"
                  color="white"
                  border="1px solid"
                  borderColor="whiteAlpha.400"
                  size="md"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.100' }}
                />
                <Input
                  placeholder="Last name"
                  bg="transparent"
                  color="white"
                  border="1px solid"
                  borderColor="whiteAlpha.400"
                  size="md"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  _focus={{ borderColor: 'white', bg: 'whiteAlpha.100' }}
                />
              </SimpleGrid>
              <Input
                placeholder="Email address"
                bg="transparent"
                color="white"
                border="1px solid"
                borderColor="whiteAlpha.400"
                w="full"
                size="md"
                _placeholder={{ color: 'whiteAlpha.600' }}
                _focus={{ borderColor: 'white', bg: 'whiteAlpha.100' }}
              />

              <Button
                w="full"
                bg="white"
                color={FLEX_PRIMARY_DARK}
                mt={2}
                size="md"
                fontWeight="medium"
                _hover={{ bg: 'gray.100' }}
              >
                Subscribe
              </Button>
            </VStack>
          </VStack>

          {/* Right Section: Links Grid */}
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={8}
            color={FLEX_LIGHT_TEXT}
          >
            {/* The Flex */}
            <VStack align="start" gap={3}>
              <Heading as="h5" size="sm" color="white" mb={1}>
                The Flex
              </Heading>
              <Text fontSize="sm" lineHeight="tall">
                Professional property management services for landlords.
              </Text>
              <Text fontSize="sm" lineHeight="tall">
                Flexible corporate lets for businesses and quality
                accommodations for short-term and long-term guests.
              </Text>
              <HStack gap={3} pt={2}>
                <Icon
                  as={IoLogoFacebook}
                  boxSize={5}
                  cursor="pointer"
                  _hover={{ color: 'white' }}
                />
                <Icon
                  as={IoLogoInstagram}
                  boxSize={5}
                  cursor="pointer"
                  _hover={{ color: 'white' }}
                />
                <Icon
                  as={IoLogoLinkedin}
                  boxSize={5}
                  cursor="pointer"
                  _hover={{ color: 'white' }}
                />
              </HStack>
            </VStack>

            {/* Quick Links */}
            <VStack align="start" gap={2}>
              <Heading as="h5" size="sm" color="white" mb={1}>
                Quick Links
              </Heading>
              {['Blog', 'Careers', 'Terms & Conditions', 'Privacy Policy'].map(
                (link) => (
                  <Text
                    key={link}
                    fontSize="sm"
                    cursor="pointer"
                    _hover={{ color: 'white', textDecoration: 'underline' }}
                  >
                    {link}
                  </Text>
                )
              )}
            </VStack>

            {/* Locations */}
            <VStack align="start" gap={2}>
              <Heading as="h5" size="sm" color="white" mb={1}>
                Locations
              </Heading>
              {['LONDON', 'PARIS', 'ALGIERS'].map((location) => (
                <Text key={location} fontSize="sm">
                  {location}
                </Text>
              ))}
            </VStack>

            {/* Contact Us */}
            <VStack align="start" gap={3}>
              <Heading as="h5" size="sm" color="white" mb={1}>
                Contact Us
              </Heading>
              <VStack align="start" gap={2} fontSize="sm">
                <Text fontWeight="semibold" color="white">
                  Support Numbers
                </Text>
                <HStack align="start" gap={2}>
                  <VStack align="start" gap={0} fontSize="sm">
                    <Text color="white">United Kingdom</Text>
                    <Text>+44 77 2374 5646</Text>
                  </VStack>
                </HStack>
                <HStack align="start" gap={2}>
                  <VStack align="start" gap={0} fontSize="sm">
                    <Text color="white">France</Text>
                    <Text>+33 6 44 64 57 17</Text>
                  </VStack>
                </HStack>
                <HStack align="start" gap={2}>
                  <VStack align="start" gap={0} fontSize="sm">
                    <Text color="white">Algeria</Text>
                    <Text>+33 7 57 58 22 41</Text>
                  </VStack>
                </HStack>
                <HStack gap={2} pt={1}>
                  <Icon as={IoMail} boxSize={4} />
                  <Text fontSize="sm">info@theflex.global</Text>
                </HStack>
              </VStack>
            </VStack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Flex
          justify="center"
          pt={8}
          mt={8}
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          maxW="container.xl"
          mx="auto"
          px={8}
        >
          <Text fontSize="xs" color={FLEX_LIGHT_TEXT}>
            © {new Date().getFullYear()} The Flex. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;

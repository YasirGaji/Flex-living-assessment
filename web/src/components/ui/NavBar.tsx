import {
  Box,
  Flex,
  Button,
  Container,
  Spacer,
  Link,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../assets/logo.webp';

const FLEX_PRIMARY = '#284E4C';

const NavBar = () => {
  return (
    <Box
      bg={FLEX_PRIMARY}
      color="white"
      py={4}
      shadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="container.xl">
        <Flex align="center">
          <RouterLink to="/">
            <Flex align="center">
              <Image
                src={Logo}
                alt="Flex Living"
                objectFit="contain"
                w="95px"
              />
            </Flex>
          </RouterLink>

          <Spacer />

          <Button
            variant="solid"
            size="sm"
            bg="flexPrimary.700"
            color="white"
            _hover={{ bg: 'flexPrimary.500' }}
          >
            <Link href="/dashboard">Manager Dashboard</Link>
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;

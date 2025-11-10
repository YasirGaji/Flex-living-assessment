import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const GlobalAppLayout = () => {
  return (
    <Box bg="#FFF9E9" minH="100vh">
      <NavBar />
      <Box p={8} pt={4}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default GlobalAppLayout;

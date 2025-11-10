import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PropertyDetail from './pages/PropertyDetail'; 
import { Box } from '@chakra-ui/react';
import GlobalAppLayout from './components/ui/GlobalAppLayout';
import Home from './pages/Home';

const App = () => {
  return (
    <Box minH="100vh" bg="flexBg.main"> 
      <Routes>
       <Route element={<GlobalAppLayout />}>
          <Route path="/" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/property/:listingId" element={<PropertyDetail />} />
        </Route>

        <Route path="*" element={<h1>404 | Not Found</h1>} />
      </Routes>
    </Box>
  );
};

export default App;
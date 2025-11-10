import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        flexPrimary: {
          value: {
            50: { value: '#E8EDEA' },
            500: { value: '#284E4C' },
            700: { value: '#1A3534' },
          },
        },
        flexBg: {
          value: {
            subtle: { value: '#FFFDF6' },
            main: { value: '#FFF9E9' },
          },
        },
        gray: {
          value: {
            50: { value: '#f7fafc' },
            100: { value: '#edf2f7' },
            800: { value: '#1A202C' },
            900: { value: '#171923' },
          },
        },
      },
    },
  },

  globalCss: {
    'html, body': {
      bg: 'flexBg.main',
      color: 'gray.900',
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;

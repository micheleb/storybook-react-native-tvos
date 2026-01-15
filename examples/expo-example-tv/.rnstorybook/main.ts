import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: [
    // Reference stories from expo-example (shared)
    '../../expo-example/components/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    // Temporarily disabled - controls addon has native module compatibility issues on TV
    // '@storybook/addon-ondevice-controls',
  ],
  reactNative: {
    playFn: false,
  },
  framework: '@storybook/react-native',
};

export default main;

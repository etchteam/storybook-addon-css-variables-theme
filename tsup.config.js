import { globalPackages as globalManagerPackages } from '@storybook/manager/globals';
import { globalPackages as globalPreviewPackages } from '@storybook/preview/globals';
import { defineConfig } from 'tsup';

// The current browsers supported by Storybook v7
const BROWSER_TARGET = ['chrome100', 'safari15', 'firefox91'];
const NODE_TARGET = ['node18'];
const globalManagerPackagesExcludingIcons = globalManagerPackages.filter(
  (packageName) => packageName !== '@storybook/icons',
);

export default defineConfig(async (options) => {
  const commonConfig = {
    splitting: false,
    minify: !options.watch,
    treeshake: true,
    sourcemap: true,
    clean: true,
  };

  const configs = [
    {
      ...commonConfig,
      entry: ['src/index.js'],
      dts: { resolve: true },
      format: ['esm', 'cjs'],
      target: [...BROWSER_TARGET, ...NODE_TARGET],
      platform: 'neutral',
      external: [
        ...globalManagerPackagesExcludingIcons,
        ...globalPreviewPackages,
      ],
    },
    {
      ...commonConfig,
      entry: ['src/manager.jsx'],
      format: ['esm'],
      target: BROWSER_TARGET,
      platform: 'browser',
      external: globalManagerPackagesExcludingIcons,
    },
    {
      ...commonConfig,
      entry: ['src/preview.js'],
      dts: { resolve: true },
      format: ['esm', 'cjs'],
      target: BROWSER_TARGET,
      platform: 'browser',
      external: globalPreviewPackages,
    },
  ];

  return configs;
});

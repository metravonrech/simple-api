import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;
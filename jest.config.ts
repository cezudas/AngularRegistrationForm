const config = {
  preset: 'jest-preset-angular/presets/defaults',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/src/test.base.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
};

export default config;

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          components: './src/components',
          assets: './src/assets',
          hooks: './src/hooks',
          model: './src/model',
          middleware: './src/middleware',
          navigation: './src/navigation',
          network: './src/network',
          screens: './src/screens',
          utils: './src/utils',
          images: './src/assets/images',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};

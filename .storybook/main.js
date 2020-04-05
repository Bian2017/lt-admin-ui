module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/styles/index.scss'],
  addons: ['@storybook/preset-create-react-app', '@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')]
          }
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            // 将枚举或者联合类型转换成字符串形式，避免字符串字面量显示别名。
            shouldExtractLiteralValuesFromEnum: true,
            // 避免显示原生内置属性
            propFilter: prop => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules');
              }

              return true;
            }
          }
        }
      ]
    });

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};

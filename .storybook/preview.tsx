/**
 * 全局配置装饰器
 */
import React from 'react';
import { addDecorator, addParameters, configure, storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// 通过创建library来引用Icons
library.add(fas); // fas 所有图表的集合

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
};

// 创建一个样式包裹的装饰器
const WrapperDecorator = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
);

// 通过addDecorator添加插件
addDecorator(WrapperDecorator);
addDecorator(withInfo);

addParameters({
  info: {
    inline: true, // 直接展示所有信息
    header: false,
  },
});

// 将welcome文档说明置于顶部
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));

  return allExports;
};

// automatically import all files ending in *.stories.tsx
configure(loaderFn, module);

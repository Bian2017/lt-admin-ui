/**
 * 全局配置装饰器
 */
import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
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
    header: false
  }
});

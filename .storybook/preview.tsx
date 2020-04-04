/**
 * 全局配置装饰器
 */
import React from 'react';
import { addDecorator } from '@storybook/react';

const styles: React.CSSProperties = {
  textAlign: 'center'
};

// 创建一个样式居中的装饰器
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;

// 通过addDecorator添加插件
addDecorator(CenterDecorator);

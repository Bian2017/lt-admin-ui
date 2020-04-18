import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到lant组件库</h1>
        <p>该组件库是自己打造的一个私人组件库</p>
        <h3>安装试试</h3>
        <code>npm install lt-admin-ui --save</code>
      </>
    );
  },
  // 将 withInfo 插件设置成disable
  { info: { disable: true } }
);

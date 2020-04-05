import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'; // 记录组件的行为
import { withInfo } from '@storybook/addon-info';

import Button from './button';

const defaultButton = () => <Button onClick={action('clicked')}>default button</Button>;

const buttonWithSize = () => (
  <>
    <Button size="lg">Large Button</Button>
    <Button size="sm">Small Button</Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="default">default button</Button>
    <Button btnType="danger">primary button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="link" href="https://www.baidu.com">
      link button
    </Button>
  </>
);

storiesOf('Button Component', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: `
        按钮用于开始一个即时操作
        ## 代码演示
        ~~~js
        import Button from 'lt-admin-ui'
        ~~~
      `,
      inline: true // 直接展示所有信息
    }
  })
  .add('默认 Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize, { info: { inline: false } })
  .add('不同类型的 Button', buttonWithType);

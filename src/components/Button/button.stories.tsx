import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'; // 记录组件的行为

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
  .add('Button', defaultButton) // 如果要自动显示Button组件的注释，需将Story的名称改成和组件名称一样
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType);

import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

// 继承 FontAwesomeIconProps所有属性
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = props => {
  const { className, theme, ...restProps } = props;
  const cls = classNames('lt-icon', className, {
    [`icon-${theme}`]: theme
  });

  return <FontAwesomeIcon className={cls} {...restProps} />;
};

export default Icon;

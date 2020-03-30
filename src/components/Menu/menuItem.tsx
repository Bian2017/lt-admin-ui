import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: number; // 确定现在是哪一项
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props;

  const context = useContext(MenuContext);

  const cls = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'number') {
      context.onSelect(index);
    }
  };

  return (
    <li className={cls} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

// 添加 displayName 静态属性，用于判断组件类型。
// displayName 字符串多用于调试消息。
MenuItem.displayName = 'MenuItem';

export default MenuItem;

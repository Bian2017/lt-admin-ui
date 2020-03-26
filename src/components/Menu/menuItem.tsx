import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index: number; // 确定现在是哪一项
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props;

  const context = useContext(MenuContext);

  const cls = classNames('menu-item', className, {
    'is-diabled': disabled,
    'is-active': context.index === index
  });

  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };

  return (
    <li className={cls} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;

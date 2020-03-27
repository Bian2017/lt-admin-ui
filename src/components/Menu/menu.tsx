import React, { createContext, useState } from 'react';
import classNames from 'classnames';

// 字符串字面量，代表取值的范围只能是某几个字符串中的一个。比枚举更好用些。
type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

// 通过Context透传属性
export const MenuContext = createContext<IMenuContext>({ index: 0 }); // 初始值

const Menu: React.FC<MenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const cls = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  });

  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // 创建传递给子组件的Context
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  };

  return (
    <ul className={cls} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
};

export default Menu;

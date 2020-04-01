import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

// 字符串字面量，代表取值的范围只能是某几个字符串中的一个。比枚举更好用些。
type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

// 通过Context透传属性
export const MenuContext = createContext<IMenuContext>({ index: '0' }); // 初始值

const Menu: React.FC<MenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const cls = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // 创建传递给子组件的Context
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };

  // 确保Menu的子组件是MenuItem
  const renderChildren = () => {
    // 不能对children直接遍历(children是不透明数据结构，props.children可以是任何类型
    // 需通过React.Children.map来进行遍历，遇到不合规类型会自动跳过，避免出现错误
    return React.Children.map(children, (child, index) => {
      // child没有displayName属性，此时可以通过类型断言。
      // 此处的child需拿到FC的实例，故使用React.FunctionComponentElement，而不是React.FunctionComponent
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;

      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 将index属性添加到childElement实例中，这样就不需为每个子菜单添加index属性
        // cloneElement: 以element元素为样板，克隆并返回新的React元素。返回元素的props是将新的props与原始元素的props浅层合并后的结果
        return React.cloneElement(childElement, {
          index: index.toString() // 将数字转化成字符串
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component.');
      }
    });
  };

  return (
    <ul className={cls} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
};

export default Menu;

import React, { useContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext);
  // 默认会存在undefined，故在此处进行类型断言
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false;

  const [menuOpen, setMenuOpen] = useState(isOpened);
  const cls = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();

    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          }
        }
      : {};

  // 渲染下拉菜单内容
  const renderChildren = () => {
    const subMenuCls = classNames('submenu', {
      'menu-opened': menuOpen
    });

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;

      if (childElement.type.displayName === 'MenuItem') {
        // 将index属性添加到childElement实例中，这样就不需为每个子菜单添加index属性
        // cloneElement: 以element元素为样板，克隆并返回新的React元素。返回元素的props是将新的props与原始元素的props浅层合并后的结果
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component.');
      }
    });

    // 当menuOpen为true时，子节点会被动态添加DOM节点中
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuCls}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={cls} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;

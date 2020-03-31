import React, { useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext);
  const cls = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  });

  // 渲染下拉菜单内容
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;

      if (childElement.type.displayName === 'MenuItem') {
        // 将index属性添加到childElement实例中，这样就不需为每个子菜单添加index属性
        // cloneElement: 以element元素为样板，克隆并返回新的React元素。返回元素的props是将新的props与原始元素的props浅层合并后的结果
        return childElement;
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component.');
      }
    });

    return <ul className="submenu">{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={cls}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;

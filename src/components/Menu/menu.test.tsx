import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />;
  };
});

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children;
    },
  };
});

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>menu3</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

// 创建一小部分CSS样式，避免引入整个style文件
const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  /**
   * 针对多个测试case运行前需获取相同的元素，可以通过beforeEach避免重复设置。
   * 在每个case运行之前，都会运行该函数
   */
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));

    // 注意：wrapper.container是HTMLElement
    wrapper.container.append(createStyleFile()); // 插入css文件

    // 如果要取Menu节点，可以在外层元素加上data-testid
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();

    // 应该有menu test等两个class属性
    expect(menuElement).toHaveClass('menu test');

    // 应该有三个菜单栏节点
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3); // 不分层次

    // 此处 :scope表示menuElement本身，然后选择menuElement元素下的一级li元素
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);

    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('menu3');

    // 触发click事件
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');

    // 希望函数被调用的参数是2
    expect(testProps.onSelect).toHaveBeenCalledWith('2');

    fireEvent.click(disabledElement);
    // disabled元素应当点击了应该没有任何反应
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  it('should render vertical mode when mode is set to vertical', () => {
    /**
     * 调用cleanup避免变量命名存在冲突。在其他测试case中没有出现wrapper重复命名情况，是因为
     * 框架自动调用了cleanup函数。
     *
     * Cleanup is called after each test automatically by default if the testing framework
     * you're using supports the afterEach global (like mocha, Jest, and Jasmine).
     */
    cleanup();

    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');

    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('should show dropdown items when hover on subMenu', async () => {
    // queryByText返回的元素是HTMLElement或者null，getByText返回的元素是HTMLElement
    // 因为元素有可能不存在，故选择queryByText方法
    expect(wrapper.queryByText('drop1')).not.toBeVisible(); // 判断元素是否在视野中，此处需引进css样式

    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);

    // 通过 async、await 与 wait 函数，让断言语句延时执行
    await wait(
      () => {
        // 函数中的断言会重复执行，直到断言通过或者timeout报错
        expect(wrapper.queryByText('drop1')).toBeVisible();
      },
      { timeout: 500 }
    );

    // 出现下列菜单栏后，此时点击子菜单
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');

    // 鼠标离开二级菜单栏，此时元素应当消失
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });

  // 待做：添加vertical下的两种测试用例，1) 点击submenu显示dropdown 2) 测试submenu默认展开下拉菜单功能
});
